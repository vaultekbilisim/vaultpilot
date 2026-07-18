import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const workspaceRoot = process.cwd()
const validateStaged = process.argv.includes('--staged')
const sourceAppPath = path.resolve(workspaceRoot, '..', '..', 'src', 'components', 'PassmanApp.tsx')
let stagedTempRoot = null
let root = workspaceRoot

if (validateStaged) {
  let hasStagedChanges = true
  try {
    execFileSync('git', ['diff', '--cached', '--quiet'], { cwd: workspaceRoot, stdio: 'pipe' })
    hasStagedChanges = false
  } catch (error) {
    if (error.status !== 1) {
      throw error
    }
  }
  if (!hasStagedChanges) {
    console.log('No staged changes found; skipped staged-tree validation.')
    process.exit(0)
  }
  stagedTempRoot = mkdtempSync(path.join(os.tmpdir(), 'vaultpilot-public-staged-'))
  root = path.join(stagedTempRoot, 'tree')
  mkdirSync(root, { recursive: true })
  execFileSync('git', ['checkout-index', '-a', `--prefix=${root}${path.sep}`], { cwd: workspaceRoot, stdio: 'pipe' })
}

process.on('exit', () => {
  if (stagedTempRoot) {
    rmSync(stagedTempRoot, { force: true, recursive: true })
  }
})

const errors = []
const warnings = []

const ignoredDirectories = new Set(['.git', '.serena', 'node_modules'])
const textExtensions = new Set(['.md', '.mjs', '.json', '.svg', '.txt', '.yml', '.yaml'])
const publicBinaryExtensions = new Set(['.png'])
const linkFileExtensions = new Set(['.md', '.txt'])
const screenHelpManifestPath = path.join(root, 'docs', 'screen-help-targets.json')
const approvedScreenshotPaths = [
  'assets/screenshots/login-lock-screen.png',
  'assets/screenshots/overview-security-posture.png',
  'assets/screenshots/passwords-record-list.png',
  'assets/screenshots/server-settings.png',
  'assets/screenshots/discovery-run.png',
  'assets/screenshots/discovery-findings.png',
  'assets/screenshots/discovery-import.png',
  'assets/screenshots/update-center-vaultpilot-2.png',
  'assets/screenshots/browser-extension-management-vaultpilot-2.png',
  'assets/screenshots/active-directory-sync-tree-vaultpilot-2.png',
  'assets/screenshots/sharing-package-flow-vaultpilot-2.png'
]
const fallbackScreenHelpDocTargets = [
  'screen-active-directory-records.md',
  'screen-api-keys.md',
  'screen-audit-log.md',
  'screen-browser-extension.md',
  'screen-certificate-dashboard.md',
  'screen-certificates.md',
  'screen-discovery.md',
  'screen-domain-dashboard.md',
  'screen-executions.md',
  'screen-files.md',
  'screen-integrations.md',
  'screen-license.md',
  'screen-new-item.md',
  'screen-notifications.md',
  'screen-passwords.md',
  'screen-rotation-dashboard.md',
  'screen-secure-notes.md',
  'screen-security-command-center.md',
  'screen-security-dashboard.md',
  'screen-server-settings.md',
  'screen-sharing.md',
  'screen-sign-in-security.md',
  'screen-updates.md',
  'screen-users.md'
]
const highRiskScreenHelpDocTargets = new Set(fallbackScreenHelpDocTargets)

function walk(directory) {
  const entries = readdirSync(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...walk(path.join(directory, entry.name)))
      }
      continue
    }
    files.push(path.join(directory, entry.name))
  }
  return files
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, '/')
}

function fail(message) {
  errors.push(message)
}

function warn(message) {
  warnings.push(message)
}

function fallbackScreenHelpTargetsObject() {
  return Object.fromEntries(fallbackScreenHelpDocTargets.map((target) => [target, target]))
}

function readPublicScreenHelpManifest() {
  if (!existsSync(screenHelpManifestPath)) {
    fail('required file is missing: docs/screen-help-targets.json')
    return { targets: fallbackScreenHelpTargetsObject() }
  }

  let manifest
  try {
    manifest = JSON.parse(readFileSync(screenHelpManifestPath, 'utf8'))
  } catch (error) {
    fail(`docs/screen-help-targets.json is not valid JSON: ${error.message}`)
    return { targets: fallbackScreenHelpTargetsObject() }
  }

  if (manifest.schemaVersion !== 1) {
    fail('docs/screen-help-targets.json must use schemaVersion 1')
  }
  if (!manifest.targets || typeof manifest.targets !== 'object' || Array.isArray(manifest.targets)) {
    fail('docs/screen-help-targets.json must contain a targets object')
    return { targets: fallbackScreenHelpTargetsObject() }
  }

  for (const [view, target] of Object.entries(manifest.targets)) {
    if (typeof target !== 'string' || !target.startsWith('screen-') || !target.endsWith('.md')) {
      fail(`docs/screen-help-targets.json contains invalid target for ${view}`)
    }
  }

  return manifest
}

function readSourceScreenHelpMapping() {
  if (!existsSync(sourceAppPath)) {
    warn(`source app mapping not found at ${path.relative(workspaceRoot, sourceAppPath).replaceAll(path.sep, '/')}; source parity check for docs/screen-help-targets.json was skipped`)
    return null
  }

  const app = readFileSync(sourceAppPath, 'utf8')
  const mappingMatch = app.match(/const WORKSPACE_DOCS_PAGE_BY_VIEW: Record<WorkspaceView, string> = \{([\s\S]*?)\n\}/)
  if (!mappingMatch) {
    fail('source app is missing WORKSPACE_DOCS_PAGE_BY_VIEW mapping for topbar help docs')
    return null
  }

  return Object.fromEntries([...mappingMatch[1].matchAll(/^\s*([A-Za-z][A-Za-z0-9]*)\s*:\s*'([^']+\.md)'/gm)]
    .map((match) => [match[1], match[2]]))
}

function readScreenHelpDocTargets() {
  const publicMapping = readPublicScreenHelpManifest().targets
  const sourceMapping = readSourceScreenHelpMapping()

  if (sourceMapping) {
    const publicJson = JSON.stringify(Object.entries(publicMapping).sort())
    const sourceJson = JSON.stringify(Object.entries(sourceMapping).sort())
    if (publicJson !== sourceJson) {
      fail('docs/screen-help-targets.json must match source WORKSPACE_DOCS_PAGE_BY_VIEW mapping')
    }
  }

  return [...new Set(Object.values(publicMapping))]
    .filter((target) => target.startsWith('screen-'))
    .sort()
}

const screenHelpDocTargets = readScreenHelpDocTargets()

function stripAnchor(target) {
  return target.split('#')[0].split('?')[0]
}

function isExternal(target) {
  return /^(https?:|mailto:|tel:)/i.test(target)
}

function isPathInsideRoot(resolved) {
  const relativePath = path.relative(root, resolved)
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath))
}

function validateLocalTarget(sourceFile, target) {
  if (!target || isExternal(target) || target.startsWith('#')) {
    return
  }
  const cleaned = stripAnchor(target)
  if (!cleaned) {
    return
  }
  if (/^[a-z]+:/i.test(cleaned)) {
    return
  }
  const resolved = path.resolve(path.dirname(sourceFile), cleaned)
  if (!isPathInsideRoot(resolved)) {
    fail(`${relative(sourceFile)} links outside repository: ${target}`)
    return
  }
  if (!existsSync(resolved)) {
    fail(`${relative(sourceFile)} has broken local link: ${target}`)
  }
}

function resolveLocalLink(sourceFile, target) {
  if (!target || isExternal(target) || target.startsWith('#')) {
    return null
  }
  const cleaned = stripAnchor(target)
  if (!cleaned || /^[a-z]+:/i.test(cleaned)) {
    return null
  }
  const resolved = path.resolve(path.dirname(sourceFile), cleaned)
  if (!isPathInsideRoot(resolved) || !existsSync(resolved)) {
    return null
  }
  return relative(resolved)
}

function validateLinks(filePath, content) {
  const markdownLinks = content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)
  for (const match of markdownLinks) {
    validateLocalTarget(filePath, match[1].trim())
  }

  const htmlLinks = content.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)
  for (const match of htmlLinks) {
    validateLocalTarget(filePath, match[1].trim())
  }
}

function getHtmlAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*["']([^"']*)["']`, 'i'))
  return match?.[1] ?? ''
}

function validateForbiddenPatterns(filePath, content) {
  const rel = relative(filePath)
  const forbidden = [
    [/pmt_[A-Za-z0-9_-]{12,}/, 'real-looking PassMan agent token'],
    [/pma_[A-Za-z0-9_-]{12,}/, 'real-looking PassMan agent id'],
    [/192\.168\.10\.192/, 'private customer-like IP from prior terminal examples'],
    [/AD bind password for/i, 'terminal password prompt transcript'],
    [/-----BEGIN (?:RSA |EC |OPENSSH |)?PRIVATE KEY-----/, 'private key material'],
    [/C:\\Users\\ulasc/i, 'local operator path'],
    [/\beset\b/i, 'prior local AD username'],
    [/PassMan-1\.5\.1-x64\.msi/i, 'stale MSI latest asset name'],
    [/Latest stable release:\s+\*\*PassMan 1\.5\.1\*\*/i, 'stale latest release wording'],
    [/github\.io\/passman(?:[\x2d]releases)?/i, 'obsolete static public-site URL'],
    [/github\.com\/vaultekbilisim\/passman(?:[/?#]|$)/i, 'obsolete PassMan GitHub repository URL'],
    [/github\.com\/vaultekbilisim\/passman-releases(?:[/?#]|$)/i, 'obsolete PassMan release repository URL'],
    [/PASSMAN_[A-Z_]*ADMIN_TOKEN/i, 'obsolete static public-site admin token reference'],
    [/\.github\/workflows\/[a-z]+\.yml/i, 'obsolete static public-site workflow reference'],
    [/\]\([^)]*index\.html[)#?]?/i, 'obsolete static public-site html index link'],
    [/\bassets\/(?:styles\.css|site\.js)\b/i, 'obsolete static public-site asset reference'],
    [/vaultpilot-dc-agent\.log/i, 'stale AD agent log path'],
    [/\bAPI answers as not found\b/i, 'stale public API missing-secret wording'],
    [/\bAPI not found d\S*ner\b/i, 'stale public API missing-secret wording'],
    [/\bSecret endpoint\b[^\n]*\bnot found\b/i, 'stale public API missing-secret wording'],
    [/\bSecret not found\b/i, 'stale public API missing-secret wording'],
    [/<<<<<<<|=======|>>>>>>>/, 'merge conflict marker'],
    [/\bworkspace pass\b/i, 'internal workspace-pass wording'],
    [/\bdocumentation pass\b/i, 'internal documentation-pass wording'],
    [/doküman geçişinde/i, 'internal documentation-pass wording'],
    [/\b(?:yaln|y|g|d|ba|a)\?[a-z]/i, 'question-mark mojibake encoding artifact'],
    [/\?\?/, 'double-question-mark mojibake encoding artifact'],
    [/\bAll screenshots are captured from the actual VaultPilot application\b/i, 'overstated current screenshot claim'],
    [/\bfresh (?:current|2\.0) capture\b/i, 'stale fresh screenshot wording'],
    [/\bThis current VaultPilot\b/i, 'stale current screenshot wording'],
    [/\bcurrent VaultPilot capture\b/i, 'stale current screenshot wording'],
    [/\bgüncel VaultPilot\b/i, 'stale current screenshot wording'],
    [/\bfresh current captures\b/i, 'stale fresh screenshot wording'],
    [/\blocal rebuild\b/i, 'stale local rebuild wording'],
    [/\bPrepared 2\.0\.0\b/i, 'stale prepared VaultPilot 2.0 wording'],
    [/\bLatest prepared release note:\s+\*\*VaultPilot 2\.0\.0\*\*/i, 'stale prepared-release note wording'],
    [/\bprepared (?:major )?release\b[^\n]*\bVaultPilot Enterprise Vault Console 2\.0\.0\b/i, 'stale prepared-release wording'],
    [/\bprepared 2\.0\.0 (?:release )?asset set\b/i, 'stale prepared asset set wording'],
    [/\blatest verified(?: published)? GitHub Release\b[^\n]*\b(?:PassMan\s+)?1\.8\.21\b/i, 'stale latest-release wording after VaultPilot 2.0.0 publication'],
    [/\bDo not treat\b[^\n]*\b2\.0\.0\b[^\n]*(?:public proof|published|publication)/i, 'stale pre-publication caution after VaultPilot 2.0.0 publication'],
    [/\b2\.0\.0\b[^\n]*(?:not|must not|do not|Do not)[^\n]*(?:public proof|published|publication)/i, 'stale pre-publication caution after VaultPilot 2.0.0 publication'],
    [/\bafter publication\b/i, 'stale after-publication wording after VaultPilot 2.0.0 publication'],
    [/\bpublic proof\b/i, 'mechanical public-proof wording'],
    [/\brelease gate\b/i, 'mechanical release-gate wording'],
    [/\bChromium Browser Extension\s*\|\s*1\.3\.1\b/i, 'stale browser extension version'],
    [/\bBrowser Vault Extension 1\.3\.1\b/i, 'stale browser extension release heading'],
    [/!\[[^\]]*\]\([^)]*(?:sharing-package-flow|update-center|browser-extension-management|active-directory-sync-tree|offline-share-decrypter)\.png[^)]*\)/i, 'embedded legacy compatibility-line screenshot'],
    [/\]\([^)]*assets\/screenshots\/\)/i, 'raw screenshot directory link'],
    [/\]\([^)]*assets\/screenshots\/(?:sharing-package-flow|update-center|browser-extension-management|active-directory-sync-tree|offline-share-decrypter)\.png[^)]*\)/i, 'legacy compatibility-line screenshot link'],
    [/\bExpected Behavior In 1\.6\.0\b/i, 'stale login-session KB version heading'],
    [/##\s*1\.6\.0\s+İçin Beklenen Davranış/i, 'stale login-session KB version heading'],
    [/Console reports `1\.6\.0` or newer/i, 'stale login-session installed-version guidance'],
    [/Konsol `1\.6\.0` veya daha yeni gösterir/i, 'stale login-session installed-version guidance'],
    [/Upgrade to `1\.6\.0` or newer/i, 'stale login-session resolution guidance'],
    [/`1\.6\.0` veya daha yeni sürüme yükselt/i, 'stale login-session resolution guidance'],
    [/\bpublic GitHub Release should contain exactly\b/i, 'stale fixed asset-count wording'],
    [/\bVaultPilot remains a compatibility name\b/i, 'incorrect compatibility-name subject'],
    [/\blegacy VaultPilot (?:service|data|log|path|alias)/i, 'incorrect legacy VaultPilot alias wording'],
    [/\bVaultPilotServer\b[^\n]*\bVaultPilotServer\b[^\n]*\blegacy alias\b/i, 'incorrect VaultPilotServer legacy alias wording'],
    [/\bUpgrade the VaultPilot server to 1\.8\.19\b/i, 'stale VaultPilot version wording'],
    [/\bUse PassMan 1\.8\.19 or newer, rotate\b/i, 'stale DC agent compatibility wording'],
    [/\bDownload 1\.6\.1\b/i, 'stale visual release CTA'],
    [/\bPassMan public release hub preview\b/i, 'stale social preview title'],
    [/\bPassMan (?:enterprise vault console overview|browser extension demo|zero knowledge flow|update trust chain|offline sharing lifecycle)\b/i, 'stale visual PassMan label'],
    [/[\u00c3\u00c4\u00c5\u00c2\ufffd]/, 'mojibake or replacement-character encoding artifact'],
  ]

  for (const [pattern, label] of forbidden) {
    if (pattern.test(content)) {
      fail(`${rel} contains ${label}`)
    }
  }

  if (/^README\.(?:tr|de|es|fr|pt-BR)\.md$/.test(rel)) {
    const localizedForbidden = [
      [/\bIf a command is version-sensitive, re-check it before documenting it\./, 'English maintenance bullet in localized README'],
      [/\bWhen a localized file cannot be updated fully, leave a clear note instead of a partial translation\./, 'English maintenance bullet in localized README'],
      [/\b(?:git diff|gitleaks|npm run validate|node scripts\/validate-docs|validate:staged)\b/i, 'maintainer validation command in localized README'],
      [/\b(?:stage|staged|push|remote HEAD)\b/i, 'maintainer publication workflow in localized README'],
      [/\b(?:klonla|clona|clonez|clone ou atualize|repository klonen)\b/i, 'maintainer clone workflow in localized README']
    ]
    for (const [pattern, label] of localizedForbidden) {
      if (pattern.test(content)) {
        fail(`${rel} contains ${label}`)
      }
    }
  }

  if (/^(?:docs|kb)\/tr\/|^README\.tr\.md$/.test(rel)) {
    const trMechanicalPhrases = [
      'herkese açık paylaşımı güvenli',
      'Sign-in security',
      'update readiness',
      'extension posture',
      'vault helper',
      'encrypted vault sync',
      'recipient handling',
      'External share',
      'package integrity',
      'Replacement',
      'Private kalmalı:'
    ]
    for (const phrase of trMechanicalPhrases) {
      if (content.includes(phrase)) {
        fail(`${rel} contains mechanical Turkish/English public-doc wording: ${phrase}`)
      }
    }
  }
}

function validatePairedDocs() {
  const trDir = path.join(root, 'docs', 'tr')
  const enDir = path.join(root, 'docs', 'en')
  const trFiles = readdirSync(trDir).filter((name) => name.endsWith('.md')).sort()
  const enFiles = readdirSync(enDir).filter((name) => name.endsWith('.md')).sort()
  const trSet = new Set(trFiles)
  const enSet = new Set(enFiles)
  for (const name of trFiles) {
    if (!enSet.has(name)) {
      fail(`docs/en is missing ${name}`)
    }
  }
  for (const name of enFiles) {
    if (!trSet.has(name)) {
      fail(`docs/tr is missing ${name}`)
    }
  }

  const trKbDir = path.join(root, 'kb', 'tr')
  const enKbDir = path.join(root, 'kb', 'en')
  const trKbFiles = readdirSync(trKbDir).filter((name) => name.endsWith('.md')).sort()
  const enKbFiles = readdirSync(enKbDir).filter((name) => name.endsWith('.md')).sort()
  const trKbSet = new Set(trKbFiles)
  const enKbSet = new Set(enKbFiles)
  for (const name of trKbFiles) {
    if (!enKbSet.has(name)) {
      fail(`kb/en is missing ${name}`)
    }
  }
  for (const name of enKbFiles) {
    if (!trKbSet.has(name)) {
      fail(`kb/tr is missing ${name}`)
    }
  }
}

function validateRequiredFiles() {
  const required = [
    '.gitattributes',
    'README.md',
    'README.tr.md',
    'README.de.md',
    'README.es.md',
    'README.fr.md',
    'README.pt-BR.md',
    'llms.txt',
    '.github/workflows/validate-public-docs.yml',
    '.github/PULL_REQUEST_TEMPLATE.md',
    '.github/ISSUE_TEMPLATE/config.yml',
    '.github/ISSUE_TEMPLATE/documentation.yml',
    '.github/ISSUE_TEMPLATE/redacted-support.yml',
    'docs/README.md',
    'docs/screen-help-targets.json',
    'docs/en/README.md',
    'docs/tr/README.md',
    'docs/en/in-app-screen-help.md',
    'docs/tr/in-app-screen-help.md',
    ...screenHelpDocTargets.flatMap((target) => [
      `docs/en/${target}`,
      `docs/tr/${target}`
    ]),
    'docs/en/api-clients.md',
    'docs/tr/api-clients.md',
    'docs/en/public-api-reference.md',
    'docs/tr/public-api-reference.md',
    'docs/en/license-lifecycle.md',
    'docs/tr/license-lifecycle.md',
    'docs/en/discovery.md',
    'docs/tr/discovery.md',
    'docs/en/chrome-web-store-listing.md',
    'docs/tr/chrome-web-store-listing.md',
    'docs/en/server-system.md',
    'docs/tr/server-system.md',
    'docs/en/public-repository-boundary.md',
    'docs/tr/public-repository-boundary.md',
    'docs/en/public-external-surface-drift.md',
    'docs/tr/public-external-surface-drift.md',
    'docs/en/public-screenshot-standards.md',
    'docs/tr/public-screenshot-standards.md',
    'docs/en/publication-runbook.md',
    'docs/tr/publication-runbook.md',
    'docs/en/github-repository-profile.md',
    'docs/tr/github-repository-profile.md',
    'docs/en/public-discoverability.md',
    'docs/tr/public-discoverability.md',
    'docs/en/public-language-glossary.md',
    'docs/tr/public-language-glossary.md',
    'kb/README.md',
    'kb/en/README.md',
    'kb/tr/README.md',
    'kb/en/api-client-401.md',
    'kb/tr/api-client-401.md',
    'kb/en/chrome-web-store-review.md',
    'kb/tr/chrome-web-store-review.md',
    'kb/en/discovery-finding-review.md',
    'kb/tr/discovery-finding-review.md',
    'kb/en/server-settings-restart-maintenance.md',
    'kb/tr/server-settings-restart-maintenance.md',
    'kb/en/backup-import-fails.md',
    'kb/tr/backup-import-fails.md',
    'kb/en/audit-chain-partial.md',
    'kb/tr/audit-chain-partial.md',
    'kb/en/extension-pairing.md',
    'kb/tr/extension-pairing.md',
    'kb/en/external-share-fails.md',
    'kb/tr/external-share-fails.md',
    'kb/en/license-read-only.md',
    'kb/tr/license-read-only.md',
    'kb/en/update-stuck-76.md',
    'kb/tr/update-stuck-76.md',
    'kb/en/public-issue-redaction.md',
    'kb/tr/public-issue-redaction.md',
    'kb/en/public-screenshot-redaction.md',
    'kb/tr/public-screenshot-redaction.md',
    'kb/en/public-validation-fails.md',
    'kb/tr/public-validation-fails.md',
    'RELEASES.md',
    'SECURITY.md',
    'SUPPORT.md',
    'CONTRIBUTING.md',
    'PRIVACY.md',
    'assets/favicon.svg',
    'assets/icons/directory.svg',
    'assets/icons/docs.svg',
    'assets/icons/download.svg',
    'assets/icons/evidence.svg',
    'assets/icons/extension.svg',
    'assets/icons/release.svg',
    'assets/icons/security.svg',
    'assets/icons/share.svg',
    'assets/icons/support.svg',
    'assets/icons/update.svg',
    'assets/icons/vault.svg',
    'assets/icons/windows.svg',
    'assets/visuals/overview-console.svg',
    'assets/visuals/extension-demo.svg',
    'assets/visuals/zero-knowledge-flow.svg',
    'assets/visuals/update-trust-chain.svg',
    'assets/visuals/ad-sync-tree.svg',
    'assets/visuals/share-lifecycle.svg',
    'assets/visuals/operator-lifecycle.svg',
    'assets/visuals/social-preview.svg',
    'assets/visuals/social-preview.png',
    'assets/screenshots/MANIFEST.json',
    ...approvedScreenshotPaths
  ]
  for (const file of required) {
    const fullPath = path.join(root, file)
    if (!existsSync(fullPath)) {
      fail(`required file is missing: ${file}`)
    }
  }
}

function validateRequiredPublicReferences() {
  const requiredReferences = new Map([
    ['README.md', [
      'docs/en/public-repository-boundary.md',
      'docs/tr/public-repository-boundary.md',
      'docs/en/public-external-surface-drift.md',
      'docs/tr/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'docs/tr/public-screenshot-standards.md',
      'docs/en/publication-runbook.md',
      'docs/tr/publication-runbook.md',
      'docs/en/github-repository-profile.md',
      'docs/tr/github-repository-profile.md',
      'docs/en/public-discoverability.md',
      'docs/tr/public-discoverability.md',
      'llms.txt',
      'docs/en/public-language-glossary.md',
      'docs/tr/public-language-glossary.md',
      'docs/en/public-api-reference.md',
      'docs/tr/public-api-reference.md',
      'docs/en/in-app-screen-help.md',
      'docs/tr/in-app-screen-help.md',
      'docs/screen-help-targets.json',
      'kb/en/public-issue-redaction.md',
      'kb/tr/public-issue-redaction.md',
      'kb/en/public-screenshot-redaction.md',
      'kb/tr/public-screenshot-redaction.md'
    ]],
    ['README.tr.md', [
      'docs/tr/in-app-screen-help.md',
      'docs/tr/chrome-web-store-listing.md',
      'docs/tr/publication-runbook.md',
      'docs/tr/public-external-surface-drift.md',
      'docs/tr/public-screenshot-standards.md',
      'docs/tr/public-discoverability.md',
      'PRIVACY.md'
    ]],
    ['README.de.md', [
      'docs/en/chrome-web-store-listing.md',
      'docs/en/publication-runbook.md',
      'docs/en/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'docs/en/public-discoverability.md',
      'PRIVACY.md'
    ]],
    ['README.es.md', [
      'docs/en/chrome-web-store-listing.md',
      'docs/en/publication-runbook.md',
      'docs/en/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'docs/en/public-discoverability.md',
      'PRIVACY.md'
    ]],
    ['README.fr.md', [
      'docs/en/chrome-web-store-listing.md',
      'docs/en/publication-runbook.md',
      'docs/en/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'docs/en/public-discoverability.md',
      'PRIVACY.md'
    ]],
    ['README.pt-BR.md', [
      'docs/en/chrome-web-store-listing.md',
      'docs/en/publication-runbook.md',
      'docs/en/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'docs/en/public-discoverability.md',
      'PRIVACY.md'
    ]],
    ['llms.txt', [
      '> VaultPilot is a self-hosted',
      '## Use Order',
      'Use release facts from `RELEASES.md`',
      'Use operator tasks from `docs/en/README.md` or `docs/tr/README.md`',
      'Use incident diagnosis from `kb/en/README.md` or `kb/tr/README.md`',
      'Never infer source availability',
      '## Primary Pages',
      '[Repository home](README.md)',
      '[Documentation gateway](docs/README.md)',
      '[Knowledge base gateway](kb/README.md)',
      'docs/en/public-repository-boundary.md',
      'docs/tr/public-repository-boundary.md',
      'docs/en/github-repository-profile.md',
      'docs/tr/github-repository-profile.md',
      'docs/en/public-discoverability.md',
      'docs/tr/public-discoverability.md',
      'docs/en/chrome-web-store-listing.md',
      'docs/tr/chrome-web-store-listing.md',
      'docs/en/public-external-surface-drift.md',
      'docs/tr/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'docs/tr/public-screenshot-standards.md',
      'assets/screenshots/MANIFEST.json',
      'kb/en/chrome-web-store-review.md',
      'kb/tr/chrome-web-store-review.md',
      'kb/en/public-screenshot-redaction.md',
      'kb/tr/public-screenshot-redaction.md',
      'kb/en/public-validation-fails.md',
      'kb/tr/public-validation-fails.md',
      'kb/en/audit-chain-partial.md',
      'kb/tr/audit-chain-partial.md',
      'kb/en/extension-pairing.md',
      'kb/tr/extension-pairing.md',
      'kb/en/external-share-fails.md',
      'kb/tr/external-share-fails.md',
      'kb/en/license-read-only.md',
      'kb/tr/license-read-only.md',
      'kb/en/update-stuck-76.md',
      'kb/tr/update-stuck-76.md',
      'docs/en/public-language-glossary.md',
      'docs/tr/public-language-glossary.md',
      'docs/en/public-api-reference.md',
      'docs/tr/public-api-reference.md',
      'docs/en/in-app-screen-help.md',
      'docs/tr/in-app-screen-help.md',
      'docs/screen-help-targets.json',
      'kb/en/public-issue-redaction.md',
      'kb/tr/public-issue-redaction.md',
      '.github/ISSUE_TEMPLATE/redacted-support.yml',
      '.github/ISSUE_TEMPLATE/documentation.yml',
      '## Optional',
      'assets/visuals/social-preview.png'
    ]],
    ['docs/README.md', [
      'en/public-repository-boundary.md',
      'tr/public-repository-boundary.md',
      'en/publication-runbook.md',
      'tr/publication-runbook.md',
      'en/github-repository-profile.md',
      'tr/github-repository-profile.md',
      'en/public-discoverability.md',
      'tr/public-discoverability.md',
      'en/chrome-web-store-listing.md',
      'tr/chrome-web-store-listing.md',
      'en/public-external-surface-drift.md',
      'tr/public-external-surface-drift.md',
      'en/public-screenshot-standards.md',
      'tr/public-screenshot-standards.md',
      'assets/screenshots/MANIFEST.json',
      'en/public-language-glossary.md',
      'tr/public-language-glossary.md',
      'en/public-api-reference.md',
      'tr/public-api-reference.md',
      'en/in-app-screen-help.md',
      'tr/in-app-screen-help.md',
      'screen-help-targets.json'
    ]],
    ['docs/en/README.md', [
      '## Maintainer/Public Repository Path',
      'in-app-screen-help.md'
    ]],
    ['docs/tr/README.md', [
      '## Yayın ve Public Repo Bakım Yolu',
      'in-app-screen-help.md'
    ]],
    ['kb/README.md', [
      'en/chrome-web-store-review.md',
      'tr/chrome-web-store-review.md',
      'en/public-issue-redaction.md',
      'tr/public-issue-redaction.md',
      'en/public-screenshot-redaction.md',
      'tr/public-screenshot-redaction.md',
      'en/backup-import-fails.md',
      'tr/backup-import-fails.md',
      'en/public-validation-fails.md',
      'tr/public-validation-fails.md',
      'en/audit-chain-partial.md',
      'tr/audit-chain-partial.md',
      'en/extension-pairing.md',
      'tr/extension-pairing.md',
      'en/external-share-fails.md',
      'tr/external-share-fails.md',
      'en/license-read-only.md',
      'tr/license-read-only.md',
      'en/update-stuck-76.md',
      'tr/update-stuck-76.md'
    ]],
    ['SUPPORT.md', [
      'docs/en/public-repository-boundary.md',
      'docs/tr/public-repository-boundary.md',
      'kb/en/public-issue-redaction.md',
      'kb/tr/public-issue-redaction.md',
      '.github/ISSUE_TEMPLATE/redacted-support.yml',
      '.github/ISSUE_TEMPLATE/documentation.yml'
    ]],
    ['SECURITY.md', [
      'docs/en/public-repository-boundary.md'
    ]],
    ['CONTRIBUTING.md', [
      'docs/en/public-repository-boundary.md',
      'docs/en/publication-runbook.md',
      'docs/en/public-external-surface-drift.md',
      'docs/en/public-screenshot-standards.md',
      'kb/en/public-screenshot-redaction.md',
      'kb/en/public-validation-fails.md',
      'LICENSE.md'
    ]],
    ['.github/ISSUE_TEMPLATE/documentation.yml', [
      'docs/en/public-repository-boundary.md',
      'kb/en/public-issue-redaction.md',
      'docs/en/chrome-web-store-listing.md',
      'kb/en/chrome-web-store-review.md',
      'Public surface',
      'Chrome Web Store listing or privacy wording',
      'GitHub issue, PR, or repository metadata',
      'public metadata drift'
    ]],
    ['.github/ISSUE_TEMPLATE/redacted-support.yml', [
      'docs/en/public-repository-boundary.md',
      'kb/en/public-issue-redaction.md',
      'docs/en/support-evidence-pack.md',
      'docs/en/chrome-web-store-listing.md',
      'kb/en/chrome-web-store-review.md',
      '<AGENT_TOKEN>',
      'private security report',
      'Public documentation or repository metadata'
    ]],
    ['.github/ISSUE_TEMPLATE/config.yml', [
      'docs/en/chrome-web-store-listing.md',
      'kb/en/public-issue-redaction.md',
      'docs/tr/support-evidence-pack.md',
      'Destek için hassas veri içermeyen kanıt paketi hazırlayın.'
    ]],
    ['.github/PULL_REQUEST_TEMPLATE.md', [
      'docs/en/chrome-web-store-listing.md',
      'docs/tr/chrome-web-store-listing.md',
      'PRIVACY.md',
      'Chrome Web Store review KB',
      '.github/ISSUE_TEMPLATE/',
      'docs/en/public-external-surface-drift.md',
      'docs/tr/public-external-surface-drift.md',
      'Account-side changes'
    ]],
    ['.github/workflows/validate-public-docs.yml', [
      'actions/checkout v7.0.0',
      'actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0',
      'fetch-depth: 0',
      'actions/setup-node v6',
      'actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e',
      'npm run validate',
      'git diff --check',
      'gitleaks/gitleaks-action v3.0.0',
      'gitleaks/gitleaks-action@e0c47f4f8be36e29cdc102c57e68cb5cbf0e8d1e',
      'GITLEAKS_ENABLE_COMMENTS',
      'GITLEAKS_ENABLE_UPLOAD_ARTIFACT'
    ]],
    ['docs/en/public-repository-boundary.md', [
      'LICENSE',
      'owner approval'
    ]],
    ['docs/tr/public-repository-boundary.md', [
      'LICENSE',
      'Owner onayı'
    ]],
    ['docs/en/publication-runbook.md', [
      'npm run validate:staged',
      'git diff --cached --check',
      'gitleaks detect --no-git --redact --verbose --source .',
      'Chrome Web Store publisher account',
      'LICENSE.md',
      'Public validation failure KB',
      'public-external-surface-drift.md'
    ]],
    ['docs/tr/publication-runbook.md', [
      'npm run validate:staged',
      'git diff --cached --check',
      'gitleaks detect --no-git --redact --verbose --source .',
      'Chrome Web Store publisher hesabı',
      'LICENSE.md',
      'Public validation failure KB',
      'public-external-surface-drift.md'
    ]],
    ['docs/en/public-external-surface-drift.md', [
      'hjkbedlaieikhkoplgpiohlaakgebobi',
      'v2.0.0',
      'Release-body correction is not currently tracked',
      'Chrome Web Store publisher dashboard',
      'Documentation Gateway',
      'Knowledge Base Gateway',
      'Product Walkthrough',
      '76.04KiB',
      'limited-use declarations',
      'Fresh 2.0 captures',
      'legacy PassMan compatibility-line',
      'chromium-extension',
      'operator-docs',
      'https://github.com/vaultekbilisim/vaultpilot/releases/latest',
      'Issues are disabled',
      'Discussions are disabled',
      'Commit and push',
      'assets/visuals/social-preview.png',
      '1280 x 640',
      '34840 bytes',
      '6393A5701827022CFAA8566764A15D6A81884F2F99A4A701256E98AEC932B03C',
      'openGraphImageUrl'
    ]],
    ['docs/tr/public-external-surface-drift.md', [
      'hjkbedlaieikhkoplgpiohlaakgebobi',
      'v2.0.0',
      'Release-body düzeltmesi şu anda takip edilmiyor',
      'Chrome Web Store publisher dashboard',
      'Documentation Gateway',
      'Knowledge Base Gateway',
      'Product Walkthrough',
      '76.04KiB',
      '`Limited Use` beyanlarını',
      'Fresh 2.0 captures',
      'legacy PassMan compatibility-line',
      'chromium-extension',
      'operator-docs',
      'https://github.com/vaultekbilisim/vaultpilot/releases/latest',
      'Issues kapalı',
      'Discussions kapalı',
      'commit ve push',
      'assets/visuals/social-preview.png',
      '1280 x 640',
      '34840 bytes',
      '6393A5701827022CFAA8566764A15D6A81884F2F99A4A701256E98AEC932B03C',
      'openGraphImageUrl'
    ]],
    ['docs/en/github-repository-profile.md', [
      'public-discoverability.md',
      'assets/visuals/social-preview.png',
      'SECURITY.md',
      'LICENSE'
    ]],
    ['docs/tr/github-repository-profile.md', [
      'public-discoverability.md',
      'assets/visuals/social-preview.png',
      'SECURITY.md',
      'LICENSE'
    ]],
    ['docs/en/public-discoverability.md', [
      'assets/visuals/social-preview.png',
      'llms.txt',
      'LLM Index Rules',
      'https://llmstxt.org/',
      'Google Search',
      'support.google.com/webmasters/answer/9012289',
      'support.google.com/webmasters/answer/9205520',
      'developer.chrome.com/docs/lighthouse/seo/structured-data',
      'LICENSE',
      'Chrome Web Store',
      'public-external-surface-drift.md'
    ]],
    ['docs/tr/public-discoverability.md', [
      'assets/visuals/social-preview.png',
      'llms.txt',
      'LLM İndeks Kuralları',
      'https://llmstxt.org/',
      'Google Search',
      'support.google.com/webmasters/answer/9012289',
      'support.google.com/webmasters/answer/9205520',
      'developer.chrome.com/docs/lighthouse/seo/structured-data',
      'LICENSE',
      'Chrome Web Store',
      'public-external-surface-drift.md'
    ]],
    ['docs/en/server-system.md', [
      'MAINTENANCE_BACKUP_REQUIRED',
      'vaultpilot-maintenance-<scope>-<timestamp>-<id>.json',
      'RESTORE_REPLACES_NEWER_CATEGORY_RECORDS',
      '`AUDIT`, `DISCOVERY` or `EXECUTIONS`'
    ]],
    ['docs/tr/server-system.md', [
      'MAINTENANCE_BACKUP_REQUIRED',
      'vaultpilot-maintenance-<scope>-<timestamp>-<id>.json',
      'RESTORE_REPLACES_NEWER_CATEGORY_RECORDS',
      '`AUDIT`, `DISCOVERY` veya `EXECUTIONS`'
    ]],
    ['kb/en/server-settings-restart-maintenance.md', [
      'MAINTENANCE_BACKUP_REQUIRED',
      'vaultpilot-maintenance-<scope>-<timestamp>-<id>.json',
      'RESTORE_REPLACES_NEWER_CATEGORY_RECORDS',
      '`AUDIT`, `DISCOVERY` or `EXECUTIONS`'
    ]],
    ['kb/tr/server-settings-restart-maintenance.md', [
      'MAINTENANCE_BACKUP_REQUIRED',
      'vaultpilot-maintenance-<scope>-<timestamp>-<id>.json',
      'RESTORE_REPLACES_NEWER_CATEGORY_RECORDS',
      '`AUDIT`, `DISCOVERY` veya `EXECUTIONS`'
    ]],
    ['docs/en/public-host-https-certificate.md', [
      'Owner-only',
      '.pfx',
      '.p12',
      '2 MB',
      '6 attempts per 10 minutes',
      'UNSUPPORTED_CERTIFICATE_FILE',
      'CERTIFICATE_FILE_SIZE',
      'CONTENT_LENGTH_REQUIRED',
      'PAYLOAD_TOO_LARGE'
    ]],
    ['docs/tr/public-host-https-certificate.md', [
      'Owner-only',
      '.pfx',
      '.p12',
      '2 MB',
      '10 dakikada 6 deneme',
      'UNSUPPORTED_CERTIFICATE_FILE',
      'CERTIFICATE_FILE_SIZE',
      'CONTENT_LENGTH_REQUIRED',
      'PAYLOAD_TOO_LARGE'
    ]],
    ['kb/en/certificate-warning.md', [
      'Owner-only',
      '.pfx',
      '.p12',
      '2 MB',
      '6 attempts per 10 minutes',
      'UNSUPPORTED_CERTIFICATE_FILE',
      'CERTIFICATE_FILE_SIZE',
      'CONTENT_LENGTH_REQUIRED',
      'PAYLOAD_TOO_LARGE'
    ]],
    ['kb/tr/certificate-warning.md', [
      'Owner-only',
      '.pfx',
      '.p12',
      '2 MB',
      '10 dakikada 6 deneme',
      'UNSUPPORTED_CERTIFICATE_FILE',
      'CERTIFICATE_FILE_SIZE',
      'CONTENT_LENGTH_REQUIRED',
      'PAYLOAD_TOO_LARGE'
    ]],
    ['docs/en/api-clients.md', [
      'public-api-reference.md'
    ]],
    ['docs/tr/api-clients.md', [
      'public-api-reference.md'
    ]],
    ['docs/en/public-api-reference.md', [
      'pmc_[A-Za-z0-9_-]{24}',
      'pms_[A-Za-z0-9_-]{43}',
      'Cache-Control: no-store',
      'GET-only',
      '120 requests per minute',
      '512 characters',
      '256 characters',
      'SECRETS_READ',
      'SERVER_STATUS_READ',
      'DIRECTORY_STATUS_READ',
      'UPDATE_STATUS_READ',
      'GET /api/public/v1/secrets/{secretId}',
      '403 Integration authorization failed.',
      'Status-only clients can be created without vault assignment.'
    ]],
    ['docs/tr/public-api-reference.md', [
      'pmc_[A-Za-z0-9_-]{24}',
      'pms_[A-Za-z0-9_-]{43}',
      'Cache-Control: no-store',
      'GET-only',
      'dakikada 120 request',
      '512 karakter',
      '256 karakter',
      'SECRETS_READ',
      'SERVER_STATUS_READ',
      'DIRECTORY_STATUS_READ',
      'UPDATE_STATUS_READ',
      'GET /api/public/v1/secrets/{secretId}',
      '403 Integration authorization failed.',
      "Status-only client'lar vault assignment olmadan oluşturulabilir."
    ]],
    ['docs/en/release-asset-verification.md', [
      'gh release view v',
      'Get-FileHash .\\VaultPilot-',
      'Get-AuthenticodeSignature .\\VaultPilot-',
      'If `gh release view` shows a different tag'
    ]],
    ['docs/tr/release-asset-verification.md', [
      'gh release view v',
      'Get-FileHash .\\VaultPilot-',
      'Get-AuthenticodeSignature .\\VaultPilot-',
      '`gh release view` farklı tag'
    ]],
    ['docs/en/chrome-web-store-listing.md', [
      'hjkbedlaieikhkoplgpiohlaakgebobi',
      '1.3.3',
      'PRIVACY.md',
      'Publisher Dashboard Handoff',
      'visible overview starts with VaultPilot wording',
      'detailed description still repeats PassMan',
      'web history',
      'remote executable code',
      'Privacy Practices',
      'developer.chrome.com/docs/webstore/cws-dashboard-listing',
      'clipboardWrite',
      '1280 x 800',
      'Package Audit Commands',
      'Expand-Archive -LiteralPath $zip',
      'manifest.json',
      'Select-String -Pattern',
      'public-external-surface-drift.md'
    ]],
    ['docs/tr/chrome-web-store-listing.md', [
      'hjkbedlaieikhkoplgpiohlaakgebobi',
      '1.3.3',
      'PRIVACY.md',
      'kanonik İngilizce privacy policy',
      'Yayıncı Paneli Aktarım Notu',
      'Mağaza kartında görünen kısa açıklama VaultPilot diliyle başlıyor',
      "Detailed description` alanı hâlâ PassMan'ı",
      'web history',
      'uzaktan çalıştırılabilir kod',
      'Privacy Practices',
      'developer.chrome.com/docs/webstore/cws-dashboard-listing',
      'clipboardWrite',
      '1280 x 800',
      'Paket Audit Komutları',
      'Expand-Archive -LiteralPath $zip',
      'manifest.json',
      'Select-String -Pattern',
      'public-external-surface-drift.md'
    ]],
    ['kb/en/chrome-web-store-review.md', [
      'hjkbedlaieikhkoplgpiohlaakgebobi',
      'PRIVACY.md',
      'web history',
      'publisher dashboard handoff',
      'remote executable code',
      'Package Audit Commands',
      'Chrome Web Store listing guide',
      '## Related',
      'Public external surface drift'
    ]],
    ['kb/tr/chrome-web-store-review.md', [
      'hjkbedlaieikhkoplgpiohlaakgebobi',
      'PRIVACY.md',
      'web history',
      'yayıncı paneli aktarım notunu',
      'uzaktan çalıştırılabilir kod',
      'Paket Audit Komutları',
      'Chrome Web Store listeleme rehberi',
      '## İlgili',
      'Dış public yüzey farkları'
    ]],
    ['kb/en/public-validation-fails.md', [
      'npm run validate:staged',
      'git diff --cached',
      'scripts/validate-docs.mjs',
      'Public repository publication runbook',
      '## Related',
      'Public repository boundary'
    ]],
    ['kb/en/msi-installation-fails.md', [
      'Windows Server installation',
      'Admin quickstart',
      'Support evidence pack',
      '## Related'
    ]],
    ['kb/tr/msi-installation-fails.md', [
      'Windows Server kurulumu',
      'Yönetici hızlı başlangıç',
      'Support evidence pack',
      '## İlgili'
    ]],
    ['kb/en/certificate-warning.md', [
      'Public host and HTTPS',
      'Server settings screen',
      'Public screenshot redaction',
      '## Related'
    ]],
    ['kb/tr/certificate-warning.md', [
      'Public host ve HTTPS',
      'Sunucu ayarları ekranı',
      'Public screenshot redaction',
      '## İlgili'
    ]],
    ['kb/en/dc-agent-service.md', [
      'Active Directory agent',
      'Domain dashboard screen',
      'Active Directory records screen',
      '## Related'
    ]],
    ['kb/tr/dc-agent-service.md', [
      'Active Directory ajanı',
      "Etki alanı dashboard'u",
      'Active Directory kayıtları ekranı',
      '## İlgili'
    ]],
    ['kb/en/backup-import-fails.md', [
      'PAYLOAD_TOO_LARGE',
      'CONTENT_LENGTH_REQUIRED',
      'BACKUP_ARCHIVE_INVALID',
      'BACKUP_ARCHIVE_UNSUPPORTED',
      '512,000,000',
      '64',
      'closes all active sessions'
    ]],
    ['kb/tr/backup-import-fails.md', [
      'PAYLOAD_TOO_LARGE',
      'CONTENT_LENGTH_REQUIRED',
      'BACKUP_ARCHIVE_INVALID',
      'BACKUP_ARCHIVE_UNSUPPORTED',
      '512,000,000',
      '64',
      'tüm aktif oturumları kapatır'
    ]],
    ['kb/en/audit-chain-partial.md', [
      'docs/en/screen-audit-log.md',
      'Stop non-essential write operations',
      'Support evidence pack',
      'Do not send database files'
    ]],
    ['kb/tr/audit-chain-partial.md', [
      'docs/tr/screen-audit-log.md',
      'kritik olmayan yazma işlemlerini durdurun',
      'Support evidence pack',
      'database dosyası'
    ]],
    ['kb/en/extension-pairing.md', [
      'docs/en/screen-browser-extension.md',
      'PIN-wrapped pairing material',
      'persistent browser storage',
      'Chrome Web Store review KB'
    ]],
    ['kb/tr/extension-pairing.md', [
      'docs/tr/screen-browser-extension.md',
      'PIN ile sarmalar',
      'browser storage',
      'Chrome Web Store review KB'
    ]],
    ['kb/en/external-share-fails.md', [
      'docs/en/screen-sharing.md',
      'Tampered metadata',
      '<SHARE_ID>',
      'Do not send package JSON'
    ]],
    ['kb/tr/external-share-fails.md', [
      'docs/tr/screen-sharing.md',
      'Tampered metadata',
      '<SHARE_ID>',
      'package JSON'
    ]],
    ['kb/en/license-read-only.md', [
      'docs/en/screen-license.md',
      'invalid signature',
      'Backup export',
      'Do not send license codes'
    ]],
    ['kb/tr/license-read-only.md', [
      'docs/tr/screen-license.md',
      'invalid signature',
      'Backup export',
      'license code'
    ]],
    ['kb/en/update-stuck-76.md', [
      'docs/en/screen-updates.md',
      'SHA-256',
      'Signer thumbprint',
      'Do not bypass manifest verification'
    ]],
    ['kb/tr/update-stuck-76.md', [
      'docs/tr/screen-updates.md',
      'SHA-256',
      'Signer thumbprint',
      'Manifest doğrulamasını bypass etmeyin'
    ]],
    ['kb/tr/public-validation-fails.md', [
      'npm run validate:staged',
      'git diff --cached',
      'scripts/validate-docs.mjs',
      'Public repo yayın runbook',
      '## İlgili',
      'Public repo sınırı'
    ]],
    ['docs/en/public-language-glossary.md', [
      'PassMan',
      'redacted',
      'placeholder'
    ]],
    ['docs/tr/public-language-glossary.md', [
      'PassMan',
      'redakte edilmiş',
      'placeholder'
    ]],
    ['docs/en/public-screenshot-standards.md', [
      'assets/screenshots/MANIFEST.json',
      'assets/screenshots/update-center-vaultpilot-2.png',
      'retired legacy compatibility-line capture set',
      'scripts/validate-docs.mjs',
      'kb/en/public-screenshot-redaction.md'
    ]],
    ['docs/tr/public-screenshot-standards.md', [
      'assets/screenshots/MANIFEST.json',
      'assets/screenshots/update-center-vaultpilot-2.png',
      'Emekliye ayrılmış legacy compatibility ekran görüntüsü seti',
      'scripts/validate-docs.mjs',
      'kb/tr/public-screenshot-redaction.md'
    ]],
    ['kb/en/public-screenshot-redaction.md', [
      'docs/en/public-screenshot-standards.md',
      'gitleaks detect --no-git --redact --verbose --source .',
      '<REDACTED>'
    ]],
    ['kb/tr/public-screenshot-redaction.md', [
      'docs/tr/public-screenshot-standards.md',
      'gitleaks detect --no-git --redact --verbose --source .',
      '<REDACTED>'
    ]]
  ])

  for (const [file, references] of requiredReferences) {
    const fullPath = path.join(root, file)
    if (!existsSync(fullPath)) {
      fail(`required reference file is missing: ${file}`)
      continue
    }
    const content = readFileSync(fullPath, 'utf8')
    for (const reference of references) {
      if (!content.includes(reference)) {
        fail(`${file} must reference ${reference}`)
      }
    }
  }
}

function validateScreenHelpDocs() {
  if (screenHelpDocTargets.length === 0) {
    fail('topbar screen help target list is empty')
    return
  }

  const enIndexPath = path.join(root, 'docs', 'en', 'in-app-screen-help.md')
  const trIndexPath = path.join(root, 'docs', 'tr', 'in-app-screen-help.md')
  const enIndex = existsSync(enIndexPath)
    ? readFileSync(enIndexPath, 'utf8')
    : ''
  const trIndex = existsSync(trIndexPath)
    ? readFileSync(trIndexPath, 'utf8')
    : ''
  if (!enIndex) {
    fail('topbar help index is missing: docs/en/in-app-screen-help.md')
  }
  if (!trIndex) {
    fail('topbar help index is missing: docs/tr/in-app-screen-help.md')
  }
  for (const target of screenHelpDocTargets) {
    for (const language of ['en', 'tr']) {
      const rel = `docs/${language}/${target}`
      const fullPath = path.join(root, ...rel.split('/'))
      if (!existsSync(fullPath)) {
        fail(`topbar help target is missing: ${rel}`)
        continue
      }
      const content = readFileSync(fullPath, 'utf8')
      const requiredPhrases = language === 'tr'
        ? ['# ', '## ', 'İlgili', '## Ekran Durumları', '## İşlemden Önce', '| Durum | Operatör cevabı |']
        : ['# ', '## ', 'Related', '## Screen States', '## Before You Act', '| State | Operator response |']
      if (highRiskScreenHelpDocTargets.has(target)) {
        requiredPhrases.push(
          ...(language === 'tr'
            ? ['## Güvenli Kanıt', 'Paylaşılabilir:', 'Gizli kalmalı:']
            : ['## Safe Evidence', 'Safe to share:', 'Keep private:'])
        )
      }
      for (const phrase of requiredPhrases) {
        if (!content.includes(phrase)) {
          fail(`${rel} must include ${phrase} for screen-help structure`)
        }
      }
      if (language === 'tr') {
        const mechanicalTurkishScreenPhrases = [
          'Directory-origin credential',
          'custody review',
          'Current job',
          'Manual intervention',
          'owner workflow',
          'public evidence',
          'unused devices',
          'source account',
          'Manual edit',
          'record type',
          'required metadata',
          'secret value',
          'encrypted at rest',
          'encrypted secret',
          'browser profile',
          'Delivery failed',
          'Save blocked',
          'business reason',
          'recovery-safe',
          'file-exposure',
          "vault'a import",
          'Discovery evidence',
          'Feature gate',
          "feature gate'leri",
          'Lock behavior',
          'session safety',
          'server configuration',
          'maintenance evidence',
          'public evidence',
          'security posture',
          'directory sync',
          'custody kanıtı',
          "Recipient'ın",
          'usage limit',
          'release tag',
          'manifest signature',
          'Service restart',
          'maintenance window',
          'Verification failure',
          'stop condition',
          'hash match',
          'protected Owner',
          'vault access',
          'Privileged role',
          'Owner coverage',
          'inactive account',
          'Privileged change',
          'disable veya delete',
          'accountable owner',
          'Access change',
          'identity document',
          'Run başlatmadan',
          'run için',
          "path'leri",
          "dosya path'i",
          'redakte path',
          'internal hostname',
          'plaintext snippet',
          'database export',
          'finding confidence',
          'Scope denied',
          "Scan'i"
        ]
        for (const phrase of mechanicalTurkishScreenPhrases) {
          if (content.includes(phrase)) {
            fail(`${rel} contains mechanical Turkish/English screen-help wording: ${phrase}`)
          }
        }
      }
      if (!content.includes('`?`')) {
        fail(`${rel} must mention the topbar ? help button`)
      }
    }
    if (!enIndex.includes(target)) {
      fail(`docs/en/in-app-screen-help.md must link ${target}`)
    }
    if (!trIndex.includes(target)) {
      fail(`docs/tr/in-app-screen-help.md must link ${target}`)
    }
  }
}

function validateReleaseContract() {
  const contractPath = path.join(root, 'release-contract.json')
  if (!existsSync(contractPath)) {
    fail('required file is missing: release-contract.json')
    return
  }

  let contract
  try {
    contract = JSON.parse(readFileSync(contractPath, 'utf8'))
  } catch (error) {
    fail(`release-contract.json is not valid JSON: ${error.message}`)
    return
  }

  if (!['candidate', 'published'].includes(contract.state)) {
    fail('release-contract.json state must be candidate or published')
  }

  const requiredTargetKeys = [
    'server',
    'extension',
    'shareDecrypter',
    'dcAgent',
    'backupTool',
    'logCollector'
  ]
  const requiredObservedKeys = [
    'server',
    'extension',
    'extensionArchive',
    'shareDecrypter',
    'dcAgent'
  ]
  const semverPattern = /^\d+\.\d+\.\d+$/
  for (const key of requiredTargetKeys) {
    if (!semverPattern.test(contract.target?.[key] ?? '')) {
      fail(`release-contract.json target.${key} must be an explicit semantic version`)
    }
  }
  for (const key of requiredObservedKeys) {
    if (!semverPattern.test(contract.observedPublic?.[key] ?? '')) {
      fail(`release-contract.json observedPublic.${key} must be an explicit semantic version`)
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(contract.observedPublic?.checkedAt ?? '')) {
    fail('release-contract.json observedPublic.checkedAt must use YYYY-MM-DD')
  }

  if (errors.some((message) => message.startsWith('release-contract.json'))) {
    return
  }

  const target = contract.target
  const observed = contract.observedPublic
  const requireText = (relativePath, snippets) => {
    const fullPath = path.join(root, ...relativePath.split('/'))
    if (!existsSync(fullPath)) {
      fail(`release contract target is missing: ${relativePath}`)
      return
    }
    const content = readFileSync(fullPath, 'utf8')
    for (const snippet of snippets) {
      if (!content.includes(snippet)) {
        fail(`${relativePath} must match release-contract.json: ${snippet}`)
      }
    }
  }
  const forbidText = (relativePath, snippets) => {
    const fullPath = path.join(root, ...relativePath.split('/'))
    if (!existsSync(fullPath)) {
      fail(`release contract target is missing: ${relativePath}`)
      return
    }
    const content = readFileSync(fullPath, 'utf8')
    for (const snippet of snippets) {
      if (content.includes(snippet)) {
        fail(`${relativePath} must not retain provisional release wording after publication: ${snippet}`)
      }
    }
  }

  let packageManifest
  try {
    packageManifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
  } catch (error) {
    fail(`package.json is not valid JSON: ${error.message}`)
    return
  }
  if (packageManifest.version !== target.server) {
    fail(`package.json version ${packageManifest.version} must match release-contract.json target.server ${target.server}`)
  }

  const candidateRows = [
    `| VaultPilot Enterprise Vault Console | ${target.server} |`,
    `| Chromium Browser Extension | ${target.extension} |`,
    `| Offline Share Decrypter | ${target.shareDecrypter} |`,
    `| VaultPilot DC Agent Service | ${target.dcAgent} |`,
    `| VaultPilot Backup Tool | ${target.backupTool} |`,
    `| VaultPilot Log Collector | ${target.logCollector} |`
  ]
  for (const relativePath of [
    'README.md',
    'RELEASES.md'
  ]) {
    requireText(relativePath, candidateRows)
  }

  requireText('README.md', [`releases/tag/v${observed.server}`])
  requireText('RELEASES.md', [
    `DC Agent \`${target.dcAgent}\``,
    `independent \`${target.backupTool}\` component versions`
  ])

  for (const language of ['en', 'tr']) {
    const extensionObservedRow = language === 'tr'
      ? `| Chromium Browser Extension | Chrome Web Store ${observed.extension}; v${observed.server} arşivi ${observed.extensionArchive} |`
      : `| Chromium Browser Extension | Chrome Web Store ${observed.extension}; v${observed.server} archive ${observed.extensionArchive} |`
    requireText(`docs/${language}/release-asset-verification.md`, [
      `releases/tag/v${observed.server}`,
      `| VaultPilot Enterprise Vault Console | ${observed.server} |`,
      extensionObservedRow,
      `| Offline Share Decrypter | ${observed.shareDecrypter} |`,
      `| VaultPilot DC Agent Service | ${observed.dcAgent} |`,
      `| VaultPilot Backup Tool | ${target.backupTool} |`,
      `| VaultPilot Log Collector | ${target.logCollector} |`,
      `gh release view v${observed.server} --repo vaultekbilisim/vaultpilot`,
      `Get-FileHash .\\VaultPilot-${observed.server}-x64.msi -Algorithm SHA256`,
      `Get-AuthenticodeSignature .\\VaultPilot-${observed.server}-x64.msi`
    ])
    requireText(`docs/${language}/active-directory-agent.md`, [
      target.server,
      target.dcAgent,
      '`objectGUID`',
      '`objectSid`',
      '`tokenGroups`',
      '`primaryGroupID`',
      'fail-closed'
    ])
    requireText(`docs/${language}/screen-integrations.md`, [
      target.server,
      target.dcAgent,
      'fail-closed'
    ])
    for (const relativePath of [
      `docs/${language}/backups-and-restore.md`,
      `docs/${language}/screen-server-settings.md`,
      `docs/${language}/server-system.md`
    ]) {
      requireText(relativePath, [
        '`VaultPilotBackupTool.exe`',
        `\`${target.backupTool}\``,
        '`VaultPilotLogCollector.exe`',
        `\`${target.logCollector}\``
      ])
    }
  }

  requireText('docs/en/chrome-web-store-listing.md', [
    `| Current public extension version | \`${observed.extension}\` |`,
    observed.checkedAt
  ])
  requireText('docs/tr/chrome-web-store-listing.md', [
    `| Güncel public eklenti sürümü | \`${observed.extension}\` |`,
    observed.checkedAt
  ])
  for (const language of ['en', 'tr']) {
    requireText(`docs/${language}/public-external-surface-drift.md`, [
      observed.checkedAt,
      `version \`${observed.extension}\``.replace('version', language === 'tr' ? 'sürüm' : 'version'),
      '76.04KiB'
    ])
  }

  if (contract.state === 'candidate') {
    requireText('docs/en/chrome-web-store-listing.md', [
      `| Required version for the VaultPilot ${target.server} candidate | \`${target.extension}\``,
      `exact candidate extension version \`${target.extension}\``
    ])
    requireText('docs/tr/chrome-web-store-listing.md', [
      `| VaultPilot ${target.server} adayı için gereken sürüm | \`${target.extension}\``,
      `tam olarak aday eklenti sürümü \`${target.extension}\``
    ])
    for (const relativePath of [
      'docs/en/release-asset-verification.md',
      'docs/tr/release-asset-verification.md'
    ]) {
      requireText(relativePath, candidateRows)
    }
    requireText('README.md', [
      `Prepared ${target.server} Component Versions`,
      `remains \`v${observed.server}\` until publication`
    ])
    requireText('RELEASES.md', [
      `Prepared VaultPilot ${target.server} candidate`,
      'not published'
    ])
    requireText('docs/en/release-asset-verification.md', [
      `Prepared VaultPilot ${target.server} Candidate`,
      'Not Published'
    ])
    requireText('docs/tr/release-asset-verification.md', [
      `Hazırlanan VaultPilot ${target.server} Adayı`,
      'Henüz Yayınlanmadı'
    ])
    return
  }

  const publishedVersionPairs = [
    ['server', 'server'],
    ['extension', 'extension'],
    ['extensionArchive', 'extension'],
    ['shareDecrypter', 'shareDecrypter'],
    ['dcAgent', 'dcAgent']
  ]
  for (const [observedKey, targetKey] of publishedVersionPairs) {
    if (observed[observedKey] !== target[targetKey]) {
      fail(`published release-contract.json observedPublic.${observedKey} must match target.${targetKey}`)
    }
  }
  requireText('docs/en/chrome-web-store-listing.md', [
    `| Required version for the published VaultPilot ${target.server} release | \`${target.extension}\``,
    `exact published extension version \`${target.extension}\``
  ])
  requireText('docs/tr/chrome-web-store-listing.md', [
    `| Yayınlanan VaultPilot ${target.server} sürümü için gereken sürüm | \`${target.extension}\``,
    `tam olarak yayınlanan eklenti sürümü \`${target.extension}\``
  ])
  forbidText('docs/en/chrome-web-store-listing.md', [
    `VaultPilot ${target.server} candidate`,
    `candidate extension version \`${target.extension}\``
  ])
  forbidText('docs/tr/chrome-web-store-listing.md', [
    `VaultPilot ${target.server} adayı`,
    `aday eklenti sürümü \`${target.extension}\``
  ])
  requireText('README.md', [
    `Current verified public release:</strong> VaultPilot Enterprise Vault Console ${target.server}`,
    `releases/tag/v${target.server}`
  ])
  requireText('RELEASES.md', [`## VaultPilot ${target.server}`])
  requireText('docs/en/release-asset-verification.md', [
    `current verified public release is GitHub Release [\`v${target.server}\`]`
  ])
  requireText('docs/tr/release-asset-verification.md', [
    `Güncel doğrulanmış public release`,
    `[\`v${target.server}\`]`
  ])
  forbidText('README.md', [
    `Prepared ${target.server} Component Versions`,
    `until publication`,
    `This matrix describes the next prepared release set. It is not a claim that \`v${target.server}\` is already public; the latest verified public GitHub release remains \`v${observed.server}\` until publication is completed and checked.`
  ])
  forbidText('RELEASES.md', [
    `Prepared VaultPilot ${target.server} candidate`,
    'Status: locally prepared for release review. This section is not a GitHub Release announcement'
  ])
  forbidText('docs/en/release-asset-verification.md', [
    `Prepared VaultPilot ${target.server} Candidate`,
    `This matrix is a release-preparation contract, not evidence that \`v${target.server}\` is public. Until the release is published and independently checked, use the verified \`v${target.server}\` asset set below for customer downloads.`
  ])
  forbidText('docs/tr/release-asset-verification.md', [
    `Hazırlanan VaultPilot ${target.server} Adayı`,
    `Bu tablo yayın hazırlığı sözleşmesidir; \`v${target.server}\` sürümünün herkese açık olduğu anlamına gelmez. Yayın tamamlanıp bağımsız olarak doğrulanana kadar müşteri indirmelerinde aşağıdaki doğrulanmış \`v${target.server}\` dosya setini kullanın.`
  ])
}

function validateRootReadmeShape() {
  const file = path.join(root, 'README.md')
  const content = readFileSync(file, 'utf8')
  const lineCount = content.split(/\r?\n/).length
  if (lineCount > 240) {
    fail(`README.md should stay a scannable public entrypoint, not a full duplicated wiki (${lineCount} lines)`)
  }
  const duplicatedGatewayHeadings = [
    '## <img src="assets/icons/docs.svg" width="22" alt=""> Documentation Gateway',
    '## <img src="assets/icons/support.svg" width="22" alt=""> Knowledge Base Gateway',
    '## <img src="assets/icons/vault.svg" width="22" alt=""> Product Walkthrough'
  ]
  for (const heading of duplicatedGatewayHeadings) {
    if (content.includes(heading)) {
      fail(`README.md should link to gateway pages instead of duplicating ${heading}`)
    }
  }
}

function validateRemovedSiteFiles() {
  const removed = [
    ['.github', 'workflows', 'pages.yml'].join('/'),
    ['.', 'nojekyll'].join(''),
    'index.html',
    'docs/index.html',
    'kb/index.html',
    ['assets', 'styles.css'].join('/'),
    ['assets', 'site.js'].join('/')
  ]
  for (const file of removed) {
    if (existsSync(path.join(root, file))) {
      fail(`obsolete static public-site file must be removed: ${file}`)
    }
  }
}

function validateRemovedScreenshotFiles() {
  const removed = [
    'assets/screenshots/update-center.png',
    'assets/screenshots/browser-extension-management.png',
    'assets/screenshots/active-directory-sync-tree.png',
    'assets/screenshots/sharing-package-flow.png',
    'assets/screenshots/offline-share-decrypter.png'
  ]
  for (const file of removed) {
    if (existsSync(path.join(root, file))) {
      fail(`legacy PassMan screenshot asset must be removed: ${file}`)
    }
  }
}

function validateNoLargeReleaseAssets(files) {
  const blocked = /\.(msi|zip|exe|pfx|p12|db|sqlite)$/i
  const blockedReleaseSupport = /(?:^|[/\\])(?:vaultpilot|passman)-(?:update|extension-update|share-decrypter|dc-agent|ad-agent)\.(?:json|ps1)$/i
  for (const file of files) {
    if (blocked.test(file)) {
      fail(`release or sensitive binary must not be in git tree: ${relative(file)}`)
    }
    if (blockedReleaseSupport.test(relative(file))) {
      fail(`release support artifact must be published through GitHub Releases, not committed: ${relative(file)}`)
    }
  }
}

function readPngDimensions(filePath) {
  const bytes = readFileSync(filePath)
  const signature = bytes.subarray(0, 8).toString('hex').toUpperCase()
  if (signature !== '89504E470D0A1A0A') {
    fail(`${relative(filePath)} is not a valid PNG`)
    return { bytes, width: 0, height: 0 }
  }
  return {
    bytes,
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20)
  }
}

function validateScreenshotManifest() {
  const manifestPath = path.join(root, 'assets', 'screenshots', 'MANIFEST.json')
  let manifest
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch (error) {
    fail(`assets/screenshots/MANIFEST.json is not valid JSON: ${error.message}`)
    return
  }

  if (manifest.schemaVersion !== 1) {
    fail('assets/screenshots/MANIFEST.json must use schemaVersion 1')
  }
  if (!Array.isArray(manifest.screenshots)) {
    fail('assets/screenshots/MANIFEST.json must contain a screenshots array')
    return
  }

  const approved = new Set(approvedScreenshotPaths)
  const seen = new Set()
  for (const entry of manifest.screenshots) {
    if (!entry || typeof entry !== 'object') {
      fail('assets/screenshots/MANIFEST.json contains a non-object screenshot entry')
      continue
    }
    const rel = entry.path
    if (typeof rel !== 'string' || !approved.has(rel)) {
      fail(`assets/screenshots/MANIFEST.json contains unapproved screenshot path: ${rel}`)
      continue
    }
    if (seen.has(rel)) {
      fail(`assets/screenshots/MANIFEST.json contains duplicate screenshot path: ${rel}`)
      continue
    }
    seen.add(rel)

    const fullPath = path.join(root, ...rel.split('/'))
    if (!existsSync(fullPath)) {
      fail(`screenshot manifest path is missing: ${rel}`)
      continue
    }

    if (typeof entry.surface !== 'string' || entry.surface.trim().length < 3) {
      fail(`${rel} must have a human-readable surface in assets/screenshots/MANIFEST.json`)
    }
    if (typeof entry.fixtureNote !== 'string' || !/\bSynthetic\b/i.test(entry.fixtureNote)) {
      fail(`${rel} must have a synthetic fixture note in assets/screenshots/MANIFEST.json`)
    }

    const actual = readPngDimensions(fullPath)
    const actualHash = createHash('sha256').update(actual.bytes).digest('hex').toUpperCase()
    const actualSize = statSync(fullPath).size
    const expected = [
      ['width', actual.width],
      ['height', actual.height],
      ['bytes', actualSize],
      ['sha256', actualHash]
    ]
    for (const [field, value] of expected) {
      if (entry[field] !== value) {
        fail(`${rel} manifest ${field} is ${entry[field]}, expected ${value}`)
      }
    }
  }

  for (const rel of approvedScreenshotPaths) {
    if (!seen.has(rel)) {
      fail(`assets/screenshots/MANIFEST.json is missing ${rel}`)
    }
  }
}

function validateScreenshotAssets(files) {
  const approved = new Set(approvedScreenshotPaths)
  for (const file of files) {
    const rel = relative(file)
    if (!rel.startsWith('assets/screenshots/') || path.extname(file).toLowerCase() !== '.png') {
      continue
    }
    if (!approved.has(rel)) {
      fail(`${rel} is not in the approved public screenshot manifest`)
    }
    const size = statSync(file).size
    if (size > 2_000_000) {
      fail(`${rel} is too large for the public git tree (${size} bytes)`)
    }
    if (!/^[a-z0-9-]+\.png$/.test(path.basename(file))) {
      fail(`${rel} must use lowercase kebab-case naming`)
    }
  }
}

function validateScreenshotReferences(files) {
  const approved = new Set(approvedScreenshotPaths)
  const referenced = new Set()

  function validateScreenshotLink(sourceFile, target, altText = null) {
    if (!target.includes('assets/screenshots/') || path.extname(stripAnchor(target)).toLowerCase() !== '.png') {
      return
    }
    const rel = resolveLocalLink(sourceFile, target)
    if (!rel) {
      return
    }
    referenced.add(rel)
    if (!approved.has(rel)) {
      fail(`${relative(sourceFile)} references unapproved screenshot ${target}`)
    }
    if (altText !== null) {
      const normalizedAlt = altText.replace(/\s+/g, ' ').trim()
      if (normalizedAlt.length < 12 || /^screenshot$/i.test(normalizedAlt) || !/\bVaultPilot\b/.test(normalizedAlt)) {
        fail(`${relative(sourceFile)} has weak alt text for ${target}`)
      }
    }
  }

  for (const file of files) {
    if (path.extname(file).toLowerCase() !== '.md') {
      continue
    }
    const content = readFileSync(file, 'utf8')

    for (const match of content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      validateScreenshotLink(file, match[2], match[1])
    }
    for (const match of content.matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)) {
      validateScreenshotLink(file, match[1])
    }
    for (const match of content.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0]
      validateScreenshotLink(file, getHtmlAttribute(tag, 'src'), getHtmlAttribute(tag, 'alt'))
    }
  }

  for (const rel of approvedScreenshotPaths) {
    if (!referenced.has(rel)) {
      fail(`${rel} must be referenced by public Markdown`)
    }
  }
}

const files = walk(root)
validateRequiredFiles()
validateRequiredPublicReferences()
validateScreenHelpDocs()
validateReleaseContract()
validateRootReadmeShape()
validateRemovedSiteFiles()
validateRemovedScreenshotFiles()
validatePairedDocs()
validateNoLargeReleaseAssets(files)
validateScreenshotManifest()
validateScreenshotAssets(files)
validateScreenshotReferences(files)

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (publicBinaryExtensions.has(ext)) {
    continue
  }
  const baseName = path.basename(file)
  if (!textExtensions.has(ext) && baseName !== '.gitignore' && baseName !== '.gitattributes') {
    warn(`skipped non-text file: ${relative(file)}`)
    continue
  }
  const content = readFileSync(file, 'utf8')
  if (content.includes('\r\n')) {
    fail(`${relative(file)} must use LF line endings`)
  }
  if (relative(file) !== 'scripts/validate-docs.mjs') {
    validateForbiddenPatterns(file, content)
  }
  if (linkFileExtensions.has(ext)) {
    validateLinks(file, content)
  }
}

if (warnings.length > 0) {
  console.warn(warnings.join('\n'))
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const totalBytes = files.reduce((sum, file) => sum + statSync(file).size, 0)
const target = validateStaged ? 'staged index' : 'working tree'
console.log(`Validated ${target}: ${files.length} files (${totalBytes} bytes).`)

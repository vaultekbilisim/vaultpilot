import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors = []
const warnings = []

const ignoredDirectories = new Set(['.git', 'node_modules'])
const textExtensions = new Set(['.md', '.mjs', '.json', '.svg', '.yml', '.yaml'])
const publicBinaryExtensions = new Set(['.png'])
const linkFileExtensions = new Set(['.md'])

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

function stripAnchor(target) {
  return target.split('#')[0].split('?')[0]
}

function isExternal(target) {
  return /^(https?:|mailto:|tel:)/i.test(target)
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
  if (!resolved.startsWith(root)) {
    fail(`${relative(sourceFile)} links outside repository: ${target}`)
    return
  }
  if (!existsSync(resolved)) {
    fail(`${relative(sourceFile)} has broken local link: ${target}`)
  }
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
    [/github\.io\/passman-releases/i, 'obsolete static public-site URL'],
    [/PASSMAN_[A-Z_]*ADMIN_TOKEN/i, 'obsolete static public-site admin token reference'],
    [/\.github\/workflows\/[a-z]+\.yml/i, 'obsolete static public-site workflow reference'],
    [/\]\([^)]*index\.html[)#?]?/i, 'obsolete static public-site html index link'],
    [/\bassets\/(?:styles\.css|site\.js)\b/i, 'obsolete static public-site asset reference'],
    [/[ÃÄÅÂ�]/, 'mojibake or replacement-character encoding artifact']
  ]

  for (const [pattern, label] of forbidden) {
    if (pattern.test(content)) {
      fail(`${rel} contains ${label}`)
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
    'README.md',
    'docs/README.md',
    'docs/en/README.md',
    'docs/tr/README.md',
    'kb/README.md',
    'kb/en/README.md',
    'kb/tr/README.md',
    'RELEASES.md',
    'SECURITY.md',
    'SUPPORT.md',
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
    'assets/screenshots/login-lock-screen.png',
    'assets/screenshots/overview-security-posture.png',
    'assets/screenshots/passwords-record-list.png',
    'assets/screenshots/sharing-package-flow.png',
    'assets/screenshots/update-center.png',
    'assets/screenshots/browser-extension-management.png',
    'assets/screenshots/active-directory-sync-tree.png',
    'assets/screenshots/offline-share-decrypter.png'
  ]
  for (const file of required) {
    const fullPath = path.join(root, file)
    if (!existsSync(fullPath)) {
      fail(`required file is missing: ${file}`)
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

function validateNoLargeReleaseAssets(files) {
  const blocked = /\.(msi|zip|exe|pfx|p12|db|sqlite)$/i
  for (const file of files) {
    if (blocked.test(file)) {
      fail(`release or sensitive binary must not be in git tree: ${relative(file)}`)
    }
  }
}

function validateScreenshotAssets(files) {
  for (const file of files) {
    const rel = relative(file)
    if (!rel.startsWith('assets/screenshots/') || path.extname(file).toLowerCase() !== '.png') {
      continue
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

const files = walk(root)
validateRequiredFiles()
validateRemovedSiteFiles()
validatePairedDocs()
validateNoLargeReleaseAssets(files)
validateScreenshotAssets(files)

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (publicBinaryExtensions.has(ext)) {
    continue
  }
  if (!textExtensions.has(ext) && path.basename(file) !== '.gitignore') {
    warn(`skipped non-text file: ${relative(file)}`)
    continue
  }
  const content = readFileSync(file, 'utf8')
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
console.log(`Validated ${files.length} files (${totalBytes} bytes).`)

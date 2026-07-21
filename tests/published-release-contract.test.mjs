import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const stalePublishedWordingCases = [
  {
    relativePath: 'README.md',
    snippet: 'This matrix describes the next prepared release set. It is not a claim that `v2.2.0` is already public; the latest verified public GitHub release remains `v2.0.0` until publication is completed and checked.'
  },
  {
    relativePath: 'RELEASES.md',
    snippet: 'Status: locally prepared for release review. This section is not a GitHub Release announcement and does not replace the verified public `v2.0.0` record below.'
  },
  {
    relativePath: 'docs/en/release-asset-verification.md',
    snippet: 'This matrix is a release-preparation contract, not evidence that `v2.2.0` is public. Until the release is published and independently checked, use the verified `v2.2.0` asset set below for customer downloads.'
  },
  {
    relativePath: 'docs/tr/release-asset-verification.md',
    snippet: 'Bu tablo yayın hazırlığı sözleşmesidir; `v2.2.0` sürümünün herkese açık olduğu anlamına gelmez. Yayın tamamlanıp bağımsız olarak doğrulanana kadar müşteri indirmelerinde aşağıdaki doğrulanmış `v2.2.0` dosya setini kullanın.'
  }
]

function replaceRequired(root, relativePath, from, to) {
  const target = path.join(root, ...relativePath.split('/'))
  const content = readFileSync(target, 'utf8')
  assert.ok(content.includes(from), `${relativePath} fixture source is missing: ${from}`)
  writeFileSync(target, content.replaceAll(from, to), 'utf8')
}

function preparePublishedFixture(root) {
  const contractPath = path.join(root, 'release-contract.json')
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'))
  contract.state = 'published'
  contract.observedPublic = {
    checkedAt: contract.observedPublic.checkedAt,
    server: contract.target.server,
    extension: contract.target.extension,
    extensionArchive: contract.target.extension,
    shareDecrypter: contract.target.shareDecrypter,
    dcAgent: contract.target.dcAgent
  }
  writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`, 'utf8')

  replaceRequired(
    root,
    'README.md',
    '<strong>Current verified public release:</strong> VaultPilot Enterprise Vault Console 2.0.0, published as GitHub Release <a href="https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0">v2.0.0</a> on June 30, 2026.',
    '<strong>Current verified public release:</strong> VaultPilot Enterprise Vault Console 2.2.0, published as GitHub Release <a href="https://github.com/ucsahinn/vaultpilot/releases/tag/v2.2.0">v2.2.0</a>.'
  )
  replaceRequired(root, 'README.md', 'Prepared 2.2.0 Component Versions', 'VaultPilot 2.2.0 Component Versions')
  replaceRequired(
    root,
    'README.md',
    stalePublishedWordingCases[0].snippet,
    'This matrix records the component versions independently verified for the public `v2.2.0` release.'
  )

  replaceRequired(root, 'RELEASES.md', '## Prepared VaultPilot 2.2.0 candidate — not published', '## VaultPilot 2.2.0')
  replaceRequired(
    root,
    'RELEASES.md',
    stalePublishedWordingCases[1].snippet,
    'Status: published and independently verified against GitHub Release `v2.2.0`.'
  )

  for (const language of ['en', 'tr']) {
    const relativePath = `docs/${language}/release-asset-verification.md`
    replaceRequired(root, relativePath, 'gh release view v2.0.0 --repo ucsahinn/vaultpilot', 'gh release view v2.2.0 --repo ucsahinn/vaultpilot')
    replaceRequired(root, relativePath, 'VaultPilot-2.0.0-x64.msi', 'VaultPilot-2.2.0-x64.msi')
    replaceRequired(root, relativePath, 'v2.0.0', 'v2.2.0')
    replaceRequired(root, relativePath, '| VaultPilot Enterprise Vault Console | 2.0.0 |', '| VaultPilot Enterprise Vault Console | 2.2.0 |')
    replaceRequired(root, relativePath, '1.3.2', '1.3.3')
    replaceRequired(root, relativePath, '| Offline Share Decrypter | 1.2.0 |', '| Offline Share Decrypter | 1.2.1 |')
    replaceRequired(root, relativePath, '| VaultPilot DC Agent Service | 1.2.10 |', '| VaultPilot DC Agent Service | 1.2.21 |')
  }
  replaceRequired(root, 'docs/en/release-asset-verification.md', '## Prepared VaultPilot 2.2.0 Candidate — Not Published', '## VaultPilot 2.2.0 Release Evidence')
  replaceRequired(
    root,
    'docs/en/release-asset-verification.md',
    stalePublishedWordingCases[2].snippet,
    'This matrix records the independently checked public `v2.2.0` asset set used for customer downloads.'
  )
  replaceRequired(root, 'docs/tr/release-asset-verification.md', '## Hazırlanan VaultPilot 2.2.0 Adayı — Henüz Yayınlanmadı', '## VaultPilot 2.2.0 Yayın Kanıtı')
  replaceRequired(
    root,
    'docs/tr/release-asset-verification.md',
    stalePublishedWordingCases[3].snippet,
    'Bu tablo, müşteri indirmelerinde kullanılan ve bağımsız olarak doğrulanan public `v2.2.0` dosya setini kaydeder.'
  )

  replaceRequired(root, 'docs/en/chrome-web-store-listing.md', 'Required version for the VaultPilot 2.2.0 candidate', 'Required version for the published VaultPilot 2.2.0 release')
  replaceRequired(root, 'docs/en/chrome-web-store-listing.md', 'exact candidate extension version `1.3.3`', 'exact published extension version `1.3.3`')
  replaceRequired(root, 'docs/tr/chrome-web-store-listing.md', 'VaultPilot 2.2.0 adayı için gereken sürüm', 'Yayınlanan VaultPilot 2.2.0 sürümü için gereken sürüm')
  replaceRequired(root, 'docs/tr/chrome-web-store-listing.md', 'tam olarak aday eklenti sürümü `1.3.3`', 'tam olarak yayınlanan eklenti sürümü `1.3.3`')
}

function createPublishedFixture(t) {
  const fixtureRoot = mkdtempSync(path.join(tmpdir(), 'vaultpilot-public-published-'))
  t.after(() => {
    assert.equal(path.dirname(fixtureRoot), path.resolve(tmpdir()))
    rmSync(fixtureRoot, { recursive: true, force: true })
  })
  cpSync(repositoryRoot, fixtureRoot, {
    recursive: true,
    filter(source) {
      const relative = path.relative(repositoryRoot, source)
      return relative === '' || !relative.split(path.sep).some((segment) => segment === '.git' || segment === 'node_modules')
    }
  })
  preparePublishedFixture(fixtureRoot)
  return fixtureRoot
}

function runValidator(root) {
  return spawnSync(process.execPath, ['scripts/validate-docs.mjs'], {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true
  })
}

test('candidate contract tracks the current managed support-tool versions', () => {
  const contract = JSON.parse(readFileSync(path.join(repositoryRoot, 'release-contract.json'), 'utf8'))

  assert.equal(contract.target.backupTool, '1.0.1')
  assert.equal(contract.target.logCollector, '1.0.1')
})

test('published release contract validates without retaining candidate-only Chrome listing language', (t) => {
  const fixtureRoot = createPublishedFixture(t)
  const result = runValidator(fixtureRoot)

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
})

for (const { relativePath, snippet } of stalePublishedWordingCases) {
  test(`published release contract rejects stale candidate wording in ${relativePath}`, (t) => {
    const fixtureRoot = createPublishedFixture(t)
    const target = path.join(fixtureRoot, ...relativePath.split('/'))
    writeFileSync(target, `${readFileSync(target, 'utf8')}\n${snippet}\n`, 'utf8')

    const result = runValidator(fixtureRoot)

    assert.notEqual(result.status, 0, `${relativePath} unexpectedly retained stale candidate wording`)
    const publishedWordingError = new RegExp([
      'must not retain provisional release wording',
      'after',
      'publication'
    ].join(' '), 'u')
    assert.match(`${result.stdout}\n${result.stderr}`, publishedWordingError)
  })
}

for (const language of ['en', 'tr']) {
  test(`release asset verification rejects stale managed support-tool versions in ${language}`, (t) => {
    const fixtureRoot = createPublishedFixture(t)
    const relativePath = `docs/${language}/release-asset-verification.md`

    replaceRequired(fixtureRoot, relativePath, '| VaultPilot Backup Tool | 1.0.1 |', '| VaultPilot Backup Tool | 1.0.0 |')
    replaceRequired(fixtureRoot, relativePath, '| VaultPilot Log Collector | 1.0.1 |', '| VaultPilot Log Collector | 1.0.0 |')

    const result = runValidator(fixtureRoot)
    assert.notEqual(result.status, 0, `${relativePath} unexpectedly accepted stale managed support-tool versions`)
  })
}

test('staged validation runs the published-mode regression suite before validating the index', () => {
  const packageManifest = JSON.parse(readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'))

  assert.equal(packageManifest.scripts['validate:staged'], 'node scripts/validate-staged.mjs')
})

test('staged validation runs both tests and docs validation from the staged checkout', {
  skip: process.env.VAULTPILOT_PUBLIC_STAGED_CHILD === '1'
}, (t) => {
  const fixtureRoot = mkdtempSync(path.join(tmpdir(), 'vaultpilot-public-staged-contract-'))
  t.after(() => {
    assert.equal(path.dirname(fixtureRoot), path.resolve(tmpdir()))
    rmSync(fixtureRoot, { recursive: true, force: true })
  })
  cpSync(repositoryRoot, fixtureRoot, {
    recursive: true,
    filter(source) {
      const relative = path.relative(repositoryRoot, source)
      return relative === '' || !relative.split(path.sep).some((segment) => segment === '.git' || segment === 'node_modules')
    }
  })

  for (const args of [['init'], ['add', '-A']]) {
    const git = spawnSync('git', args, { cwd: fixtureRoot, encoding: 'utf8', windowsHide: true })
    assert.equal(git.status, 0, `${git.stdout}\n${git.stderr}`)
  }

  const workingTreeTest = path.join(fixtureRoot, 'tests', 'published-release-contract.test.mjs')
  writeFileSync(workingTreeTest, `${readFileSync(workingTreeTest, 'utf8')}\nthrow new Error('working-tree-only staged validation trap')\n`, 'utf8')

  const result = spawnSync(process.execPath, ['scripts/validate-staged.mjs'], {
    cwd: fixtureRoot,
    encoding: 'utf8',
    env: { ...process.env, VAULTPILOT_PUBLIC_STAGED_PARENT: '1' },
    windowsHide: true
  })

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
  assert.match(result.stdout, /Validated working tree:/u)
})

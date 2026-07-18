import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const workspaceRoot = process.cwd()

function hasStagedChanges() {
  try {
    execFileSync('git', ['diff', '--cached', '--quiet'], { cwd: workspaceRoot, stdio: 'pipe' })
    return false
  } catch (error) {
    if (error.status === 1) {
      return true
    }
    throw error
  }
}

function runNode(args, cwd, env = process.env) {
  const result = spawnSync(process.execPath, args, {
    cwd,
    env,
    stdio: 'inherit',
    windowsHide: true
  })
  if (result.error) {
    throw result.error
  }
  return result.status === null ? 1 : result.status
}

if (!hasStagedChanges()) {
  console.log('No staged changes found; skipped staged-tree validation.')
  process.exit(0)
}

const stagedTempRoot = mkdtempSync(path.join(os.tmpdir(), 'vaultpilot-public-staged-'))
const stagedRoot = path.join(stagedTempRoot, 'tree')
let exitCode = 1

try {
  mkdirSync(stagedRoot, { recursive: true })
  execFileSync('git', ['checkout-index', '-a', `--prefix=${stagedRoot}${path.sep}`], {
    cwd: workspaceRoot,
    stdio: 'pipe'
  })

  const stagedTests = readdirSync(path.join(stagedRoot, 'tests'))
    .filter((fileName) => fileName.endsWith('.test.mjs'))
    .sort()
    .map((fileName) => path.join('tests', fileName))
  if (stagedTests.length === 0) {
    throw new Error('Staged public tree contains no Node regression tests.')
  }

  const stagedTestEnvironment = {
    ...process.env,
    VAULTPILOT_PUBLIC_STAGED_CHILD: '1'
  }
  delete stagedTestEnvironment.NODE_TEST_CONTEXT
  const testExitCode = runNode(['--test', ...stagedTests], stagedRoot, stagedTestEnvironment)
  if (testExitCode !== 0) {
    exitCode = testExitCode
  } else {
    exitCode = runNode(['scripts/validate-docs.mjs'], stagedRoot)
  }
} finally {
  rmSync(stagedTempRoot, { recursive: true, force: true })
}

process.exitCode = exitCode

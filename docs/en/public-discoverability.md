# Public Discoverability

Use this page when preparing the public repository for GitHub discovery, Google Search, and AI/LLM context surfaces. It is a maintainer checklist, not a ranking promise. The goal is to make the public VaultPilot surface easy to identify without implying that the private product source, customer data, release binaries, or reuse rights are published here.

## Controlled In This Repository

| Surface | Source of truth | Required state |
| --- | --- | --- |
| First screen | `README.md` | Current release, docs, KB, security, support, public boundary, and release trust path are visible before deep scrolling. |
| Public metadata wording | [GitHub repository profile](github-repository-profile.md), [public language glossary](public-language-glossary.md) | Product name, PassMan compatibility wording, issue intake, and support language stay consistent. |
| Social preview asset | `assets/visuals/social-preview.png` | Use the repository-owned PNG. If regenerated, target 1280 x 640, keep it under 1 MB, and use no customer data. |
| AI/LLM index | `llms.txt` | Keep canonical public pages listed; do not include secrets, account data, customer context, or private-source paths. |
| Operator documentation | [Documentation gateway](../README.md) | Keep English and Turkish document names paired so public links remain predictable. |

## GitHub Account Checklist

These surfaces require repository-owner access and cannot be completed by a docs-only change unless the owner approves the account-side update.

| Surface | Required value or rule |
| --- | --- |
| Repository name | `vaultpilot` |
| Description | Public release hub, operator wiki, knowledge base, and support boundary for VaultPilot Enterprise Vault Console. |
| Homepage | Use `https://github.com/ucsahinn/vaultpilot#readme` as the canonical public homepage. Keep latest-release calls to action inside the README and release docs. |
| Topics | Keep useful discovery topics such as `vaultpilot`, `password-manager`, `secrets-manager`, `zero-knowledge`, `self-hosted`, `windows-server`, `msi`, `enterprise-security`, `browser-extension`, `active-directory`, `documentation`, and `knowledge-base`. GitHub topics should use lowercase letters, numbers, and hyphens; keep each topic at 50 characters or fewer and use no more than 20 topics. |
| Social preview | Upload or select `assets/visuals/social-preview.png` in repository settings. |
| Security policy | Keep GitHub security policy enabled and pointing to `SECURITY.md`. |
| Issues and discussions | Keep disabled unless the owner can moderate secrets, logs, customer data, and incomplete redaction. If Issues are enabled, limit intake to the public templates. |
| License | Do not claim open-source status until the owner adds an approved root `LICENSE` or `LICENSE.md`. |
| Chrome Web Store listing | Keep title, summary, screenshots, and privacy wording aligned with this repository, but update it through the Chrome Web Store account, not git. |

Track observed owner-gated drift in [Public external surface drift](public-external-surface-drift.md) before asking the owner to change account-side settings.

`package.json` keywords mirror the preferred GitHub topic set for local tooling and review. They do not update GitHub repository topics; the real public topics must be checked in repository settings or on the public GitHub page.

## LLM Index Rules

`llms.txt` is a curated Markdown index for tools that choose to read `/llms.txt`-style files. Keep it short, link-focused and safe:

- Start with one H1, a short blockquote summary and a small number of H2 sections.
- Use Markdown links with short notes so tools can choose the right page without loading the whole repository.
- Prefer canonical public docs, KB pages, policy files and issue templates over deep implementation detail.
- Keep private-source paths, local operator paths, account exports, dashboard screenshots, tokens, release binaries and customer evidence out of the file.
- Treat `llms.txt` as discoverability help only. It does not grant permission, block crawling, replace `robots.txt`, replace this documentation set or create SEO ranking guarantees.

## Google Search And AI Limits

- Google Search visibility cannot be guaranteed from repository content alone. Good public documentation helps crawlers and readers understand the project, but indexing and ranking are external outcomes.
- Lighthouse, rendered metadata, structured data, Core Web Vitals, robots/canonical/hreflang and sitemap behavior cannot be proven from local repository Markdown alone. They require a live rendered URL; Search Console and field Core Web Vitals data also require an eligible verified property with enough traffic data.
- Keep the first paragraphs of the root README self-contained. Search results, social previews, and AI summaries often rely on early page context.
- Do not hide important product boundaries only in images. Repeat the source boundary, release delivery path, and support evidence rules in text.
- `llms.txt` is an index surface for tools that choose to read it. It is not an authorization boundary, privacy control, or replacement for public documentation.
- Do not add private source paths, local operator paths, customer hostnames, account identifiers, tokens, license values, database names, screenshots with real records, or support logs for discoverability.

## Optional Search Console Check

Run this only when the repository owner wants Google indexing evidence. It is not required for normal docs publication:

1. Open a private or signed-out browser and search `site:github.com/ucsahinn/vaultpilot VaultPilot`.
2. Confirm the result title and snippet do not imply private source code, release binaries, customer data, or license terms are published in git.
3. Open the public repository page and verify the README, social preview, release link, support boundary, and Chrome Web Store link render without account access.
4. If the owner controls a verified Search Console property for a public VaultPilot docs domain or deployed public site, use URL Inspection only for URLs inside that verified property and record the public result summary only. Do not imply that the GitHub repository path itself is inspectable unless it is part of a property the owner can verify and open in Search Console.
5. Do not commit Search Console ownership files, verification tokens, analytics tags, account exports, or screenshots that expose account identifiers.

## Out-Of-Repository Follow-Up

| Item | Why it is gated |
| --- | --- |
| GitHub topics, description, homepage, social preview, Issues, Discussions, and security policy toggles | These are account-side repository settings. |
| GitHub Release descriptions and asset lists | They are release records, not normal docs files. |
| Chrome Web Store listing text and screenshots | They require Chrome Web Store publisher access. |
| Search Console or analytics verification | They require account access and are not necessary for the public docs repository itself. |

## Verification

Before publishing public discoverability changes:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

If files are already prepared in the git index, also run:

```powershell
npm run validate:staged
```

External references:

- [GitHub repository topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)
- [GitHub social media preview](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview)
- [GitHub licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
- [Google Search SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289)
- [Google Search Console Core Web Vitals report](https://support.google.com/webmasters/answer/9205520)
- [Lighthouse structured data manual check](https://developer.chrome.com/docs/lighthouse/seo/structured-data)
- [llms.txt proposal](https://llmstxt.org/)

Related:

- [GitHub repository profile](github-repository-profile.md)
- [Public external surface drift](public-external-surface-drift.md)
- [Public language glossary](public-language-glossary.md)
- [Public repository boundary](public-repository-boundary.md)
- [Support evidence pack](support-evidence-pack.md)
- [Security policy](../../SECURITY.md)

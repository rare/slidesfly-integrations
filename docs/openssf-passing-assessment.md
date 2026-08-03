# OpenSSF Best Practices passing assessment submission draft

This document is a pre-application draft for the OpenSSF Best Practices passing level. It does not
claim that `rare/slidesfly-integrations`, Slidesfly, or the private Slidesfly SaaS has earned a badge.
Only the project page on `bestpractices.dev` can establish badge status.

## Assessment boundary and snapshot

- Scope: the public `rare/slidesfly-integrations` repository and the software released from it.
- Out of scope: the private Slidesfly SaaS, production infrastructure, customer data, billing, and
  controls that cannot be evidenced by this public repository.
- Criteria source: the 67 active passing-level criteria in
  [`ossf/best-practices-badge`](https://github.com/ossf/best-practices-badge/blob/76ccba67c6a70cb2a2d9c78040cb793a6f9124a1/criteria/criteria.yml),
  reviewed on 2026-08-03.
- Repository evidence snapshot: public `main` commit
  [`0ae4f25`](https://github.com/rare/slidesfly-integrations/commit/0ae4f25a973ef009c288ef3180237c98875f3d75),
  including the merged CodeQL remediation, passing `main` CodeQL analysis, and the verified v0.3.1
  Sigstore release-attestation workflow.

`Met`, `N/A`, and `Unmet` below are proposed form answers, not accepted answers. The owner
attestations required by `vulnerability_report_response`, `know_secure_design`, and
`know_common_errors` were recorded on 2026-08-03. Repository-backed answers were rechecked against
the live GitHub control plane on the same date.

## Form-answer draft

### Basics

| Criterion | Level | Draft | Evidence or justification |
|---|---|---|---|
| `description_good` | MUST | Met | The [README](../README.md) starts with a concise, user-facing product description. |
| `interact` | MUST | Met | The [README](../README.md), [contribution guide](../CONTRIBUTING.md), and issue templates explain how to obtain, use, report, request, and contribute. |
| `contribution` | MUST | Met | [CONTRIBUTING.md](../CONTRIBUTING.md) requires a branch, pull request, focused scope, and verification. |
| `contribution_requirements` | SHOULD | Met | [CONTRIBUTING.md](../CONTRIBUTING.md) defines tests, security, workflow pinning, warning, and release requirements. |
| `floss_license` | MUST | Met | Repository results are released under the MIT license. |
| `floss_license_osi` | SUGGESTED | Met | MIT is OSI-approved. |
| `license_location` | MUST | Met | The license is in the top-level [LICENSE](../LICENSE) file. |
| `documentation_basics` | MUST | Met | The [README](../README.md), package READMEs, examples, and [security policy](../SECURITY.md) cover installation, startup, use, and safe use. |
| `documentation_interface` | MUST | Met | The [Action README](../actions/publish/README.md), [MCP README](../mcp/README.md), and [Skill README](../skills/slidesfly/README.md) document inputs, outputs, commands, and failure behavior. |
| `sites_https` | MUST | Met | GitHub, npm, Marketplace, and Slidesfly links used for source and delivery are HTTPS. |
| `discussion` | MUST | Met | GitHub issues and pull requests are searchable, URL-addressable, and open to new participants. |
| `english` | SHOULD | Met | Public documentation and contribution surfaces are in English and accept English reports. |
| `maintained` | MUST | Met | The repository is unarchived and has current commits, releases, dependency updates, CI, CodeQL, and Scorecard runs; [MAINTENANCE.md](../MAINTENANCE.md) states the policy. |

### Change control

| Criterion | Level | Draft | Evidence or justification |
|---|---|---|---|
| `repo_public` | MUST | Met | [`rare/slidesfly-integrations`](https://github.com/rare/slidesfly-integrations) is publicly readable. |
| `repo_track` | MUST | Met | Public Git history records commits, authors, and timestamps. |
| `repo_interim` | MUST | Met | Development commits and pull requests are public between tagged releases. |
| `repo_distributed` | SUGGESTED | Met | The project uses Git. |
| `version_unique` | MUST | Met | Releases use unique SemVer tags and immutable Git commit identifiers. |
| `version_semver` | SUGGESTED | Met | Release tags use SemVer, currently through `v0.3.1`. |
| `version_tags` | SUGGESTED | Met | Each public release is associated with a Git tag. |
| `release_notes` | MUST | Met | [GitHub Releases](https://github.com/rare/slidesfly-integrations/releases) contain human-written notes for every release. |
| `release_notes_vulns` | MUST | N/A | No release has fixed a publicly known runtime vulnerability with a CVE or similar identifier. If that changes, the affected release notes must identify it. |

### Reporting

| Criterion | Level | Draft | Evidence or justification |
|---|---|---|---|
| `report_process` | MUST | Met | The [bug template](../.github/ISSUE_TEMPLATE/bug.yml), [compatibility template](../.github/ISSUE_TEMPLATE/compatibility.yml), and [CONTRIBUTING.md](../CONTRIBUTING.md) define the reporting process. |
| `report_tracker` | SHOULD | Met | GitHub Issues is the individual issue tracker. |
| `report_responses` | MUST | Met | As of 2026-08-03, the public tracker has no bug report in the eligible 2–12 month window; there is no unacknowledged eligible report. Recheck immediately before submission. |
| `enhancement_responses` | SHOULD | Met | As of 2026-08-03, the public tracker has no enhancement request in the eligible 2–12 month window. Recheck immediately before submission. |
| `report_archive` | MUST | Met | [GitHub Issues](https://github.com/rare/slidesfly-integrations/issues?q=is%3Aissue) and pull requests provide a public, searchable archive with stable URLs. |
| `vulnerability_report_process` | MUST | Met | [SECURITY.md](../SECURITY.md) publishes the vulnerability reporting process. |
| `vulnerability_report_private` | MUST | Met | [SECURITY.md](../SECURITY.md) directs reporters to GitHub private vulnerability reporting; the repository setting was verified enabled through the authenticated GitHub API on 2026-08-03. |
| `vulnerability_report_response` | MUST | N/A | On 2026-08-03, the owner confirmed that the project received no vulnerability report in the previous six months. |

### Quality

| Criterion | Level | Draft | Evidence or justification |
|---|---|---|---|
| `build` | MUST | Met | [Validation CI](../.github/workflows/validate.yml) rebuilds the Reveal.js, Slidev, and Marp examples from source and lockfiles. |
| `build_common_tools` | SUGGESTED | Met | Builds use common npm/Node and shell tooling. |
| `build_floss_tools` | SHOULD | Met | The build path uses FLOSS Node packages and shell tooling; no proprietary compiler is required. |
| `test` | MUST | Met | Public Node and shell test suites run in [validation CI](../.github/workflows/validate.yml). |
| `test_invocation` | SHOULD | Met | Tests use standard `node --test` and executable shell test commands, documented by the workflow. |
| `test_most` | SUGGESTED | Unmet | The repository does not publish branch-coverage evidence and does not claim that most branches are covered. |
| `test_continuous_integration` | SUGGESTED | Met | Validation runs on every pull request and every push to `main`. |
| `test_policy` | MUST | Met | [CONTRIBUTING.md](../CONTRIBUTING.md) requires major new functionality to add or update automated tests. |
| `tests_are_added` | MUST | Met | Release-attestation functionality added dedicated validation tests in [PR #30](https://github.com/rare/slidesfly-integrations/pull/30), and the merged CodeQL remediation added message-action regressions in [PR #31](https://github.com/rare/slidesfly-integrations/pull/31). |
| `tests_documented_added` | SUGGESTED | Met | The test-addition policy is documented in [CONTRIBUTING.md](../CONTRIBUTING.md). |
| `warnings` | MUST | N/A | Project source is interpreted JavaScript, HTML, and shell; there is no applicable project compiler warning flag. Builds and validators still fail on reported errors. |
| `warnings_fixed` | MUST | N/A | No applicable compiler-warning stream exists for the project source. CI failures and security findings are handled by their dedicated criteria. |
| `warnings_strict` | SUGGESTED | N/A | No applicable compiler-warning flag set exists; contribution policy treats new warnings as failures unless explicitly justified. |

### Security

| Criterion | Level | Draft | Evidence or justification |
|---|---|---|---|
| `know_secure_design` | MUST | Met | On 2026-08-03, a primary developer personally attested to the secure-design knowledge listed by the criterion. |
| `know_common_errors` | MUST | Met | On 2026-08-03, a primary developer personally attested to knowledge of relevant CWE/OWASP error classes and mitigations. |
| `crypto_published` | MUST | Met | Release verification uses publicly specified SHA-256 and SHA-512 through Node's standard cryptographic library. |
| `crypto_call` | SHOULD | Met | The project calls Node's standard cryptographic implementation and does not implement cryptographic primitives. |
| `crypto_floss` | MUST | Met | The cryptographic checksum functionality is implementable with FLOSS Node/OpenSSL tooling. |
| `crypto_keylength` | MUST | N/A | The project does not create or manage cryptographic keys; checksum digest sizes are not configurable key lengths. |
| `crypto_working` | MUST | Met | The default checksums are SHA-256 and SHA-512; no broken algorithm such as MD5 or SHA-1 is used for security. |
| `crypto_weaknesses` | SHOULD | Met | No security mechanism depends on an algorithm or mode with a known serious weakness. |
| `crypto_pfs` | SHOULD | N/A | The project implements no key-agreement protocol. HTTPS properties are provided by external delivery services. |
| `crypto_password_storage` | MUST | N/A | The public integrations do not store passwords or authenticate external users with passwords. |
| `crypto_random` | MUST | N/A | The project does not generate cryptographic keys or nonces. |
| `delivery_mitm` | MUST | Met | Source, npm metadata, release assets, and service requests are delivered over HTTPS; release hashes are independently recomputed. |
| `delivery_unsigned` | MUST | Met | Checksums are retrieved over HTTPS, never over plain HTTP. The [v0.3.1 release assets](https://github.com/rare/slidesfly-integrations/releases/tag/v0.3.1) also include a Sigstore bundle produced and verified by the [attestation workflow](release-attestations.md). |
| `vulnerabilities_fixed_60_days` | MUST | Met | Authenticated checks on 2026-08-03 found no open Dependabot alert, repository security advisory, secret-scanning alert, or CodeQL product finding. The remaining Scorecard alerts are posture checks, not confirmed product vulnerabilities. |
| `vulnerabilities_critical_fixed` | SHOULD | Met | Authenticated checks on 2026-08-03 found no known open critical vulnerability. |
| `no_leaked_credentials` | MUST | Met | Secret scanning and push protection are enabled; the authenticated alert query returned no leaked credential alert on 2026-08-03. |

### Analysis

| Criterion | Level | Draft | Evidence or justification |
|---|---|---|---|
| `static_analysis` | MUST | Met | [CodeQL](../.github/workflows/codeql.yml) analyzes JavaScript/TypeScript on pull requests, `main`, and a schedule. |
| `static_analysis_common_vulnerabilities` | SUGGESTED | Met | CodeQL includes security queries for common JavaScript/TypeScript vulnerability classes. |
| `static_analysis_fixed` | MUST | Met | CodeQL alerts [7](https://github.com/rare/slidesfly-integrations/security/code-scanning/7) and [8](https://github.com/rare/slidesfly-integrations/security/code-scanning/8) found prototype-visible dynamic calls. [PR #31](https://github.com/rare/slidesfly-integrations/pull/31) replaced them with explicit allowlists and added unit/browser regressions; both alerts were marked fixed after the successful `main` CodeQL run on 2026-08-03. |
| `static_analysis_often` | SUGGESTED | Met | CodeQL runs on pull requests and every push to `main`, plus weekly. |
| `dynamic_analysis` | SUGGESTED | Unmet | The project does not claim fuzzing, a dynamic security scanner, or at least 80% branch coverage. |
| `dynamic_analysis_unsafe` | SUGGESTED | N/A | Project source is not written in a memory-unsafe language such as C or C++. |
| `dynamic_analysis_enable_assertions` | SUGGESTED | Met | Node test suites execute with `node:assert/strict` assertions enabled. |
| `dynamic_analysis_fixed` | MUST | N/A | No qualifying dynamic-analysis program is currently run, so it has produced no confirmed exploitable vulnerability. |

## Submission gates

1. Completed 2026-08-03: merged the CodeQL remediation and verified that alerts 7 and 8 are fixed
   after a successful `main` CodeQL run.
2. Completed 2026-08-03: recorded the owner confirmations for `know_secure_design`,
   `know_common_errors`, and no vulnerability reports in the previous six months.
3. Completed 2026-08-03 and repeat at submission: checked issues, advisories, Dependabot, secret
   scanning, private vulnerability reporting, rulesets, releases, attestations, and CodeQL.
4. With explicit approval, sign in to `bestpractices.dev`, create the project for the public
   repository, review imported metadata, and submit the 67 answers.
5. Add an OpenSSF badge to the repository or Slidesfly website only after the official project page
   reports that the passing level is earned.

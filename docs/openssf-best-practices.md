# OpenSSF Best Practices passing status

This page records the OpenSSF Best Practices passing-level self-assessment for this public
repository. The [official project page](https://www.bestpractices.dev/projects/13940) reports the
passing level at 100%, first achieved on 2026-08-03 at 03:19:56 UTC. The official application
remains the source of truth for every criterion and for the current badge status.

## Scope

The assessment scope is `rare/slidesfly-integrations`: the public GitHub Action, Agent Skill,
marketplace packages, release-verification metadata, validation scripts, and reproducible framework
fixtures in this repository.

It does not cover or certify the private Slidesfly SaaS application, production infrastructure,
customer data, billing implementation, or operational controls. The separate OpenSSF Scorecard is
an automated repository signal, not a certification or endorsement.

## Passing-level evidence

| Criteria area | Current public evidence | Verification boundary |
|---|---|---|
| Project description and use | [`README.md`](../README.md) explains the problem, scope, install paths, examples, and current limitations. | The official project page is authoritative for the accepted answer. |
| Feedback and contribution | GitHub Issues, [`CONTRIBUTING.md`](../CONTRIBUTING.md), issue templates, and [`SECURITY.md`](../SECURITY.md). | Security reports must use private vulnerability reporting. |
| FLOSS license | The repository is public under the OSI-recognized [MIT license](../LICENSE). | Applies only to this public repository. |
| Basic and interface documentation | The README, package READMEs, examples, manifests, and the linked Slidesfly CLI/MCP documentation describe inputs and outputs. | Hosted service behavior is outside this repository's FLOSS scope. |
| Version control and reviewable history | Public Git history, branches, pull requests, required CI, and linear main history. | A solo maintainer cannot honestly claim independent review of every changeset. |
| Automated tests and CI | [Validation CI](../.github/workflows/validate.yml) runs action tests, package validators, release verification, npm audits, framework builds, and reader-bridge tests on pull requests and main. | Coverage is heterogeneous; no repository-wide percentage is claimed. |
| New-functionality test policy | [`CONTRIBUTING.md`](../CONTRIBUTING.md) requires major functionality to add or update automated tests, or document why that is impractical with explicit maintainer approval. | Each application answer still needs recent-change evidence. |
| Warning and static analysis | [CodeQL](../.github/workflows/codeql.yml), Node validation scripts, workflow pin validation, build failures, and npm audit checks run publicly. | Tool applicability and N/A answers are justified criterion by criterion in the official form. |
| Secure delivery | GitHub and npm use HTTPS; releases publish SHA-256/SHA-512 checksum files, the verifier recomputes registry artifact hashes, and the manual [release-attestation workflow](release-attestations.md) publishes a Sigstore-signed in-toto release attestation after strict asset verification. | The v0.3.1 release contains a verifiable Sigstore bundle. This does not claim SLSA build provenance for npm packages built elsewhere. |
| Vulnerability handling | [`SECURITY.md`](../SECURITY.md) defines private reporting, supported surfaces, and credential rules; the Scorecard currently reports no known unfixed vulnerabilities. | Response-time and remediation answers must match actual operating practice. |
| Credential protection | Contribution rules prohibit credentials; validators reject credential-shaped content; workflows use least-privilege tokens and pinned actions. | Automated checks reduce risk but do not prove that leaks are impossible. |
| Cryptography | The integrations use provider HTTPS and cryptographic hashes; they do not implement password storage or custom cryptographic protocols. | N/A selections require criterion-specific justification rather than a blanket claim. |

## Official status and maintenance

The criterion-by-criterion submitted answers and evidence are maintained in the
[passing assessment](openssf-passing-assessment.md).

1. Project `13940` was created from the public GitHub repository with owner approval.
2. All 67 passing-level criteria have submitted answers and criterion-specific evidence or a
   truthful justification.
3. The official project page reported 100% and awarded the passing badge on 2026-08-03.
4. Maintainers must update the official assessment if repository practices or evidence change.
5. The badge must link to the official project page so consumers can verify current status.

The criteria and badge status are maintained by the
[OpenSSF Best Practices program](https://www.bestpractices.dev/en/criteria/0).

# Maintenance status

- Status: experimental and actively maintained
- Owner: [@rare](https://github.com/rare)
- Runtime baseline: Node.js 22
- Review cadence: dependency and compatibility review at least quarterly, plus security-driven
  updates when required

## Compatibility evidence

Each framework directory records the version and validation method used for its fixture. A
successful build is not automatically labeled as a live Slidesfly reader test.

### Known validation warning

As of 2026-08-02, the latest `@marp-team/marp-cli@4.5.0` transitively installs the deprecated
`mathjax-full@3.2.2` package through `@marp-team/marp-core`. The fixture still builds and `npm audit`
reports no vulnerabilities. [@rare](https://github.com/rare) owns the follow-up through weekly
Dependabot updates and the quarterly compatibility review; this repository does not replace the
transitive package with an unverified fork.

## Release policy

- Patch releases: documentation, fixtures, and compatible action fixes
- Minor releases: new integrations or backwards-compatible inputs and outputs
- Major releases: breaking action contract or repository layout changes

Release notes must name the evidence run, known limitations, and any required migration.

When a release advertises public npm packages, `releases/npm-packages.json` must pin the exact
registry tarball, npm integrity value, SHA-1 shasum, SHA-256, and SHA-512. Run
`node scripts/verify-npm-release.mjs` against the live registry before creating the release, and
attach the verified tarballs plus `SHA256SUMS` and `SHA512SUMS` to the GitHub Release. A package
with only one published version must not claim that downgrade rollback was tested.

## Skill runner parity

`skills/slidesfly/scripts/slidesfly.mjs` and channel-specific copies are generated artifacts. Do
not hand-edit them. A release must record the source Slidesfly CLI version and verify the runner
SHA-256 against the corresponding canonical bundle before publishing or submitting a directory PR.

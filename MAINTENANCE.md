# Maintenance status

- Status: experimental and actively maintained
- Owner: [@rare](https://github.com/rare)
- Runtime baseline: Node.js 22
- Review cadence: dependency and compatibility review at least quarterly, plus security-driven
  updates when required

## Compatibility evidence

Each framework directory records the version and validation method used for its fixture. A
successful build is not automatically labeled as a live Slidesfly reader test.

## Release policy

- Patch releases: documentation, fixtures, and compatible action fixes
- Minor releases: new integrations or backwards-compatible inputs and outputs
- Major releases: breaking action contract or repository layout changes

Release notes must name the evidence run, known limitations, and any required migration.

# Contributing

Contributions should add reproducible utility for publishing existing HTML presentations.

## Development baseline

- Use Node.js 22.
- Work on a branch and submit changes through a pull request. The default branch requires the
  `validate` check, linear history, and resolved review conversations.
- Keep each pull request focused. Describe the user-visible change, verification performed, and any
  security or compatibility impact.
- Review dependency and workflow changes before merging. GitHub Actions must use a full commit SHA
  with the corresponding release tag recorded in a comment.

## Before opening a pull request

1. Keep credentials, generated build directories, and private deck content out of the repository.
2. Pin framework dependencies in examples.
3. Include the exact build command and expected artifact shape.
4. Distinguish build-verified, browser-verified, and live-reader evidence.
5. Run `actions/publish/test.sh` when changing the action.
6. Run the validation scripts affected by the change:
   - `node scripts/validate-claude-package.mjs`
   - `node scripts/validate-cursor-plugin.mjs`
   - `node scripts/validate-gemini-extension.mjs`
   - `node scripts/verify-npm-release.mjs`
   - `node scripts/validate-workflow-pins.mjs`
   - `node --test examples/inject-slidesfly-reader-bridge.test.mjs`
7. Run `npm ci && npm run build` in each changed framework example directory.
8. Treat new warnings as failures unless the pull request documents why they are safe and assigns a
   follow-up owner.

Pull requests are reviewed for correctness, credential handling, reproducibility, and whether the
evidence supports the claim being made. A passing automated check does not replace review of the
changed workflow permissions or downloaded artifacts.

Major new functionality must include or update automated tests. If a meaningful automated test is
not practical, the pull request must explain why, document the manual verification performed, and
receive explicit maintainer approval before merge.

Bug reports and compatibility requests should use the issue templates. Security reports must follow
[SECURITY.md](SECURITY.md).

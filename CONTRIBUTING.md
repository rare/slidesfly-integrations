# Contributing

Contributions should add reproducible utility for publishing existing HTML presentations.

## Before opening a pull request

1. Keep credentials, generated build directories, and private deck content out of the repository.
2. Pin framework dependencies in examples.
3. Include the exact build command and expected artifact shape.
4. Distinguish build-verified, browser-verified, and live-reader evidence.
5. Run the relevant fixture plus `actions/publish/test.sh` when changing the action.

Bug reports and compatibility requests should use the issue templates. Security reports must follow
[SECURITY.md](SECURITY.md).

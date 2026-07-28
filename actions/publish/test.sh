#!/usr/bin/env bash
set -euo pipefail

test_temp="$(mktemp -d "${TMPDIR:-/tmp}/slidesfly-action-test.XXXXXX")"
trap 'rm -rf "$test_temp"' EXIT

mock_cli="$test_temp/mock-cli.mjs"
mock_deck="$test_temp/deck.html"
github_output="$test_temp/github-output"
github_summary="$test_temp/github-summary"

printf '<!doctype html><title>Action fixture</title>\n' >"$mock_deck"
cat >"$mock_cli" <<'EOF'
#!/usr/bin/env node
if (process.argv.includes('--version')) {
  process.stdout.write('0.1.1\n');
  process.exit(0);
}
if (!process.argv.includes('publish')) process.exit(2);
process.stdout.write(
  JSON.stringify({
    ok: true,
    data: {
      deck_id: 'test-deck-id',
      url: 'https://slidesfly.xyz/d/test-deck-id',
      title: 'Action fixture',
    },
  }),
);
EOF

INPUT_FILE="$mock_deck" \
INPUT_API_KEY="sk_test_not_real" \
INPUT_TITLE="Action fixture" \
INPUT_DECK_ID="" \
INPUT_VISIBILITY="unlisted" \
SLIDESFLY_API_URL="https://slidesfly.example" \
SLIDESFLY_CLI_URL="file://$mock_cli" \
SLIDESFLY_CLI_VERSION="0.1.1" \
RUNNER_TEMP="$test_temp" \
GITHUB_OUTPUT="$github_output" \
GITHUB_STEP_SUMMARY="$github_summary" \
"$(dirname "$0")/publish.sh"

grep -q '^url=https://slidesfly.xyz/d/test-deck-id$' "$github_output"
grep -q '^deck-id=test-deck-id$' "$github_output"
grep -q 'Reader:.*test-deck-id' "$github_summary"

echo 'slidesfly-publish action fixture passed'

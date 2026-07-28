#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${INPUT_API_KEY:-}" ]]; then
  echo "::error::The api-key input is required."
  exit 1
fi

if [[ -z "${INPUT_FILE:-}" || ! -f "$INPUT_FILE" ]]; then
  echo "::error::Deck file not found: ${INPUT_FILE:-<empty>}"
  exit 1
fi

node_major="$(node -p 'process.versions.node.split(".")[0]')"
if (( node_major < 22 )); then
  echo "::error::Slidesfly CLI requires Node.js 22 or newer."
  exit 1
fi

action_temp="$(mktemp -d "${RUNNER_TEMP:-/tmp}/slidesfly-action.XXXXXX")"
trap 'rm -rf "$action_temp"' EXIT

cli_file="$action_temp/cli.mjs"
curl --fail --silent --show-error --location "$SLIDESFLY_CLI_URL" --output "$cli_file"
chmod +x "$cli_file"

actual_cli_version="$(node "$cli_file" --version)"
if [[ "$actual_cli_version" != "$SLIDESFLY_CLI_VERSION" ]]; then
  echo "::error::Expected Slidesfly CLI $SLIDESFLY_CLI_VERSION, received $actual_cli_version."
  exit 1
fi

export SLIDESFLY_CONFIG_PATH="$action_temp/config.json"
export SLIDESFLY_API_KEY="$INPUT_API_KEY"
node -e '
  const fs = require("node:fs");
  fs.writeFileSync(
    process.env.SLIDESFLY_CONFIG_PATH,
    `${JSON.stringify({ api_key: process.env.SLIDESFLY_API_KEY, anon_decks: [] })}\n`,
    { mode: 0o600 },
  );
'
unset SLIDESFLY_API_KEY

publish_args=(node "$cli_file" publish "$INPUT_FILE" --json)
if [[ -n "${INPUT_TITLE:-}" ]]; then
  publish_args+=(--title "$INPUT_TITLE")
fi
if [[ -n "${INPUT_DECK_ID:-}" ]]; then
  publish_args+=(--id "$INPUT_DECK_ID")
else
  publish_args+=(--visibility "$INPUT_VISIBILITY")
fi

result="$("${publish_args[@]}")"
export SLIDESFLY_ACTION_RESULT="$result"

url="$(node -e '
  const result = JSON.parse(process.env.SLIDESFLY_ACTION_RESULT);
  if (!result.ok || typeof result.data?.url !== "string") process.exit(1);
  process.stdout.write(result.data.url);
')"
deck_id="$(node -e '
  const result = JSON.parse(process.env.SLIDESFLY_ACTION_RESULT);
  if (!result.ok || typeof result.data?.deck_id !== "string") process.exit(1);
  process.stdout.write(result.data.deck_id);
')"

{
  printf 'url=%s\n' "$url"
  printf 'deck-id=%s\n' "$deck_id"
  printf 'result=%s\n' "$result"
} >>"$GITHUB_OUTPUT"

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    printf '### Slidesfly publish\n\n'
    printf -- '- Reader: [%s](%s)\n' "$url" "$url"
    printf -- '- Deck ID: `%s`\n' "$deck_id"
  } >>"$GITHUB_STEP_SUMMARY"
fi

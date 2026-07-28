# Security policy

## Reporting an issue

Do not open a public issue for a suspected vulnerability or include credentials, unpublished deck
content, claim tokens, API keys, or personal data in an issue.

Use GitHub's private vulnerability reporting for this repository. For product abuse involving a
published deck, use the report control on the Slidesfly reader. For product-security architecture
and current runtime boundaries, see <https://slidesfly.com/security>.

## Supported surface

Security fixes are applied to the latest tagged integration release and the default branch. Example
fixtures demonstrate packaging workflows; they are not a promise that every third-party plugin or
custom script is safe inside the Slidesfly reader sandbox.

## Credential rules

- Store `SLIDESFLY_API_KEY` in GitHub Actions secrets.
- Never pass claim tokens or API keys through issue text, logs, workflow outputs, or deck content.
- Pin third-party actions and review dependency updates before merging them.

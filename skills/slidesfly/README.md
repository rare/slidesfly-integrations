# Slidesfly Agent Skill

This directory is the public, versioned, self-contained source for the official Slidesfly Skill.

- `SKILL.md` defines the workflow and safety contract.
- `scripts/slidesfly.mjs` is the complete, dependency-free CLI runner generated from the same
  source as the official PATH CLI.

Install it with:

```bash
npx skills add rare/slidesfly-integrations --skill slidesfly
```

The hosted copy at <https://slidesfly.com/SKILL.md> remains the canonical markdown endpoint for
`slidesfly install`; this public directory is the canonical reusable integration package. The
runner is not a second client implementation: release automation requires it to match the
Slidesfly CLI bundle byte-for-byte. Both repositories must be reviewed together before a release.

# Release attestations

Slidesfly integration releases can publish a Sigstore-signed in-toto release attestation for the
mirrored npm tarballs. The attestation binds the exact filenames and SHA-256 digests in
`SHA256SUMS` to the GitHub release identified by `releases/npm-packages.json`.

This is a distribution-integrity statement. It proves that the named GitHub release assets match
the repository's reviewed release manifest and that the attestation was signed by the repository's
GitHub Actions identity. It is not a claim that this repository built the canonical npm packages,
and it is not SLSA build provenance for those packages.

## Publishing

The `Attest release assets` workflow is manual and only runs from `main`. Before signing, it:

1. verifies the canonical npm tarballs against the registry integrity values and recorded hashes;
2. downloads the existing GitHub release tarballs and checksum files;
3. rejects missing, extra, malformed, or mismatched checksum entries and altered tarballs;
4. creates and locally verifies a Sigstore bundle using the in-toto release predicate; and
5. uploads a uniquely named `*.sigstore.json` asset without overwriting an existing signature.

Running the workflow creates a public attestation and modifies the named GitHub release. Review the
manifest and release first, then explicitly dispatch it from the `main` branch.

## Verification

Download a release tarball and its `*.sigstore.json` bundle, then run:

```bash
gh attestation verify slidesfly-cli-0.1.3.tgz \
  --repo rare/slidesfly-integrations \
  --bundle slidesfly-integrations-v0.3.1.sigstore.json \
  --predicate-type https://in-toto.io/attestation/release/v0.2 \
  --signer-workflow rare/slidesfly-integrations/.github/workflows/attest-release.yml \
  --source-ref refs/heads/main
```

Repeat the command for each tarball you consume. The checksum files remain useful for ordinary hash
verification, while the attestation adds a verifiable signer identity and transparency-log record.

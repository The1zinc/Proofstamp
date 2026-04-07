## ProofStamp

ProofStamp is a lightweight document attestation app built on Arc testnet.
It computes a file's SHA-256 hash locally in the browser and records that
hash onchain so a user can later verify that the same document existed at a
specific point in time.

## What It Solves

Teams often need a tamper-evident proof that a document existed before a
payment, approval, or audit step. ProofStamp gives them a simple way to create
that record without uploading the underlying file.

Practical use cases include:

- invoice and payout attachment proofs
- vendor agreement timestamping
- internal approval or audit evidence
- operational records that need a public verification path

## Why Arc

ProofStamp fits Arc well because the product benefits from:

- sub-second deterministic finality for fast confirmation
- USDC-native gas for predictable transaction costs
- standard EVM tooling for straightforward contract deployment
- explorer-backed verification for third-party review

## What Works Today

- local SHA-256 hashing in the browser
- wallet-based stamping on Arc testnet
- onchain verification against the deployed contract
- ArcScan transaction links after successful stamps
- Vercel-ready frontend with live contract configuration

## One-Paragraph Pitch

ProofStamp is a browser-based document attestation tool built on Arc testnet.
Users hash files locally, stamp the hash onchain, and later verify the same
document against the contract without exposing the file contents. The product
is useful for invoice records, approvals, and audit trails where teams need a
simple public proof of existence backed by Arc finality and predictable
stablecoin-based gas.

## Suggested Arc House Post

Built on Arc: ProofStamp is a simple document attestation app for teams that
need a public proof that a file existed before an approval, payout, or audit
step. Files are hashed locally in the browser, only the SHA-256 hash is stored
onchain, and verification happens against the deployed Arc contract. The repo,
live demo, and contract link are ready for review.

## Assets To Share

- live demo URL
- GitHub repository
- ArcScan contract link
- one successful transaction link
- short screen recording of stamp plus verify

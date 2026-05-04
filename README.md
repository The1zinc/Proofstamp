# ProofStamp - Blockchain Document Verification

Timestamped document verification built for **Arc Testnet**.

![ProofStamp](https://img.shields.io/badge/Built_on-Arc_Network-6366f1) ![Arc Testnet](https://img.shields.io/badge/Network-Arc_Testnet-14b8a6) ![Vercel](https://img.shields.io/badge/Deploy_on-Vercel-000)

## What It Does

- **Stamp**: Drop any file -> SHA-256 hash computed locally -> hash stamped on-chain with timestamp
- **Verify**: Drop the same file -> hash recomputed -> checked against blockchain
- **Privacy**: Your file never leaves your device - only the hash goes on-chain

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS 4 |
| Wallet | RainbowKit 2, wagmi 2, viem |
| Smart Contract (Arc) | Solidity ^0.8.24 |
| Hosting | Vercel Free Tier |
| Database | None - blockchain is the database |

## Quick Start

1. Copy `.env.example` to `.env.local`
2. Fill in your WalletConnect/Reown project ID
3. Add your Arc deployment address after deploying `ProofStamp.sol`
4. For the safest no-install deployment path, follow `REMIX_VERCEL_DEPLOY.md`

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Environment Variables

```bash
NEXT_PUBLIC_WALLETCONNECT_ID=your_reown_project_id
NEXT_PUBLIC_PROOF_STAMP_ADDRESS=0xYOUR_DEPLOYED_ARC_CONTRACT
```

Create your project ID at [dashboard.reown.com](https://dashboard.reown.com/).

## Deploy Smart Contract to Arc Testnet

### Prerequisites
1. Install [Foundry](https://book.getfoundry.sh/getting-started/installation)
2. Get test USDC from [Circle Faucet](https://faucet.circle.com/) (select Arc Testnet)

### Contract Source

The Arc contract source lives at `contracts/arc/ProofStamp.sol`.

Deploy it with a small Foundry project or with Remix connected to Arc Testnet.
After deployment, copy the contract address into `NEXT_PUBLIC_PROOF_STAMP_ADDRESS` in `.env.local`.

### Update Frontend
Restart the Next.js app after updating `.env.local` so the new Arc contract address is picked up.


## Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and connect to Vercel dashboard
```

## Project Structure

```
proofstamp/
|-- contracts/
|   \-- arc/
|       \-- ProofStamp.sol          # Solidity contract for Arc
|-- src/
|   |-- app/
|   |   |-- globals.css             # Dark theme + animations
|   |   |-- layout.tsx              # Root layout with providers
|   |   |-- page.tsx                # Home (Stamp) page
|   |   \-- verify/
|   |       \-- page.tsx            # Verify page
|   |-- components/
|   |   |-- Providers.tsx           # Web3 providers wrapper
|   |   |-- Header.tsx              # Navigation + wallet
|   |   |-- StampSection.tsx        # File drop + stamp UI
|   |   |-- VerifySection.tsx       # File drop + verify UI
|   |   |-- Features.tsx            # Feature cards
|   |   |-- HowItWorks.tsx          # Steps section
|   |   \-- Footer.tsx              # Links + resources
|   |-- config/
|   |   |-- wagmi.ts                # Chain + wallet config
|   |   \-- contracts.ts            # ABI + address
|   \-- lib/
|       \-- utils.ts                # SHA-256 hashing + formatters
\-- package.json
```

## Arc Network Details

| Config | Value |
|--------|-------|
| Network | Arc Testnet |
| RPC URL | `https://rpc.testnet.arc.network` |
| Chain ID | `5042002` |
| Gas Token | USDC |
| Explorer | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Faucet | [faucet.circle.com](https://faucet.circle.com/) |


## License

MIT

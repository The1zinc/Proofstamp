# ProofStamp Remix + Vercel Deployment

This is the lowest-risk path for launching the Arc demo without installing Foundry or the Vercel CLI locally.

## What you need

- A separate browser profile for this project
- A burner wallet created inside that profile
- Arc Testnet added to the wallet
- Test USDC from Circle Faucet
- A free Reown project ID
- A GitHub repository for this folder

## 1. Prepare the wallet safely

1. Create a fresh browser profile just for this project.
2. Install your wallet extension only in that profile.
3. Create a brand new burner wallet.
4. Do not import your main seed phrase or main wallet.

## 2. Add Arc Testnet

Use these official Arc Testnet values:

```text
Network name: Arc Testnet
RPC URL: https://rpc.testnet.arc.network
Chain ID: 5042002
Currency symbol: USDC
Explorer URL: https://testnet.arcscan.app
```

## 3. Get test USDC

1. Open https://faucet.circle.com
2. Select `Arc Testnet`
3. Paste the burner wallet address
4. Request test USDC

## 4. Deploy the Arc contract with Remix

1. Open https://remix.ethereum.org
2. Upload `contracts/arc/ProofStamp.sol`
3. Open the `Solidity Compiler` tab
4. Compile with Solidity `0.8.24`
5. Open `Deploy & Run Transactions`
6. Set `Environment` to `Injected Provider`
7. Approve the wallet connection
8. Confirm the wallet is on `Arc Testnet`
9. Select contract `ProofStamp`
10. Click `Deploy`
11. Approve the transaction in the wallet
12. Copy the deployed contract address

## 5. Update local environment

Open `.env.local` and replace:

```env
NEXT_PUBLIC_WALLETCONNECT_ID=replace_with_reown_project_id
NEXT_PUBLIC_PROOF_STAMP_ADDRESS=0x0000000000000000000000000000000000000000
```

with:

```env
NEXT_PUBLIC_WALLETCONNECT_ID=your_real_reown_project_id
NEXT_PUBLIC_PROOF_STAMP_ADDRESS=0xYourArcContractAddress
```

Then restart the Next.js dev server.

## 6. Create a Reown project ID

1. Open https://dashboard.reown.com/
2. Create a free project
3. Copy the project ID
4. Paste it into `.env.local`

## 7. Test locally

1. Run `npm run dev`
2. Open the local app
3. Confirm the header no longer shows `Set wallet env`
4. Connect the burner wallet
5. Stamp a small file
6. Open the ArcScan transaction link
7. Verify the same file on `/verify`

## 8. Deploy with Vercel Free

1. Push this folder to GitHub
2. Open https://vercel.com/new
3. Import the GitHub repository
4. Before deploying, add these Environment Variables in Vercel:

```env
NEXT_PUBLIC_WALLETCONNECT_ID=your_real_reown_project_id
NEXT_PUBLIC_PROOF_STAMP_ADDRESS=0xYourArcContractAddress
```

5. Deploy

## 9. Test the live site

1. Open the Vercel URL
2. Connect the burner wallet
3. Stamp a file
4. Open the ArcScan transaction
5. Verify the same file

## Safety notes

- Never paste a private key into this project
- Never paste a seed phrase into GitHub, Vercel, or `.env.local`
- Only the two `NEXT_PUBLIC_*` values belong in Vercel for this app
- Keep using the burner wallet for testnet work only

# ProofStamp Codex Handoff

Use this exact workflow on another PC. The project is already prepared through the GitHub stage. The next goal is to run it locally again and deploy it to Vercel with no unnecessary changes.

## Mission

1. Get the `proofstamp` app running locally from GitHub.
2. Verify the app builds and the wallet UI loads.
3. Deploy the app to Vercel Free.
4. Do not redesign, refactor, or redeploy the smart contract unless the user explicitly asks.

## Important constraints

1. Do not change product scope. This app is Arc-first.
2. Do not reintroduce GenLayer claims in the frontend.
3. Do not commit `.env.local`.
4. Do not ask for or use private keys.
5. Do not redeploy the Arc contract unless the user explicitly says the existing contract address should be replaced.
6. If required public env values are missing, stop and ask the user for them.

## Required public environment variables

The app needs exactly these two values:

```env
NEXT_PUBLIC_WALLETCONNECT_ID=<reown_project_id>
NEXT_PUBLIC_PROOF_STAMP_ADDRESS=<deployed_arc_contract_address>
```

These are public-facing values, not secrets.

## Files that matter

Main app folder structure:

- `src/`
- `contracts/arc/ProofStamp.sol`
- `package.json`
- `package-lock.json`
- `.env.example`
- `README.md`
- `REMIX_VERCEL_DEPLOY.md`

Key runtime files:

- `src/config/wagmi.ts`
- `src/config/contracts.ts`
- `src/components/StampSection.tsx`
- `src/components/VerifySection.tsx`

## Exact steps for the other Codex agent

### 1. Get the code

If the repo is already present locally, use it. Otherwise clone from GitHub.

PowerShell:

```powershell
git clone <github_repo_url>
cd <repo_folder>
```

### 2. Check the project root

Confirm the folder contains:

- `package.json`
- `src/`
- `contracts/`
- `.env.example`

### 3. Create `.env.local`

If `.env.local` does not exist, create it from `.env.example`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then fill in the two required public values.

If the user transferred a local folder instead of GitHub-only, the values may already exist in `.env.local`.

If either value is missing, stop and ask the user for:

1. `NEXT_PUBLIC_WALLETCONNECT_ID`
2. `NEXT_PUBLIC_PROOF_STAMP_ADDRESS`

Do not invent placeholders and call the app ready.

### 4. Install dependencies

PowerShell:

```powershell
npm install
```

### 5. Validate the code before running

PowerShell:

```powershell
npm run lint
npm run build
```

Both must pass before deployment.

### 6. Run locally

PowerShell:

```powershell
npm run dev
```

Open `http://localhost:3000`.

### 7. Verify expected local behavior

Check these exact points:

1. Header shows the app correctly.
2. Mobile nav has both `Stamp` and `Verify`.
3. Wallet button appears.
4. Wallet modal opens.
5. The app does not claim live GenLayer support.
6. Stamp page does not show `Arc contract not configured` if env is correct.
7. Verify page does not show contract-config error if env is correct.

### 8. Wallet troubleshooting rules

If `Connect Wallet` hangs on `Opening MetaMask...`:

1. Make sure MetaMask is installed in the same browser profile.
2. Unlock MetaMask manually.
3. Open the extension manually and look for a pending connection request.
4. Disconnect `localhost:3000` from MetaMask connected sites and try again.
5. If multiple wallet extensions are installed, temporarily disable the others.
6. Restart the dev server after any config changes.

### 9. Live app sanity check

If the user has the Arc testnet wallet ready, test the happy path:

1. Connect wallet
2. Switch to Arc Testnet
3. Stamp a small file
4. Open the ArcScan transaction link
5. Go to `/verify`
6. Upload the same file
7. Confirm the app shows verified hash proof on Arc

If the user cannot perform wallet testing on that machine, still proceed to deployment if build and config are correct.

### 10. Prepare for Vercel deployment

If the repo is not yet on GitHub from that machine, stop and ask the user whether to push. Do not create a commit unless asked.

If the repo is already on GitHub, proceed with Vercel.

### 11. Deploy to Vercel Free

Use one of these two paths:

1. If `vercel` CLI is already installed and authenticated on that PC, the agent may use CLI.
2. Otherwise, the agent must stop short of browser-only actions and give the user the exact dashboard steps below.

Dashboard steps for the user:

1. Open `https://vercel.com/new`
2. Import the GitHub repository
3. Let Vercel detect `Next.js`
4. Add these environment variables in Vercel before deploy:

```env
NEXT_PUBLIC_WALLETCONNECT_ID=<reown_project_id>
NEXT_PUBLIC_PROOF_STAMP_ADDRESS=<deployed_arc_contract_address>
```

5. Deploy

Optional CLI path only if already available and authenticated:

```powershell
vercel
```

If CLI is used, ensure the same two environment variables are configured in the Vercel project before the production deployment is considered complete.

### 12. Test the Vercel deployment

After deploy, open the production URL and verify:

1. Page loads
2. Wallet modal opens
3. Header and mobile nav render correctly
4. Stamp and Verify routes load
5. No obvious runtime error appears in the UI

If wallet connection works on the deployed site, do a full stamp/verify test again.

### 13. If Reown blocks the deployed domain

If wallet connect works locally but not on Vercel:

1. Open `https://dashboard.reown.com/`
2. Open the project used by `NEXT_PUBLIC_WALLETCONNECT_ID`
3. Add the Vercel domain if domain allowlisting is enabled
4. Redeploy or refresh

## What not to change

Do not change these unless there is a concrete bug:

- `src/config/contracts.ts`
- `src/config/wagmi.ts`
- Arc-first product copy
- Chunked hashing logic
- Existing contract address

## Done definition

The task is complete only when all of these are true:

1. Dependencies are installed.
2. `.env.local` has valid public values.
3. `npm run lint` passes.
4. `npm run build` passes.
5. Local app runs.
6. Vercel project is created.
7. Vercel env vars are set.
8. Production deployment succeeds.
9. Production URL is returned to the user.

## Exact prompt to paste into the other Codex agent

```text
Work only in the ProofStamp project and do not redesign it. This app is Arc-first and should stay Arc-first.

Your job:
1. Clone or open the GitHub repo for ProofStamp.
2. Create .env.local from .env.example if needed.
3. Ensure these public env vars are present: NEXT_PUBLIC_WALLETCONNECT_ID and NEXT_PUBLIC_PROOF_STAMP_ADDRESS.
4. Run npm install, npm run lint, npm run build, and npm run dev.
5. Verify the app loads locally and the wallet modal opens.
6. If Connect Wallet hangs, troubleshoot MetaMask pending-request/profile issues before changing code.
7. If Vercel CLI is already installed and authenticated, you may deploy with it. Otherwise prepare everything and then give me the exact Vercel dashboard steps to complete manually.
8. Verify the production URL loads and report that URL back.

Rules:
- Do not commit .env.local
- Do not ask for or use any private key
- Do not redeploy the Arc contract unless I explicitly ask
- Do not reintroduce GenLayer claims
- Only change code if you find a concrete bug blocking local run or deployment
```

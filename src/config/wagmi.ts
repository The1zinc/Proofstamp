import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { defineChain } from "viem";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";

const configuredWalletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_ID?.trim();

export const IS_WALLETCONNECT_CONFIGURED = Boolean(
  configuredWalletConnectProjectId &&
    configuredWalletConnectProjectId !== "your_reown_project_id" &&
    configuredWalletConnectProjectId !== "replace_with_reown_project_id"
);

const walletConnectProjectId: string = IS_WALLETCONNECT_CONFIGURED
  ? configuredWalletConnectProjectId!
  : "missing-project-id";

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.arc.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://testnet.arcscan.app",
    },
  },
  testnet: true,
});

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, walletConnectWallet],
    },
    {
      groupName: "Advanced",
      wallets: [safeWallet],
    },
  ],
  {
    appName: "ProofStamp",
    appDescription: "Hash and stamp documents on Arc Testnet.",
    projectId: walletConnectProjectId,
  }
);

export function getConfig() {
  return createConfig({
    chains: [arcTestnet],
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
    },
    ssr: true,
  });
}

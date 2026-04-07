"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { getConfig } from "@/config/wagmi";
import { useMounted } from "@/hooks/useMounted";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const mounted = useMounted();

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {mounted ? (
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#6366f1",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            {children}
          </RainbowKitProvider>
        ) : (
          children
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

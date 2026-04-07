"use client";

import { useState, useCallback } from "react";
import {
  useAccount,
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { hashFile, formatFileSize } from "@/lib/utils";
import {
  IS_PROOF_STAMP_CONFIGURED,
  PROOF_STAMP_ABI,
  PROOF_STAMP_ADDRESS,
} from "@/config/contracts";
import { arcTestnet, IS_WALLETCONNECT_CONFIGURED } from "@/config/wagmi";
import { useMounted } from "@/hooks/useMounted";

type StampState = "idle" | "hashing" | "hashed" | "stamping" | "stamped" | "error";

interface FileInfo {
  name: string;
  size: number;
  hash: string;
}

export default function StampSection() {
  const [state, setState] = useState<StampState>("idle");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const mounted = useMounted();

  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { data: txHash, writeContract, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  const isWrongNetwork = isConnected && chainId !== arcTestnet.id;

  const processFile = useCallback(async (file: File) => {
    setState("hashing");
    setError("");
    try {
      const hash = await hashFile(file);
      setFileInfo({ name: file.name, size: file.size, hash });
      setState("hashed");
    } catch {
      setError("Failed to compute file hash");
      setState("error");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleStamp = () => {
    if (!fileInfo) return;

    if (!IS_PROOF_STAMP_CONFIGURED) {
      setError(
        "Arc contract address is not configured yet. Add NEXT_PUBLIC_PROOF_STAMP_ADDRESS to .env.local first."
      );
      setState("error");
      return;
    }

    if (isWrongNetwork) {
      setError("Switch your wallet to Arc Testnet before stamping.");
      setState("error");
      return;
    }

    setState("stamping");
    writeContract({
      address: PROOF_STAMP_ADDRESS,
      abi: PROOF_STAMP_ABI,
      functionName: "stamp",
      args: [fileInfo.hash as `0x${string}`, fileInfo.name, BigInt(fileInfo.size)],
    });
  };

  const handleReset = () => {
    setState("idle");
    setFileInfo(null);
    setError("");
  };

  // Derive the display state from hook results (avoids setState in effects)
  let displayState = state;
  let displayError = error;
  if (state === "stamping") {
    if (isConfirmed) {
      displayState = "stamped";
    } else if (writeError) {
      displayState = "error";
      displayError = writeError.message || "Transaction failed. Make sure your contract is deployed.";
    }
  }

  return (
    <section className="relative" id="stamp-section">
      {/* Section header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Stamp Document
        </div>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Create an Immutable{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Proof
          </span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto">
          Drop any file to compute its SHA-256 hash, then stamp it on the Arc
          blockchain with a permanent timestamp.
        </p>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 shadow-2xl shadow-indigo-500/5 backdrop-blur-sm">
          <div className="rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-8">
            {/* Drop Zone */}
            {displayState === "idle" && (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all ${
                  dragOver
                    ? "border-indigo-400 bg-indigo-500/10"
                    : "border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.02]"
                }`}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 transition-transform group-hover:scale-110">
                  <svg
                    className="h-8 w-8 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-300">
                  Drop a file here or{" "}
                  <span className="text-indigo-400">click to browse</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Any file type · Hashed locally in chunks · Never uploaded
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>
            )}

            {/* Hashing State */}
            {displayState === "hashing" && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-500" />
                  <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-cyan-500" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                </div>
                <p className="mt-4 text-sm text-slate-400 animate-pulse">
                  Computing SHA-256 hash...
                </p>
              </div>
            )}

            {/* Hashed — Ready to Stamp */}
            {(displayState === "hashed" || displayState === "stamping") && fileInfo && (
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-start gap-4 rounded-xl bg-white/[0.03] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {fileInfo.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(fileInfo.size)}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-slate-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Hash Display */}
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-indigo-400">
                    SHA-256 Hash
                  </p>
                  <p className="break-all font-mono text-sm text-slate-300">
                    {fileInfo.hash}
                  </p>
                </div>

                {/* Stamp Button */}
                {!IS_PROOF_STAMP_CONFIGURED ? (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left">
                    <p className="text-sm font-medium text-amber-300">
                      Arc contract not configured
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Deploy `contracts/arc/ProofStamp.sol`, then set
                      `NEXT_PUBLIC_PROOF_STAMP_ADDRESS` in `.env.local`.
                    </p>
                  </div>
                ) : !IS_WALLETCONNECT_CONFIGURED ? (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left">
                    <p className="text-sm font-medium text-amber-300">
                      Wallet connection not configured
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Set `NEXT_PUBLIC_WALLETCONNECT_ID` in `.env.local`, then
                      restart the app before connecting a wallet.
                    </p>
                  </div>
                ) : !isConnected ? (
                  <div className="flex flex-col items-center gap-3 rounded-xl bg-white/[0.02] p-6">
                    <p className="text-sm text-slate-400">
                      Connect your wallet to stamp on-chain
                    </p>
                    {mounted ? (
                      <ConnectButton />
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300">
                        Connect wallet
                      </div>
                    )}
                    <p className="max-w-sm text-center text-xs text-slate-500">
                      If your wallet does not open, click the extension icon in
                      your browser. A connection request may already be pending.
                    </p>
                  </div>
                ) : isWrongNetwork ? (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left">
                    <p className="text-sm font-medium text-amber-300">
                      Wrong network selected
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Switch your wallet to Arc Testnet from the wallet menu in
                      the header, then try again.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleStamp}
                    disabled={displayState === "stamping" || isConfirming}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative flex items-center justify-center gap-2">
                      {displayState === "stamping" || isConfirming ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {isConfirming ? "Confirming..." : "Stamping..."}
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Stamp on Arc Blockchain
                        </>
                      )}
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Success State */}
            {displayState === "stamped" && fileInfo && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-20 w-20 animate-bounce-in items-center justify-center rounded-full bg-emerald-500/10">
                  <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Document Stamped!
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Your document&apos;s hash has been permanently recorded on the
                  Arc blockchain.
                </p>
                <div className="mt-4 w-full rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-xs font-medium text-emerald-400">
                    Transaction Hash
                  </p>
                  <a
                    href={`https://testnet.arcscan.app/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all font-mono text-xs text-slate-300 underline decoration-slate-600 hover:decoration-slate-400 transition-colors"
                  >
                    {txHash}
                  </a>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.05]"
                >
                  Stamp Another Document
                </button>
              </div>
            )}

            {/* Error State */}
            {displayState === "error" && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm text-red-400">{displayError}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.05]"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security note */}
        <p className="mt-4 text-center text-xs text-slate-600">
          <svg className="mr-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your file never leaves your device. Only the hash is sent to the blockchain.
        </p>
      </div>
    </section>
  );
}

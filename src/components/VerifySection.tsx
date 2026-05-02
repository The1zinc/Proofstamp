"use client";

import { useState, useCallback, useMemo } from "react";
import { useReadContract } from "wagmi";
import { hashFile, formatHash, formatFileSize, formatAddress, formatTimestamp } from "@/lib/utils";
import {
  IS_PROOF_STAMP_CONFIGURED,
  PROOF_STAMP_ABI,
  PROOF_STAMP_ADDRESS,
} from "@/config/contracts";
import { arcTestnet } from "@/config/wagmi";

type VerifyState = "idle" | "hashing" | "checking" | "found" | "not-found" | "error";

interface FileInfo {
  name: string;
  size: number;
  hash: string;
}

interface StampData {
  stamper: string;
  timestamp: number;
  fileName: string;
  fileSize: number;
}

export default function VerifySection() {
  const [state, setState] = useState<VerifyState>("idle");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [hashToVerify, setHashToVerify] = useState<`0x${string}` | undefined>();

  const { data: verifyResult, error: verifyError } = useReadContract({
    address: PROOF_STAMP_ADDRESS,
    abi: PROOF_STAMP_ABI,
    chainId: arcTestnet.id,
    functionName: "verify",
    args: hashToVerify ? [hashToVerify] : undefined,
    query: { enabled: !!hashToVerify && IS_PROOF_STAMP_CONFIGURED },
  });

  const { displayState, derivedStampData, displayError } = useMemo(() => {
    if (state === "checking" && verifyError) {
      return {
        displayState: "error" as VerifyState,
        derivedStampData: null,
        displayError:
          verifyError instanceof Error
            ? verifyError.message
            : "Failed to read from the Arc contract.",
      };
    }

    if (state === "checking" && verifyResult && Array.isArray(verifyResult)) {
      const [exists, stamper, timestamp, fileName, fileSize] = verifyResult;
      if (exists) {
        return {
          displayState: "found" as VerifyState,
          derivedStampData: {
            stamper: stamper as string,
            timestamp: Number(timestamp),
            fileName: fileName as string,
            fileSize: Number(fileSize),
          } satisfies StampData,
          displayError: "",
        };
      } else {
        return {
          displayState: "not-found" as VerifyState,
          derivedStampData: null,
          displayError: "",
        };
      }
    }
    return { displayState: state, derivedStampData: null, displayError: error };
  }, [error, state, verifyError, verifyResult]);

  const processFile = useCallback(async (file: File) => {
    setError("");

    if (!IS_PROOF_STAMP_CONFIGURED) {
      setError(
        "Arc contract address is not configured yet. Add NEXT_PUBLIC_PROOF_STAMP_ADDRESS to .env.local first."
      );
      setState("error");
      return;
    }

    setState("hashing");
    try {
      const hash = await hashFile(file);
      setFileInfo({ name: file.name, size: file.size, hash });
      setHashToVerify(hash as `0x${string}`);
      setState("checking");
    } catch {
      setError("Failed to compute file hash.");
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

  const handleReset = () => {
    setState("idle");
    setFileInfo(null);
    setError("");
    setHashToVerify(undefined);
  };

  return (
    <section className="relative" id="verify-section">
      <div className="mx-auto max-w-2xl">
        {!IS_PROOF_STAMP_CONFIGURED && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div className="text-sm leading-relaxed text-amber-200">
              <p className="font-semibold text-amber-300">
                Action Required: Contract Not Configured
              </p>
              <p className="mt-1 opacity-80">
                Add `NEXT_PUBLIC_PROOF_STAMP_ADDRESS` to your `.env.local` to
                verify documents against the Arc Testnet contract.
              </p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 shadow-2xl shadow-cyan-500/5 backdrop-blur-sm">
          <div className="rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-8">
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
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.02]"
                }`}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 transition-transform group-hover:scale-110">
                  <svg
                    className="h-8 w-8 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-300">
                  Drop a file to{" "}
                  <span className="text-cyan-400">verify its stamp</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  File is hashed locally in chunks · Only the SHA-256 hash is
                  checked on Arc
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>
            )}

            {(displayState === "hashing" || displayState === "checking") && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-500" />
                  <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-emerald-500" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                </div>
                <p className="mt-4 text-sm text-slate-400 animate-pulse">
                  {displayState === "hashing"
                    ? "Computing SHA-256 hash..."
                    : "Checking blockchain..."}
                </p>
              </div>
            )}

            {displayState === "found" && fileInfo && derivedStampData && (
              <div className="space-y-5">
                <div className="flex flex-col items-center py-4">
                  <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/20">
                    <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-400">
                    Verified ✓
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    This uploaded file matches a stamped SHA-256 hash on Arc
                  </p>
                </div>

                <div className="space-y-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5">
                  <DetailRow label="Uploaded File" value={fileInfo.name} />
                  <DetailRow
                    label="Stamped File"
                    value={derivedStampData.fileName || "Unknown"}
                  />
                  <DetailRow label="Hash" value={formatHash(fileInfo.hash)} mono />
                  <DetailRow label="Stamped by" value={formatAddress(derivedStampData.stamper)} mono />
                  <DetailRow label="Timestamp" value={formatTimestamp(derivedStampData.timestamp)} />
                  <DetailRow label="Original Size" value={formatFileSize(derivedStampData.fileSize)} />
                </div>

                <button
                  onClick={handleReset}
                  className="w-full rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.05]"
                >
                  Verify Another Document
                </button>
              </div>
            )}

            {displayState === "not-found" && fileInfo && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 ring-4 ring-amber-500/20">
                  <svg className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-400">
                  Not Found
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  This document has not been stamped on the blockchain yet.
                </p>
                <div className="mt-4 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Computed Hash
                  </p>
                  <p className="mt-1 break-all font-mono text-xs text-slate-400">
                    {fileInfo.hash}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.05]"
                >
                  Try Another Document
                </button>
              </div>
            )}

            {displayState === "error" && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm text-red-400">
                  {displayError ||
                    "Failed to verify. Check your connection and try again."}
                </p>
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
      </div>
    </section>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span
        className={`truncate text-sm text-slate-300 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

import VerifySection from "@/components/VerifySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Document — ProofStamp",
  description:
    "Verify if a document has been previously stamped on the Arc blockchain. Drop any file to check its proof of existence.",
};

export default function VerifyPage() {
  return (
    <div className="px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-cyan-500/[0.05] to-transparent pointer-events-none" />

      <div className="relative">
        <div className="mb-16 text-center animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-slate-400 backdrop-blur-sm">
            <svg
              className="h-3.5 w-3.5 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Blockchain Verification
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Verify a{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Document
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-slate-400">
            Drop any file below to check if it has been previously stamped on
            the Arc blockchain. Instant, trustless verification.
          </p>
        </div>

        <div className="animate-fade-in-up delay-200">
          <VerifySection />
        </div>
      </div>
    </div>
  );
}

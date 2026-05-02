import StampSection from "@/components/StampSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden px-4 pt-20 text-center sm:px-6 sm:pt-28">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-indigo-500/[0.07] to-transparent" />

        <div className="relative">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-slate-400 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Arc Testnet workflow
          </div>

          <h1 className="animate-fade-in-up delay-100 mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Prove Any Document{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Exists
            </span>
          </h1>

          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Drop any file. We compute its cryptographic fingerprint and stamp it
            on Arc Testnet, creating an{" "}
            <span className="text-slate-300">immutable, timestamped proof</span>{" "}
            that the document existed at that moment.
          </p>

          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#stamp-section"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Stamp a Document
              </span>
            </a>
            <a
              href="/verify"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.04] hover:border-white/20"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Verify a Document
            </a>
          </div>

          <div className="animate-fade-in-up delay-400 mx-auto mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:grid sm:max-w-md sm:grid-cols-3 sm:gap-6">
            <Stat label="Privacy" value="100%" />
            <Stat label="Finality" value="<1s" />
            <Stat label="Gas Token" value="USDC" />
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6">
        <StampSection />
      </div>

      <div className="px-4 sm:px-6">
        <HowItWorks />
      </div>

      <div className="px-4 sm:px-6">
        <Features />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

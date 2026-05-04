export default function Features() {
  return (
    <section className="relative" id="features">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Why{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            ProofStamp
          </span>
          ?
        </h2>
        <p className="mt-3 text-slate-400">
          Blockchain-powered document verification, simplified.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          }
          title="100% Private"
          description="Your file never leaves your device. We only send the cryptographic hash to the blockchain."
          color="indigo"
        />
        <FeatureCard
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          }
          title="Immutable Proof"
          description="Once stamped on the Arc blockchain, your document's proof of existence can never be altered or deleted."
          color="cyan"
        />
        <FeatureCard
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          }
          title="Sub-Second Finality"
          description="Arc Network provides deterministic sub-second finality. Your stamp is confirmed almost instantly."
          color="emerald"
        />
        <FeatureCard
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          }
          title="Stablecoin Gas"
          description="Arc uses USDC as native gas - predictable costs in real dollars, no volatile token needed."
          color="violet"
        />
        <FeatureCard
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          }
          title="Wallet Attribution"
          description="Every proof records the wallet that stamped it, making ownership and audit trails easy to inspect on Arc."
          color="amber"
        />
        <FeatureCard
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          }
          title="Explorer Ready"
          description="Each successful stamp includes an ArcScan transaction link, so reviewers can verify your proof without trusting your app."
          color="rose"
        />
      </div>
    </section>
  );
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/10 hover:border-indigo-500/30",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/10 hover:border-cyan-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/10 hover:border-emerald-500/30",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/10 hover:border-violet-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/10 hover:border-amber-500/30",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/10 hover:border-rose-500/30",
  },
};

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const c = colorMap[color] || colorMap.indigo;
  return (
    <div
      className={`group rounded-2xl border ${c.border} bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]`}
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}
      >
        <svg
          className={`h-5 w-5 ${c.text}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {icon}
        </svg>
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}

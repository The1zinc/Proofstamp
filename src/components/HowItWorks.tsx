export default function HowItWorks() {
  return (
    <section className="relative" id="how-it-works">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          How It{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Works
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="relative flex flex-col gap-8 sm:gap-0">
          {/* Connector line */}
          <div className="absolute left-6 top-10 hidden h-[calc(100%-5rem)] w-px bg-gradient-to-b from-indigo-500/40 via-cyan-500/40 to-emerald-500/40 sm:block" />

          <Step
            number={1}
            title="Drop Your File"
            description="Drag and drop any file into ProofStamp. Your file is processed entirely in your browser — it never leaves your device."
            color="indigo"
          />
          <Step
            number={2}
            title="Hash is Computed"
            description="We compute a unique SHA-256 fingerprint of your file. Even a single byte change produces a completely different hash."
            color="cyan"
          />
          <Step
            number={3}
            title="Stamp On-Chain"
            description="The hash is permanently recorded on the Arc blockchain with a timestamp. This creates an immutable proof of existence."
            color="emerald"
          />
          <Step
            number={4}
            title="Verify Anytime"
            description="Anyone can drop the same file to check if it was stamped, when, and by whom. Instant, trustless verification."
            color="violet"
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
  color,
}: {
  number: number;
  title: string;
  description: string;
  color: string;
}) {
  const colorStyles: Record<string, string> = {
    indigo: "from-indigo-600 to-indigo-500 shadow-indigo-500/20",
    cyan: "from-cyan-600 to-cyan-500 shadow-cyan-500/20",
    emerald: "from-emerald-600 to-emerald-500 shadow-emerald-500/20",
    violet: "from-violet-600 to-violet-500 shadow-violet-500/20",
  };

  return (
    <div className="flex items-start gap-6 sm:gap-8">
      <div
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorStyles[color]} text-lg font-bold text-white shadow-lg`}
      >
        {number}
      </div>
      <div className="pb-8 sm:pb-12">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400 max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050510]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">
                Proof<span className="text-indigo-400">Stamp</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Timestamped document verification for Arc Testnet with local
              hashing, wallet-based stamping, and explorer-backed proof.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Built On
            </h4>
            <ul className="mt-3 space-y-2">
              <FooterLink
                href="https://arc.network"
                label="Arc Network"
                description="Circle's L1 blockchain"
              />
              <FooterLink
                href="https://docs.arc.network/arc/references/connect-to-arc"
                label="Connect to Arc"
                description="Wallet and RPC setup"
              />
              <FooterLink
                href="https://testnet.arcscan.app"
                label="Arc Testnet Explorer"
                description="View transactions"
              />
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Resources
            </h4>
            <ul className="mt-3 space-y-2">
              <FooterLink
                href="https://faucet.circle.com"
                label="Circle Faucet"
                description="Get test USDC"
              />
              <FooterLink
                href="https://docs.arc.network/arc/tutorials/deploy-on-arc"
                label="Deploy on Arc"
                description="Foundry deployment guide"
              />
              <FooterLink
                href="https://testnet.arcscan.app/gas-tracker"
                label="Arc Gas Tracker"
                description="Monitor testnet fees"
              />
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ProofStamp. Open source. No warranty.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Arc Testnet demo
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-200"
      >
        <svg
          className="h-3 w-3 text-slate-600 transition-colors group-hover:text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        <span>{label}</span>
        <span className="hidden text-xs text-slate-600 sm:inline">
          — {description}
        </span>
      </a>
    </li>
  );
}

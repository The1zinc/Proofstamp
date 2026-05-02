"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IS_WALLETCONNECT_CONFIGURED } from "@/config/wagmi";
import { useMounted } from "@/hooks/useMounted";

export default function Header() {
  const pathname = usePathname();
  const mounted = useMounted();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#050510]/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20 transition-shadow group-hover:shadow-indigo-500/40">
              <svg
                className="h-5 w-5 text-white"
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
            <span className="text-lg font-bold tracking-tight text-white">
              Proof<span className="text-indigo-400">Stamp</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink href="/" label="Stamp" active={pathname === "/"} />
            <NavLink
              href="/verify"
              label="Verify"
              active={pathname === "/verify"}
            />
          </nav>

          <div className="scale-90 origin-right pr-1 sm:pr-0">
            {!IS_WALLETCONNECT_CONFIGURED ? (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300">
                Set wallet env
              </div>
            ) : mounted ? (
              <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus="avatar"
              />
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">
                Connect wallet
              </div>
            )}
          </div>
        </div>

        <nav className="flex gap-2 pb-3 sm:hidden">
          <NavLink href="/" label="Stamp" active={pathname === "/"} compact />
          <NavLink
            href="/verify"
            label="Verify"
            active={pathname === "/verify"}
            compact
          />
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  compact = false,
}: {
  href: string;
  label: string;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-lg font-medium transition-all ${
        compact ? "flex-1 px-3 py-2 text-center text-sm" : "px-4 py-2 text-sm"
      } ${
        active
          ? "bg-white/[0.08] text-white"
          : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
      }`}
    >
      {label}
    </Link>
  );
}

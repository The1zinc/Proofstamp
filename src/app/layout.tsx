import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProofStamp — Blockchain Document Verification",
  description:
    "Stamp and verify documents on the Arc blockchain. Immutable, private, and instant proof of existence powered by SHA-256 hashing and on-chain timestamps.",
  keywords: [
    "document verification",
    "blockchain",
    "Arc Network",
    "Arc Testnet",
    "SHA-256",
    "proof of existence",
    "timestamping",
    "USDC",
  ],
  openGraph: {
    title: "ProofStamp — Blockchain Document Verification",
    description:
      "Immutable proof of existence for any document. Powered by Arc Network.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-[#050510] text-slate-200">
        <div className="bg-glow" />
        <div className="bg-grid" />

        <Providers>
          <Header />
          <main className="relative z-10 flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

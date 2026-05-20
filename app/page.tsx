import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-6 lg:px-12 h-16 flex items-center bg-card border-b border-border sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="relative h-8 w-8 overflow-hidden rounded-md shadow-sm border border-border">
            <Image src="/logo.png" alt="SHG Credit Logo" fill className="object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">SHG Credit Score</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="inline-flex items-center rounded border border-border bg-muted px-3 py-1 text-sm font-medium text-muted-foreground mb-6">
          Microfinance Credit Assessment Portal
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground max-w-4xl">
          Institutional Credit Scoring<br />for Self-Help Groups
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6 leading-relaxed">
          Standardized, transparent, and data-driven credit assessments to support financial inclusion and institutional lending across rural India.
        </p>

        {/* Two Portal Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 w-full max-w-2xl">
          {/* Bank Officer Portal */}
          <Link
            href="/login"
            className="group flex flex-col items-start gap-4 rounded-lg border-2 border-border bg-card p-6 text-left shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Bank Officer Portal</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage SHG credit assessments, upload documents, and approve loans.
              </p>
            </div>
            <span className="text-sm font-semibold text-primary">Officer Login →</span>
          </Link>

          {/* SHG Group Portal */}
          <Link
            href="/shg-login"
            className="group flex flex-col items-start gap-4 rounded-lg border-2 border-border bg-card p-6 text-left shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">SHG Group Portal</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Check your group's credit score and loan eligibility status using your SHG ID.
              </p>
            </div>
            <span className="text-sm font-semibold text-primary">Check Score →</span>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl w-full text-left border-t border-border pt-12">
          {[
            { icon: '🔒', title: 'Secure & Compliant', desc: 'Bank-grade security with full audit trail' },
            { icon: '⚡', title: 'AI-Powered', desc: 'Automated document extraction using DeepSeek V4' },
            { icon: '📊', title: 'Transparent Scoring', desc: 'Clear breakdown of every credit decision' },
          ].map((f) => (
            <div key={f.title}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-sm text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 lg:px-12 border-t border-border bg-card">
        <p className="text-sm text-muted-foreground font-medium">© 2026 SHG Credit Score Platform. All rights reserved.</p>
        <div className="sm:ml-auto flex gap-6">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Officer Login</Link>
          <Link href="/shg-login" className="text-sm font-medium text-muted-foreground hover:text-foreground">SHG Portal</Link>
        </div>
      </footer>
    </div>
  );
}

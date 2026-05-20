import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-6 lg:px-12 h-16 flex items-center bg-card border-b border-border sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">SHG Credit Score</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors" href="/register">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="inline-flex items-center rounded border border-border bg-muted px-3 py-1 text-sm font-medium text-muted-foreground mb-6">
          Microfinance Credit Assessment Portal
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground max-w-4xl">
          Institutional Credit Scoring for Self-Help Groups
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6 leading-relaxed">
          Standardized, transparent, and data-driven credit assessments to support financial inclusion and institutional lending.
        </p>
        <div className="mt-8 flex gap-4 flex-col sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Access Portal
          </Link>
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-md bg-card border border-border px-8 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View Documentation
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 lg:px-12 border-t border-border bg-card">
        <p className="text-sm text-muted-foreground font-medium">© 2026 SHG Credit Score Platform. All rights reserved.</p>
        <div className="sm:ml-auto flex gap-6">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Terms & Conditions</Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

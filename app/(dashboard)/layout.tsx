import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50/50">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border glass px-6 shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold transition-transform hover:scale-105">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-brand-500/40">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <span className="text-xl text-foreground font-bold tracking-tight">SHGCreditScore</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/dashboard/assessments/new"
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-brand-500/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
          >
            + New Assessment
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-white/50 backdrop-blur-xl md:block">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-brand-900 transition-all bg-brand-50 font-semibold shadow-sm border border-brand-100"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/assessments"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-slate-100/80"
            >
              Assessments
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-slate-100/80"
            >
              Analytics
            </Link>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-slate-50/30">
          {children}
        </main>
      </div>
    </div>
  );
}

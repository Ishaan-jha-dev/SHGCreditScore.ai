import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <span className="text-xl text-foreground font-bold tracking-tight">SHG Portal</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/dashboard/assessments/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            + New Assessment
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-card md:block">
          <nav className="grid gap-1 p-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-primary bg-primary/10 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/assessments"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              Assessments
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              Analytics
            </Link>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}

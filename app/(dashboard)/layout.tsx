'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { createClient } from '@/utils/supabase/client';
import { LayoutDashboard, FileText, BarChart2, LogOut, Plus, ShoppingCart, Landmark, Bot } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/assessments', label: 'Credit Scoring', icon: FileText, exact: false },
  { href: '/dashboard/ecommerce', label: 'E-Commerce', icon: ShoppingCart, exact: false, badge: 'NEW' },
  { href: '/dashboard/schemes', label: 'Govt Schemes', icon: Landmark, exact: false, badge: 'NEW' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2, exact: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="relative h-8 w-8 overflow-hidden rounded-md shadow-sm border border-border">
            <Image src="/logo.png" alt="SHG Credit Logo" fill className="object-cover" />
          </div>
          <div>
            <span className="text-lg text-foreground font-bold tracking-tight">SHGBazaar</span>
            <span className="text-xs text-muted-foreground block leading-none -mt-0.5">.ai</span>
          </div>
        </Link>

        {/* Module pills in header */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-md bg-muted">M1: Credit</span>
          <span className="text-xs font-medium text-primary px-2 py-1 rounded-md bg-primary/10">M2: E-Commerce</span>
          <span className="text-xs font-medium text-emerald-700 px-2 py-1 rounded-md bg-emerald-50">M3: Schemes</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/dashboard/assessments/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            New Assessment
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-56 border-r border-border bg-card md:flex flex-col justify-between">
          <nav className="grid gap-1 p-4 text-sm font-medium">
            {navItems.map(({ href, label, icon: Icon, exact, badge }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full leading-none">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* AI Advisor shortcut */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">AI Tools</p>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">AI Agents Active</span>
                </div>
                <p className="text-xs text-muted-foreground">DeepSeek V4 Pro powers all AI features</p>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

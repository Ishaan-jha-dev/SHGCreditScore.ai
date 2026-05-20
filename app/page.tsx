import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

const MODULES = [
  {
    id: 'M1',
    icon: '🏦',
    title: 'Credit Scoring',
    tagline: 'AI-powered loan eligibility',
    desc: 'Bank officers upload SHG documents. DeepSeek AI extracts data and generates a transparent 850-point credit score with loan recommendation.',
    color: 'border-blue-200 bg-blue-50/50',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'M2',
    icon: '🛒',
    title: 'E-Commerce Enablement',
    tagline: '₹5K → ₹50K/month income',
    desc: 'AI assistant guides SHGs step-by-step to list products on Amazon, Flipkart, Meesho & GeM Portal — in Hinglish, from document prep to first sale.',
    color: 'border-orange-200 bg-orange-50/50',
    tagColor: 'bg-orange-100 text-orange-700',
    badge: 'NEW',
  },
  {
    id: 'M3',
    icon: '🏛️',
    title: 'Govt Scheme Navigator',
    tagline: 'Unlock ₹12L+ in free grants',
    desc: 'AI scans 50+ central & state schemes (PMEGP, Mudra, GeM, SFURTI) and finds everything your SHG is eligible for — then pre-fills the application.',
    color: 'border-emerald-200 bg-emerald-50/50',
    tagColor: 'bg-emerald-100 text-emerald-700',
    badge: 'NEW',
  },
];

const IMPACT_STATS = [
  { value: '88L+', label: 'SHGs in India', sub: 'Total addressable market' },
  { value: '₹3.96Cr', label: 'Year 1 Revenue', sub: 'Projected multi-stream' },
  { value: '10x', label: 'Income Growth', sub: 'Village → National market' },
  { value: '50+', label: 'Govt Schemes', sub: 'Navigated by AI' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-6 lg:px-12 h-16 flex items-center bg-card border-b border-border sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="relative h-8 w-8 overflow-hidden rounded-md shadow-sm border border-border">
            <Image src="/logo.png" alt="SHG Credit Logo" fill className="object-cover" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-foreground">SHGBazaar</span>
            <span className="text-primary font-bold text-xl">.ai</span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <ThemeToggle />
          <Link href="/shg-login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            SHG Portal
          </Link>
          <Link href="/login" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Officer Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center p-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            🏆 Compassion-A-Thon 3.0 — IIMCIP Finalist
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground max-w-4xl leading-tight">
            From Village to Nation:<br />
            <span className="text-primary">Empowering 10 Crore</span><br />
            Women Entrepreneurs
          </h1>
          <p className="mx-auto max-w-[680px] text-muted-foreground md:text-xl mt-6 leading-relaxed">
            SHGBazaar.ai transforms Self-Help Groups from local vendors into national brands — with AI-powered credit scoring, e-commerce onboarding, and government scheme navigation.
          </p>

          {/* Two CTA portals */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 w-full max-w-xl">
            <Link href="/login"
              className="group flex flex-col items-start gap-3 rounded-lg border-2 border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">🏦</div>
              <div>
                <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">Bank Officer Portal</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Create assessments, manage SHGs, approve loans</p>
              </div>
              <span className="text-sm font-semibold text-primary">Enter Portal →</span>
            </Link>

            <Link href="/shg-login"
              className="group flex flex-col items-start gap-3 rounded-lg border-2 border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">👩‍🌾</div>
              <div>
                <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">SHG Group Portal</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Check your credit score and loan eligibility</p>
              </div>
              <span className="text-sm font-semibold text-primary">Check Score →</span>
            </Link>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="bg-card border-y border-border py-10 px-6">
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {IMPACT_STATS.map(s => (
              <div key={s.value}>
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="font-semibold text-foreground text-sm mt-1">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Three Modules */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">The Complete SHG Ecosystem</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Three integrated AI modules that take an SHG from credit access → national market → government grants</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {MODULES.map(m => (
                <div key={m.id} className={`rounded-xl border-2 p-6 ${m.color} relative`}>
                  {m.badge && (
                    <span className="absolute top-4 right-4 text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{m.badge}</span>
                  )}
                  <span className={`inline-block text-xs font-bold px-2 py-1 rounded-md mb-3 ${m.tagColor}`}>{m.id}</span>
                  <div className="text-3xl mb-3">{m.icon}</div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{m.title}</h3>
                  <p className="text-sm font-semibold text-primary mb-3">{m.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            {/* Income journey */}
            <div className="mt-12 rounded-xl border border-border bg-card p-8">
              <h3 className="font-bold text-center text-foreground mb-6">The SHG Income Journey</h3>
              <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                {[
                  { label: 'Village Sales', amount: '₹5,000', sub: 'Per month', color: 'bg-red-100 text-red-700 border-red-200' },
                  { label: '+ E-Commerce', amount: '₹50,000', sub: 'Per month', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                  { label: '+ Bank Loan', amount: '₹5 Lakh', sub: 'Working capital', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { label: '+ Govt Grants', amount: '₹12.5 Lakh', sub: 'Free benefits', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className={`rounded-lg border-2 p-4 text-center min-w-[120px] ${step.color}`}>
                      <p className="text-xl font-extrabold">{step.amount}</p>
                      <p className="text-xs font-semibold">{step.label}</p>
                      <p className="text-xs opacity-70">{step.sub}</p>
                    </div>
                    {i < 3 && <span className="text-xl text-muted-foreground hidden md:block">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="bg-muted/30 border-t border-border py-10 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Powered By</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground">
              {['DeepSeek V4 Pro (NVIDIA)', 'Supabase Auth + DB', 'Next.js 16', 'Resend OTP', 'Vercel Edge'].map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg border border-border bg-card">{t}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-6 lg:px-12 border-t border-border bg-card">
        <p className="text-sm text-muted-foreground">© 2026 SHGBazaar.ai — Empowering Women Entrepreneurs</p>
        <div className="sm:ml-auto flex gap-6">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Officer Login</Link>
          <Link href="/shg-login" className="text-sm text-muted-foreground hover:text-foreground">SHG Portal</Link>
        </div>
      </footer>
    </div>
  );
}

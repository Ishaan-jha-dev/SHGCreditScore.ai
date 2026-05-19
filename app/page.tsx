import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-slate-50 to-brand-50">
      <header className="px-4 lg:px-8 h-16 flex items-center glass sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 transition-transform hover:scale-105" href="/">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-brand-500/40">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">SHGCreditScore.ai</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow hover:-translate-y-0.5" href="/register">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-brand-800 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          ✨ Revolutionizing Microfinance
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none text-foreground max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          AI-Powered Credit Scoring for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-400">Self-Help Groups</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          Empowering women in Self-Help Groups with instant, fair, and transparent credit assessments using advanced AI and alternative data.
        </p>
        <div className="mt-10 flex gap-4 flex-col sm:flex-row animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
          <Link
            href="/login"
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-xl shadow-brand-500/20 transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started Now
          </Link>
          <Link
            href="#"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-border px-8 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-slate-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Learn More
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-8 border-t glass">
        <p className="text-sm text-muted-foreground font-medium">© 2026 SHGCreditScore.ai. All rights reserved.</p>
        <div className="sm:ml-auto flex gap-6">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

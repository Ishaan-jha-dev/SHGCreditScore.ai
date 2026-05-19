'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Building, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-brand-50 p-4">
      <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center]" />
      <div className="relative mx-auto w-full max-w-md space-y-8 rounded-2xl bg-white/80 backdrop-blur-xl p-8 shadow-2xl border border-white/20">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-brand-500/30 mb-4">
            <span className="text-primary-foreground font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground font-medium">Join the platform for bank officers</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                type="text"
                placeholder="Ravi Kumar"
                required
                className="flex h-11 w-full rounded-lg border border-border bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="officer@luckbank.in"
                required
                className="flex h-11 w-full rounded-lg border border-border bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="bankId">
              Bank ID
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="bankId"
                type="text"
                placeholder="LUCK-8291"
                required
                className="flex h-11 w-full rounded-lg border border-border bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="flex h-11 w-full rounded-lg border border-border bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group mt-2 relative flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-brand-500/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </span>
          </button>
        </form>
        <div className="text-center text-sm font-medium text-muted-foreground pt-2 border-t border-border">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

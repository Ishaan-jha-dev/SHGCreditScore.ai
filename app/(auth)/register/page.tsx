'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-8 shadow-sm border border-border">
        <div className="space-y-2 text-center">
          <div className="relative mx-auto h-14 w-14 overflow-hidden rounded-lg shadow-sm border border-border mb-4">
            <Image src="/logo.png" alt="SHG Credit Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground">Officer registration for SHG Portal</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ravi Kumar"
              required
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="officer@bank.in"
              required
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="bankId">
              Bank ID
            </label>
            <input
              id="bankId"
              type="text"
              placeholder="LUCK-8291"
              required
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border mt-4">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

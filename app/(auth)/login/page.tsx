'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Allow new users to sign up
        },
      });

      if (error) throw error;
      
      setStep('otp');
      setMessage('A 6-digit code has been sent to your email.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-8 shadow-sm border border-border">
        <div className="space-y-2 text-center">
          <div className="relative mx-auto h-14 w-14 overflow-hidden rounded-lg shadow-sm border border-border mb-4">
            <Image src="/logo.png" alt="SHG Credit Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Officer Login</h1>
          <p className="text-sm text-muted-foreground">Secure access to the SHG Portal</p>
        </div>

        {error && <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-100">{error}</p>}
        {message && <p className="text-sm font-medium text-green-700 bg-green-50 p-3 rounded-md border border-green-100">{message}</p>}

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="officer@shgcredit.in"
                required
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Secure OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="otp">
                6-Digit Security Code
              </label>
              <input
                id="otp"
                type="text"
                placeholder="123456"
                required
                pattern="\d{6}"
                maxLength={6}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-center tracking-[0.5em] font-mono placeholder:tracking-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('email');
                setError('');
                setMessage('');
              }}
              className="flex w-full items-center justify-center text-sm text-muted-foreground hover:text-foreground mt-2"
            >
              Use a different email
            </button>
          </form>
        )}

        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border mt-6">
          Need an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

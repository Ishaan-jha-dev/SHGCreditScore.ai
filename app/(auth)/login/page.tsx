'use client';

import { useState, useEffect, useRef } from 'react';
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
  // Countdown timer so user knows how long they have before OTP expires
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startCountdown = (seconds = 300) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(seconds);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    // Clear previous OTP so user starts fresh
    setOtp('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: false, // Officers must register first
        },
      });

      if (error) throw error;
      
      setStep('otp');
      setMessage(`An 8-digit security code was sent to ${email}. Enter it below before it expires.`);
      startCountdown(300); // 5 minute countdown
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setOtp('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { shouldCreateUser: false },
      });
      if (error) throw error;
      setMessage('A new code has been sent. Please check your inbox.');
      startCountdown(300);
    } catch (err: unknown) {
      setError((err as Error).message);
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
        email: email.trim().toLowerCase(),
        token: otp.trim(),
        type: 'email',
      });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message);
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
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground" htmlFor="otp">
                  8-Digit Security Code
                </label>
                {countdown > 0 ? (
                  <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded ${countdown < 60 ? 'text-red-600 bg-red-50' : 'text-green-700 bg-green-50'}`}>
                    Expires in {formatTime(countdown)}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-600">Code expired</span>
                )}
              </div>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="12345678"
                required
                pattern="\d{8}"
                maxLength={8}
                className="flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-lg text-center tracking-[0.6em] font-mono placeholder:tracking-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 8 || countdown === 0}
              className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  setStep('email');
                  setError('');
                  setMessage('');
                  setOtp('');
                  setCountdown(0);
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Different email
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading || countdown > 240} // Allow resend after 1 minute
                className="text-sm font-medium text-primary hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
              >
                Resend code
              </button>
            </div>
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

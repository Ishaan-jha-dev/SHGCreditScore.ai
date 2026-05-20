'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

type ScoreResult = {
  shgName: string;
  district: string;
  state: string;
  score: number | null;
  riskBand: string | null;
  status: string;
  recommendation: {
    approved: boolean;
    loanAmount: number;
    interestRate: number;
    tenure: number;
  } | null;
  updatedAt: string;
};

export default function SHGLoginPage() {
  const supabase = createClient();
  const [groupId, setGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Look up the SHG group and its latest assessment
      const { data: group, error: groupErr } = await supabase
        .from('shg_groups')
        .select(`
          id, name, district, state,
          assessments (
            score, risk_band, status, recommendation, updated_at
          )
        `)
        .eq('id', groupId.trim())
        .single();

      if (groupErr || !group) {
        throw new Error('No SHG group found with this ID. Please check with your bank officer.');
      }

      // Get the latest assessment
      const assessments = (group.assessments as Array<{
        score: number | null;
        risk_band: string | null;
        status: string;
        recommendation: ScoreResult['recommendation'];
        updated_at: string;
      }>);
      const latest = assessments?.[0];

      setResult({
        shgName: group.name,
        district: group.district,
        state: group.state,
        score: latest?.score ?? null,
        riskBand: latest?.risk_band ?? null,
        status: latest?.status ?? 'pending',
        recommendation: latest?.recommendation ?? null,
        updatedAt: latest?.updated_at ?? new Date().toISOString(),
      });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const riskColor = {
    green: 'text-green-700 bg-green-50 border-green-200',
    yellow: 'text-yellow-700 bg-amber-50 border-amber-200',
    red: 'text-red-700 bg-red-50 border-red-200',
  };

  const riskLabel = { green: 'Low Risk ✓', yellow: 'Moderate Risk', red: 'High Risk' };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 h-16 flex items-center bg-card border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-md shadow-sm border border-border">
            <Image src="/logo.png" alt="SHG Credit Logo" fill className="object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">SHG Credit Score</span>
        </Link>
        <div className="ml-auto">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Bank Officer Login →
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          {!result ? (
            <div className="rounded-lg bg-card border border-border p-8 shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">SHG Score Portal</h1>
                <p className="text-sm text-muted-foreground">
                  Check your Self-Help Group's credit score and loan eligibility status.
                </p>
              </div>

              {error && (
                <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-100">{error}</p>
              )}

              <form onSubmit={handleCheck} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="groupId">
                    SHG Group ID
                  </label>
                  <input
                    id="groupId"
                    type="text"
                    placeholder="Enter your SHG ID (given by bank officer)"
                    required
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Your bank officer will provide this ID when your assessment is registered.</p>
                </div>
                <button
                  type="submit"
                  disabled={loading || !groupId.trim()}
                  className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Check Credit Score'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-card border border-border p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{result.shgName}</h2>
                    <p className="text-sm text-muted-foreground">{result.district}, {result.state}</p>
                  </div>
                  {result.riskBand && (
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${riskColor[result.riskBand as keyof typeof riskColor]}`}>
                      {riskLabel[result.riskBand as keyof typeof riskLabel]}
                    </span>
                  )}
                </div>

                {result.status !== 'completed' ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">⏳</div>
                    <p className="font-semibold text-foreground">Assessment In Progress</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Status: <span className="capitalize font-medium">{result.status}</span>. Please check back later.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Score Circle */}
                    <div className="flex items-center justify-center">
                      <div className="relative flex items-center justify-center w-40 h-40">
                        <svg viewBox="0 0 36 36" className={`w-full h-full ${result.riskBand === 'green' ? 'text-green-500' : result.riskBand === 'yellow' ? 'text-yellow-500' : 'text-red-500'}`}>
                          <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                          <path strokeDasharray={`${((result.score ?? 0) / 850) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-4xl font-extrabold text-foreground">{result.score}</span>
                          <span className="text-xs text-muted-foreground">/ 850</span>
                        </div>
                      </div>
                    </div>

                    {/* Loan Recommendation */}
                    {result.recommendation && (
                      <div className={`rounded-lg p-5 border ${result.recommendation.approved ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className={`font-bold mb-3 ${result.recommendation.approved ? 'text-green-800' : 'text-red-800'}`}>
                          {result.recommendation.approved ? '✅ Loan Recommended' : '❌ Not Recommended'}
                        </p>
                        {result.recommendation.approved && (
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground">Loan Amount</p>
                              <p className="font-bold text-foreground">₹{result.recommendation.loanAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Interest Rate</p>
                              <p className="font-bold text-foreground">{result.recommendation.interestRate}% p.a.</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Tenure</p>
                              <p className="font-bold text-foreground">{result.recommendation.tenure} months</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-center text-muted-foreground">Last updated: {new Date(result.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                )}
              </div>
              <button onClick={() => { setResult(null); setGroupId(''); }} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Check another group
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

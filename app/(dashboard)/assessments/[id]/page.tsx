import Link from 'next/link';
import { Download, Check, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AssessmentDetailPage({ params }: { params: { id: string } }) {
  // Mock data for MVP
  const score = 720;
  const recommendation = {
    approved: true,
    loanAmount: 500000,
    interestRate: 8.5,
    tenure: 24,
    emi: 22641,
    justification: [
      "Zero default history in 3 years",
      "High attendance rate (92%)",
      "Strong savings corpus (₹1.2L)"
    ]
  };

  const scoreBreakdown = {
    repaymentReliability: 160,
    groupStability: 138,
    financialDiscipline: 85,
    economicActivity: 10
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-slate-50 transition-colors gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary-500/20 hover:bg-primary/90 transition-colors gap-2">
            <Check className="h-4 w-4" />
            Approve Loan
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-6 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Shakti Mahila Mandal</h1>
          <p className="text-muted-foreground mt-1 font-medium">Assessment ID: {params.id} • Lucknow, UP</p>
        </div>
        <div className="sm:text-right mt-4 sm:mt-0 flex flex-col sm:items-end">
          <div className="inline-flex items-center rounded-full border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 mb-2 gap-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Low Risk
          </div>
          <p className="text-sm font-medium text-muted-foreground">Processed on May 20, 2026</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Credit Score Card */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:col-span-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <CheckCircle2 className="w-32 h-32 text-emerald-500" />
          </div>
          <h3 className="font-semibold text-muted-foreground mb-4 uppercase tracking-wider text-xs">SHG Credit Score</h3>
          <div className="relative flex items-center justify-center w-52 h-52">
            <svg viewBox="0 0 36 36" className="w-full h-full text-emerald-500 drop-shadow-md">
              <path
                className="text-slate-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-current transition-all duration-1000 ease-out"
                strokeDasharray={`${(score/850)*100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-6xl font-extrabold text-foreground tracking-tight">{score}</span>
              <span className="text-sm font-medium text-muted-foreground mt-1">out of 850</span>
            </div>
          </div>
        </div>

        {/* Loan Recommendation Card */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm md:col-span-2 flex flex-col justify-center">
          <h3 className="font-bold text-foreground mb-6 text-xl border-b border-border pb-3">Loan Recommendation</h3>
          
          <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Recommended Amount</p>
              <p className="text-3xl font-extrabold text-primary-600">₹{recommendation.loanAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Interest Rate</p>
              <p className="text-2xl font-bold text-foreground">{recommendation.interestRate}% <span className="text-sm text-muted-foreground font-medium">p.a.</span></p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Suggested Tenure</p>
              <p className="text-xl font-bold text-foreground">{recommendation.tenure} months</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Est. Monthly EMI</p>
              <p className="text-xl font-bold text-foreground">₹{recommendation.emi.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-emerald-900 mb-3 uppercase tracking-wider">Justification</h4>
            <ul className="space-y-2">
              {recommendation.justification.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Score Breakdown */}
      <div className="rounded-lg border border-border bg-card p-8 shadow-sm mb-8">
        <h3 className="font-bold text-foreground mb-6 text-xl">Score Breakdown</h3>
        <div className="space-y-8">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-foreground">Repayment Reliability (40%)</span>
              <span className="font-bold text-muted-foreground">{scoreBreakdown.repaymentReliability} <span className="font-medium text-xs">/ 340 pts</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-full" style={{ width: `${(scoreBreakdown.repaymentReliability/340)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-foreground">Group Stability (30%)</span>
              <span className="font-bold text-muted-foreground">{scoreBreakdown.groupStability} <span className="font-medium text-xs">/ 255 pts</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-full" style={{ width: `${(scoreBreakdown.groupStability/255)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-foreground">Financial Discipline (20%)</span>
              <span className="font-bold text-muted-foreground">{scoreBreakdown.financialDiscipline} <span className="font-medium text-xs">/ 170 pts</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full" style={{ width: `${(scoreBreakdown.financialDiscipline/170)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-foreground">Economic Activity (10%)</span>
              <span className="font-bold text-muted-foreground">{scoreBreakdown.economicActivity} <span className="font-medium text-xs">/ 85 pts</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: `${(scoreBreakdown.economicActivity/85)*100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

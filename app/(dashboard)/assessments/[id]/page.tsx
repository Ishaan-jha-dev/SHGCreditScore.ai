import Link from 'next/link';

export default function AssessmentDetailPage({ params }: { params: { id: string } }) {
  // Mock data for MVP
  const score = 720;
  const riskBand = 'green';
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Export PDF
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-900/90">
            Approve Loan
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shakti Mahila Mandal</h1>
          <p className="text-gray-500 mt-1">Assessment ID: {params.id} • Lucknow, UP</p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-green-600 bg-green-50 mb-2">
            Low Risk
          </div>
          <p className="text-sm text-gray-500">Processed on May 20, 2026</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Credit Score Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm md:col-span-1 flex flex-col items-center justify-center text-center">
          <h3 className="font-semibold text-gray-500 mb-4">SHG Credit Score</h3>
          <div className="relative flex items-center justify-center w-48 h-48">
            <svg viewBox="0 0 36 36" className="w-full h-full text-green-500 drop-shadow-md">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-current"
                strokeDasharray={`${(score/850)*100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-gray-900">{score}</span>
              <span className="text-sm text-gray-500 mt-1">out of 850</span>
            </div>
          </div>
        </div>

        {/* Loan Recommendation Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm md:col-span-2 flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg border-b pb-2">Loan Recommendation</h3>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Recommended Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{recommendation.loanAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-2xl font-bold text-gray-900">{recommendation.interestRate}% p.a.</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Suggested Tenure</p>
              <p className="text-xl font-semibold text-gray-900">{recommendation.tenure} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Est. Monthly EMI</p>
              <p className="text-xl font-semibold text-gray-900">₹{recommendation.emi.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Justification</h4>
            <ul className="space-y-1">
              {recommendation.justification.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Score Breakdown */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-6 text-lg">Score Breakdown</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Repayment Reliability (40%)</span>
              <span className="text-gray-500">{scoreBreakdown.repaymentReliability} / 340 pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(scoreBreakdown.repaymentReliability/340)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Group Stability (30%)</span>
              <span className="text-gray-500">{scoreBreakdown.groupStability} / 255 pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(scoreBreakdown.groupStability/255)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Financial Discipline (20%)</span>
              <span className="text-gray-500">{scoreBreakdown.financialDiscipline} / 170 pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(scoreBreakdown.financialDiscipline/170)*100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Economic Activity (10%)</span>
              <span className="text-gray-500">{scoreBreakdown.economicActivity} / 85 pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(scoreBreakdown.economicActivity/85)*100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

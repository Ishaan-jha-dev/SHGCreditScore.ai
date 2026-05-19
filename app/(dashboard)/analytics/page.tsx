import { BarChart, PieChart, TrendingUp, Users } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="space-y-2 text-left mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">District Analytics</h1>
        <p className="text-muted-foreground">Overview of all SHG assessments in your jurisdiction.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between h-[320px]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Score Distribution</h3>
            </div>
            <p className="text-sm text-muted-foreground">Overall credit score distribution across SHGs.</p>
          </div>
          <div className="flex-1 flex items-end gap-3 pt-6">
            <div className="w-1/3 bg-rose-100 rounded-t-xl relative group flex justify-center h-[20%] transition-all hover:opacity-80">
              <span className="absolute -top-7 text-xs font-bold text-rose-600">12%</span>
              <div className="absolute -bottom-7 text-xs font-medium text-muted-foreground">High Risk</div>
            </div>
            <div className="w-1/3 bg-amber-100 rounded-t-xl relative group flex justify-center h-[45%] transition-all hover:opacity-80">
              <span className="absolute -top-7 text-xs font-bold text-amber-600">35%</span>
              <div className="absolute -bottom-7 text-xs font-medium text-muted-foreground">Moderate</div>
            </div>
            <div className="w-1/3 bg-emerald-100 rounded-t-xl relative group flex justify-center h-[80%] shadow-[0_-4px_15px_-3px_rgba(16,185,129,0.3)] transition-all hover:opacity-80">
              <span className="absolute -top-7 text-xs font-bold text-emerald-600">53%</span>
              <div className="absolute -bottom-7 text-xs font-medium text-muted-foreground">Low Risk</div>
            </div>
          </div>
          <div className="h-8"></div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between h-[320px]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Approval Rates</h3>
            </div>
            <p className="text-sm text-muted-foreground">Loan approval trends over the last 6 months.</p>
          </div>
          <div className="flex-1 flex items-end justify-between pt-6 px-2">
            {[45, 52, 58, 63, 71, 84].map((val, i) => (
              <div key={i} className="w-10 bg-brand-100 rounded-t-lg relative group flex justify-center transition-all hover:bg-brand-200" style={{ height: `${val}%` }}>
                <span className="absolute -top-7 text-xs font-bold text-brand-600">{val}%</span>
                <div className="absolute -bottom-7 text-xs font-medium text-muted-foreground">M{i+1}</div>
              </div>
            ))}
          </div>
          <div className="h-8"></div>
        </div>
      </div>
      
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mt-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Top Performing Branches</h3>
        </div>
        <div className="space-y-4">
          {[
            { name: "Lucknow Central", assessments: 45, avgScore: 712, trend: "+12" },
            { name: "Kanpur South", assessments: 38, avgScore: 685, trend: "+8" },
            { name: "Varanasi East", assessments: 24, avgScore: 642, trend: "+5" },
          ].map((branch, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{branch.name}</p>
                  <p className="text-sm text-muted-foreground">{branch.assessments} assessments completed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Avg Score</p>
                <div className="flex items-center gap-2 justify-end">
                  <p className="font-bold text-lg text-foreground">{branch.avgScore}</p>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{branch.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

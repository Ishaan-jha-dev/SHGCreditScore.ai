import Link from 'next/link';
import { FileText, CheckCircle2, Clock, Activity, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Assessments</h3>
            <div className="h-10 w-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span className="bg-emerald-100 p-0.5 rounded-full"><ArrowRight className="h-3 w-3 -rotate-45" /></span>
              +14% from last month
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Approved Loans</h3>
            <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold">84</div>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span className="bg-emerald-100 p-0.5 rounded-full"><ArrowRight className="h-3 w-3 -rotate-45" /></span>
              +5% from last month
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Pending Review</h3>
            <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs font-medium text-amber-600 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              4 urgent requests
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Avg Credit Score</h3>
            <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold">642</div>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span className="bg-emerald-100 p-0.5 rounded-full"><ArrowRight className="h-3 w-3 -rotate-45" /></span>
              +12 points from last month
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-4">
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm xl:col-span-2 overflow-hidden">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-border bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="font-semibold text-lg leading-none tracking-tight">Recent Assessments</h3>
            <p className="text-sm text-muted-foreground">You have 12 pending assessments.</p>
          </div>
          <div className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-slate-50/50 dark:bg-slate-900/50">
                  <tr className="border-b border-border transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">SHG Name</th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Status</th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Score</th>
                    <th className="h-12 px-6 text-right align-middle font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b border-border transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/80">
                    <td className="p-6 align-middle">
                      <div className="font-semibold text-foreground">Shakti Mahila Mandal</div>
                      <div className="text-sm text-muted-foreground mt-0.5">Lucknow, UP</div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="inline-flex items-center rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50">
                        Completed
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                        <span className="font-semibold">720</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle text-right">
                      <Link href="/dashboard/assessments/1" className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-slate-100 h-9 px-4 py-2 text-primary">View Details</Link>
                    </td>
                  </tr>
                  <tr className="border-b border-border transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/80">
                    <td className="p-6 align-middle">
                      <div className="font-semibold text-foreground">Durga Self Help Group</div>
                      <div className="text-sm text-muted-foreground mt-0.5">Kanpur, UP</div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="inline-flex items-center rounded-full border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-50">
                        Processing
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-medium">-</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle text-right">
                      <span className="text-muted-foreground text-sm font-medium px-4 py-2">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

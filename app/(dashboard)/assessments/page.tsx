import Link from 'next/link';
import { Search, Plus, Filter } from 'lucide-react';

export default function AssessmentsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Assessments</h1>
          <p className="text-muted-foreground">Manage all SHG credit assessments in your district.</p>
        </div>
        <Link
          href="/dashboard/assessments/new"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-brand-500/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5 gap-2"
        >
          <Plus className="h-4 w-4" />
          New Assessment
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
        <div className="relative flex-1 w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search SHG Name or District..."
            className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <select className="flex h-10 w-full sm:w-auto appearance-none rounded-lg border border-border bg-card pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-medium">
            <option value="all">All Risk Bands</option>
            <option value="green">Low Risk (Green)</option>
            <option value="yellow">Moderate Risk (Yellow)</option>
            <option value="red">High Risk (Red)</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-slate-50/50">
              <tr className="border-b border-border transition-colors">
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">SHG Name</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">District</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Status</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Score</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Date</th>
                <th className="h-12 px-6 text-right align-middle font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b border-border transition-colors hover:bg-slate-50/80">
                <td className="p-6 align-middle font-semibold text-foreground">Shakti Mahila Mandal</td>
                <td className="p-6 align-middle text-muted-foreground">Lucknow</td>
                <td className="p-6 align-middle">
                  <div className="inline-flex items-center rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50">
                    Completed
                  </div>
                </td>
                <td className="p-6 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                    <span className="font-semibold text-foreground">720</span>
                  </div>
                </td>
                <td className="p-6 align-middle text-muted-foreground">May 20, 2026</td>
                <td className="p-6 align-middle text-right">
                  <Link href="/dashboard/assessments/1" className="inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium text-primary hover:bg-brand-50 transition-colors">View</Link>
                </td>
              </tr>
              <tr className="border-b border-border transition-colors hover:bg-slate-50/80">
                <td className="p-6 align-middle font-semibold text-foreground">Durga Self Help Group</td>
                <td className="p-6 align-middle text-muted-foreground">Kanpur</td>
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
                <td className="p-6 align-middle text-muted-foreground">May 19, 2026</td>
                <td className="p-6 align-middle text-right">
                  <span className="inline-flex h-8 items-center justify-center px-3 text-sm font-medium text-muted-foreground">Wait</span>
                </td>
              </tr>
              <tr className="border-b border-border transition-colors hover:bg-slate-50/80">
                <td className="p-6 align-middle font-semibold text-foreground">Saraswati Group</td>
                <td className="p-6 align-middle text-muted-foreground">Varanasi</td>
                <td className="p-6 align-middle">
                  <div className="inline-flex items-center rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 bg-rose-50">
                    Completed
                  </div>
                </td>
                <td className="p-6 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></div>
                    <span className="font-semibold text-foreground">450</span>
                  </div>
                </td>
                <td className="p-6 align-middle text-muted-foreground">May 18, 2026</td>
                <td className="p-6 align-middle text-right">
                  <Link href="/dashboard/assessments/3" className="inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium text-primary hover:bg-brand-50 transition-colors">View</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

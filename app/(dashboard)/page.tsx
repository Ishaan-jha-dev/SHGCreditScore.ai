import Link from 'next/link';
import { FileText, CheckCircle2, Clock, Activity, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Assessments</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
              <ArrowRight className="h-3 w-3 -rotate-45" />
              +14% from last month
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Approved Loans</h3>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
              <ArrowRight className="h-3 w-3 -rotate-45" />
              +5% from last month
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Pending Review</h3>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs font-medium text-yellow-600 mt-1 flex items-center gap-1">
              4 urgent requests
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Avg Credit Score</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">642</div>
            <p className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
              <ArrowRight className="h-3 w-3 -rotate-45" />
              +12 points
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-4">
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm xl:col-span-2 overflow-hidden">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-border bg-muted/50">
            <h3 className="font-semibold text-lg leading-none tracking-tight">Recent Assessments</h3>
            <p className="text-sm text-muted-foreground">You have 12 pending assessments.</p>
          </div>
          <div className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-muted/50">
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">SHG Name</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Score</th>
                    <th className="h-12 px-6 text-right align-middle font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <td className="p-6 align-middle">
                      <div className="font-medium text-foreground">Shakti Mahila Mandal</div>
                      <div className="text-sm text-muted-foreground mt-0.5">Lucknow, UP</div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium text-green-700 bg-green-50 border-green-200">
                        Completed
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">720</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle text-right">
                      <Link href="/dashboard/assessments/1" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted h-9 px-4 py-2 text-primary border border-transparent hover:border-border">View Details</Link>
                    </td>
                  </tr>
                  <tr className="border-b border-border transition-colors hover:bg-muted/50">
                    <td className="p-6 align-middle">
                      <div className="font-medium text-foreground">Durga Self Help Group</div>
                      <div className="text-sm text-muted-foreground mt-0.5">Kanpur, UP</div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-50 border-yellow-200">
                        Processing
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">-</span>
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

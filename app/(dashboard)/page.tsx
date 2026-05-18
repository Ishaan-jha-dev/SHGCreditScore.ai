import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <div className="rounded-xl border bg-white text-gray-950 shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Assessments</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-gray-500">+14% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white text-gray-950 shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Approved Loans</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-gray-500">+5% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white text-gray-950 shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Pending Review</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">4 urgent</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white text-gray-950 shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Avg Credit Score</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">642</div>
            <p className="text-xs text-gray-500">+12 points from last month</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border bg-white text-gray-950 shadow xl:col-span-2">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Assessments</h3>
            <p className="text-sm text-gray-500">You have 12 pending assessments.</p>
          </div>
          <div className="p-6 pt-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">SHG Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Score</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
                    <td className="p-4 align-middle">
                      <div className="font-medium">Shakti Mahila Mandal</div>
                      <div className="text-sm text-gray-500">Lucknow</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-green-600 bg-green-50">
                        Completed
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>720</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <Link href="/dashboard/assessments/1" className="text-blue-600 hover:underline">View</Link>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
                    <td className="p-4 align-middle">
                      <div className="font-medium">Durga Self Help Group</div>
                      <div className="text-sm text-gray-500">Kanpur</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-yellow-600 bg-yellow-50">
                        Processing
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">-</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <span className="text-gray-400">Wait</span>
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

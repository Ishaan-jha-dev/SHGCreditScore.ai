import Link from 'next/link';

export default function AssessmentsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-gray-500">Manage all SHG credit assessments in your district.</p>
        </div>
        <Link
          href="/dashboard/assessments/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-900/90"
        >
          New Assessment
        </Link>
      </div>

      <div className="flex items-center gap-4 py-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search SHG Name..."
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <select className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option value="all">All Risk Bands</option>
          <option value="green">Green (Low Risk)</option>
          <option value="yellow">Yellow (Moderate)</option>
          <option value="red">Red (High Risk)</option>
        </select>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-gray-50/50">
              <tr className="border-b transition-colors hover:bg-gray-100/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">SHG Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">District</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Score</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Date</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-gray-100/50">
                <td className="p-4 align-middle font-medium">Shakti Mahila Mandal</td>
                <td className="p-4 align-middle text-gray-500">Lucknow</td>
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
                <td className="p-4 align-middle text-gray-500">May 20, 2026</td>
                <td className="p-4 align-middle text-right">
                  <Link href="/dashboard/assessments/1" className="text-blue-600 hover:underline">View</Link>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-gray-100/50">
                <td className="p-4 align-middle font-medium">Durga Self Help Group</td>
                <td className="p-4 align-middle text-gray-500">Kanpur</td>
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
                <td className="p-4 align-middle text-gray-500">May 19, 2026</td>
                <td className="p-4 align-middle text-right">
                  <span className="text-gray-400">Wait</span>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-gray-100/50">
                <td className="p-4 align-middle font-medium">Saraswati Group</td>
                <td className="p-4 align-middle text-gray-500">Varanasi</td>
                <td className="p-4 align-middle">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-red-600 bg-red-50">
                    Completed
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>450</span>
                  </div>
                </td>
                <td className="p-4 align-middle text-gray-500">May 18, 2026</td>
                <td className="p-4 align-middle text-right">
                  <Link href="/dashboard/assessments/3" className="text-blue-600 hover:underline">View</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

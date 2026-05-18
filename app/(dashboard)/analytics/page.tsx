export default function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="space-y-2 text-left">
        <h1 className="text-3xl font-bold tracking-tight">District Analytics</h1>
        <p className="text-gray-500">Overview of all SHG assessments in your jurisdiction.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between h-[300px]">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Score Distribution</h3>
            <p className="text-sm text-gray-500">Overall credit score distribution across SHGs.</p>
          </div>
          <div className="flex-1 flex items-end gap-2 pt-6">
            <div className="w-1/3 bg-red-100 rounded-t-md relative group flex justify-center h-[20%]">
              <span className="absolute -top-6 text-xs font-semibold text-red-600">12%</span>
              <div className="absolute -bottom-6 text-xs text-gray-500">Red (0-549)</div>
            </div>
            <div className="w-1/3 bg-yellow-100 rounded-t-md relative group flex justify-center h-[45%]">
              <span className="absolute -top-6 text-xs font-semibold text-yellow-600">35%</span>
              <div className="absolute -bottom-6 text-xs text-gray-500">Yellow (550-699)</div>
            </div>
            <div className="w-1/3 bg-green-100 rounded-t-md relative group flex justify-center h-[80%]">
              <span className="absolute -top-6 text-xs font-semibold text-green-600">53%</span>
              <div className="absolute -bottom-6 text-xs text-gray-500">Green (700+)</div>
            </div>
          </div>
          <div className="h-6"></div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between h-[300px]">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Approval Rates</h3>
            <p className="text-sm text-gray-500">Loan approval trends over the last 6 months.</p>
          </div>
          <div className="flex-1 flex items-end justify-between pt-6 px-4">
            {[45, 52, 58, 63, 71, 84].map((val, i) => (
              <div key={i} className="w-8 bg-blue-100 rounded-t-md relative group flex justify-center" style={{ height: `${val}%` }}>
                <span className="absolute -top-6 text-xs font-semibold text-blue-600">{val}</span>
                <div className="absolute -bottom-6 text-xs text-gray-500">M{i+1}</div>
              </div>
            ))}
          </div>
          <div className="h-6"></div>
        </div>
      </div>
      
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Top Performing Branches</h3>
        <div className="space-y-4">
          {[
            { name: "Lucknow Central", assessments: 45, avgScore: 712 },
            { name: "Kanpur South", assessments: 38, avgScore: 685 },
            { name: "Varanasi East", assessments: 24, avgScore: 642 },
          ].map((branch, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium text-gray-900">{branch.name}</p>
                <p className="text-sm text-gray-500">{branch.assessments} assessments completed</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Avg Score</p>
                <p className="font-semibold text-gray-900">{branch.avgScore}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

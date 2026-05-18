'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shgName: '',
    district: '',
    state: '',
    membersCount: '',
    formedDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/assessments/1/upload');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Back to Dashboard
        </Link>
      </div>
      <div className="space-y-2 text-left">
        <h1 className="text-3xl font-bold tracking-tight">New Assessment</h1>
        <p className="text-gray-500">Enter basic information about the Self-Help Group.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium leading-none" htmlFor="shgName">
              SHG Name
            </label>
            <input
              id="shgName"
              name="shgName"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={formData.shgName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="district">
              District
            </label>
            <input
              id="district"
              name="district"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="membersCount">
              Number of Members
            </label>
            <input
              id="membersCount"
              name="membersCount"
              type="number"
              min="5"
              max="20"
              required
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={formData.membersCount}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="formedDate">
              Formation Date (approx)
            </label>
            <input
              id="formedDate"
              name="formedDate"
              type="date"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={formData.formedDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-white shadow hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Continue to Upload'}
          </button>
        </div>
      </form>
    </div>
  );
}

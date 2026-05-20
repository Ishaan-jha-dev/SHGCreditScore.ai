'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

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
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
      <div className="space-y-2 text-left mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">New Assessment</h1>
        <p className="text-muted-foreground">Enter basic information about the Self-Help Group to begin.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="shgName">
              SHG Name
            </label>
            <input
              id="shgName"
              name="shgName"
              type="text"
              placeholder="e.g. Mahila Samiti"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              value={formData.shgName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="district">
              District
            </label>
            <input
              id="district"
              name="district"
              type="text"
              placeholder="e.g. Lucknow"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              placeholder="e.g. Uttar Pradesh"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="membersCount">
              Number of Members
            </label>
            <input
              id="membersCount"
              name="membersCount"
              type="number"
              min="5"
              max="20"
              placeholder="10"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              value={formData.membersCount}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="formedDate">
              Formation Date
            </label>
            <input
              id="formedDate"
              name="formedDate"
              type="date"
              className="flex h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              value={formData.formedDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end pt-6 border-t border-border mt-6">
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary-500/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 gap-2"
          >
            {loading ? 'Creating...' : 'Continue to Upload'}
            {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </form>
    </div>
  );
}

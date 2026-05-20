'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NewAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    setError('');

    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create assessment');

      router.push(`/dashboard/assessments/${data.assessmentId}/upload`);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      {error && (
        <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="shgName">
              SHG Name *
            </label>
            <input
              id="shgName" name="shgName" type="text"
              placeholder="e.g. Mahila Samiti"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={formData.shgName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="district">
              District *
            </label>
            <input
              id="district" name="district" type="text"
              placeholder="e.g. Lucknow"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="state">
              State *
            </label>
            <select
              id="state" name="state"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {['Uttar Pradesh','Bihar','Madhya Pradesh','Rajasthan','Maharashtra','Gujarat','West Bengal','Karnataka','Tamil Nadu','Andhra Pradesh','Telangana','Odisha','Jharkhand','Chhattisgarh','Uttarakhand','Himachal Pradesh','Punjab','Haryana'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="membersCount">
              Number of Members *
            </label>
            <input
              id="membersCount" name="membersCount" type="number"
              min="5" max="30"
              placeholder="10"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={formData.membersCount}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground leading-none" htmlFor="formedDate">
              Formation Date
            </label>
            <input
              id="formedDate" name="formedDate" type="date"
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={formData.formedDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end pt-6 border-t border-border mt-6">
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 gap-2"
          >
            {loading ? 'Creating...' : 'Continue to Upload'}
            {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </form>
    </div>
  );
}

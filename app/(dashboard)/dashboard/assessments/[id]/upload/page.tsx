'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';

export default function UploadDocumentsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setLoading(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push(`/dashboard/assessments/${params.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="space-y-2 text-left mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Upload Documents</h1>
        <p className="text-muted-foreground">Upload meeting minutes, passbooks, and internal loan ledgers for SHG assessment.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
        <form 
          className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all ${dragActive ? 'border-primary bg-primary-50/50' : 'border-border hover:border-primary-300 hover:bg-slate-50'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange} 
            className="hidden" 
            id="file-upload" 
          />
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer space-y-4">
            <div className="p-4 bg-primary-50 rounded-full text-primary shadow-sm shadow-primary-100">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1.5">PDF, JPG, PNG (Max 10MB per file)</p>
            </div>
          </label>
        </form>

        {files.length > 0 && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Selected Files ({files.length})
            </h3>
            <ul className="space-y-3">
              {files.map((file, index) => (
                <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border bg-slate-50/50 rounded-xl gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <File className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <select className="flex-1 sm:flex-none text-xs border border-border bg-white rounded-lg p-2 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Meeting Minutes</option>
                      <option>Bank Passbook</option>
                      <option>Loan Ledger</option>
                      <option>Attendance Register</option>
                    </select>
                    <button onClick={() => removeFile(index)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end pt-6 mt-8 border-t border-border">
          <button
            onClick={handleProcess}
            disabled={loading || files.length === 0}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary-500/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 gap-2"
          >
            {loading ? 'Processing...' : 'Process Documents'}
          </button>
        </div>
      </div>
    </div>
  );
}

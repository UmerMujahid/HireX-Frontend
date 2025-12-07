import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API = 'http://127.0.0.1:8000/jobs/apply-job/';

export default function ApplyJob({ jobId, onApplied }) {
  const auth = useAuth() || {};
  const { accessToken } = auth;

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId) return alert('Missing job id');

    const form = new FormData();
    form.append('applied_for_id', jobId);
    form.append('description', description);
    if (file) form.append('resume', file);

    setLoading(true);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        },
        body: form
      });
      const data = await res.json();
      if (!res.ok) throw data;
      alert('Application submitted');
      setDescription('');
      setFile(null);
      if (onApplied) onApplied(data);
    } catch (err) {
      console.error(err);
      alert('Failed to apply: ' + (err?.detail || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Note</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Resume (PDF, DOCX)</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">
          {loading ? 'Applying...' : 'Apply'}
        </button>
      </div>
    </form>
  );
}

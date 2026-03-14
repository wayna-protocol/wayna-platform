
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../constants';
import { Project } from '../types';

interface CreateProjectProps {
  onBack: () => void;
  onSubmit: (project: Partial<Project>) => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      goal: Number(formData.goal),
      image: formData.image,
      raised: 0,
      daysLeft: 30,
      status: 'active',
      pofBadge: true,
      updates: []
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <Icons.ArrowRight className="w-4 h-4 rotate-180" />
        Kembali
      </button>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">Mulai Proyek Baru</h1>
      <p className="text-gray-500 mb-10 text-lg">Wujudkan ide Anda menjadi nyata dengan dukungan komunitas WAYNA.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Nama Proyek</label>
          <input
            required
            type="text"
            placeholder="Contoh: Energi Surya untuk Desa"
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Deskripsi Detail</label>
          <textarea
            required
            placeholder="Jelaskan apa yang ingin Anda capai..."
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg min-h-[150px]"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Target Dana ($)</label>
            <input
              required
              type="number"
              placeholder="Contoh: 10000"
              className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
              value={formData.goal}
              onChange={e => setFormData({ ...formData, goal: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Metode Validasi</label>
            <div className="w-full p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
              <Icons.CheckBadge className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-700">Proof of Fundraising Enabled</span>
            </div>
          </div>
        </div>

        <Button className="w-full py-4 text-xl">Publikasikan Proyek</Button>
      </form>
    </div>
  );
};

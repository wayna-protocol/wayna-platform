
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { Icons } from '../constants';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSupport: (amount: number) => void;
  waftBalance: number;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onSupport, waftBalance }) => {
  const [supportAmount, setSupportAmount] = useState(50);

  const handleSupport = () => {
    if (waftBalance < supportAmount) {
      alert("Saldo WAFT Anda tidak cukup.");
      return;
    }
    onSupport(supportAmount);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <Icons.ArrowRight className="w-4 h-4 rotate-180" />
        Kembali ke Jelajah
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-[400px] object-cover rounded-[2rem] apple-shadow" 
          />
          
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
            {project.pofBadge && (
              <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                <Icons.CheckBadge className="w-4 h-4" />
                Proof of Fundraising
              </div>
            )}
          </div>

          <p className="text-xl text-gray-500 leading-relaxed">
            {project.description}
          </p>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold pt-6">Update Terbaru</h3>
            {project.updates.length > 0 ? (
              project.updates.map((update, i) => (
                <Card key={i} className="border-none bg-gray-50">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{update.date}</span>
                  <p className="mt-2 text-gray-700">{update.content}</p>
                </Card>
              ))
            ) : (
              <p className="text-gray-400 italic">Belum ada pembaruan untuk proyek ini.</p>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="sticky top-24">
            <ProgressBar current={project.raised} total={project.goal} />
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${project.raised.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">terkumpul dari ${project.goal.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{project.daysLeft}</p>
                  <p className="text-sm text-gray-500">hari lagi</p>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jumlah Dukungan (WAFT)</label>
                <div className="flex gap-2">
                  {[20, 50, 100, 500].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setSupportAmount(amt)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${supportAmount === amt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-100 hover:border-blue-200'}`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleSupport} className="w-full py-4 text-lg">Dukung Sekarang</Button>
              <Button variant="secondary" className="w-full">Bagikan Proyek</Button>
              
              <p className="text-[10px] text-center text-gray-400">Dukungan Anda diproses melalui smart contract transparan.</p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="text-sm font-bold">Kreator Proyek</p>
                  <p className="text-xs text-blue-600">Terverifikasi</p>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

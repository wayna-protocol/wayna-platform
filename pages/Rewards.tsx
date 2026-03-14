
import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

interface RewardsProps {
  contributionHistory: Array<{ activity: string; date: string }>;
}

export const Rewards: React.FC<RewardsProps> = ({ contributionHistory }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontribusi & Dampak</h1>
      <p className="text-gray-500 mb-12 max-w-2xl">Pantau riwayat kontribusi Anda di dalam ekosistem Wayna. Setiap tindakan membangun reputasi Anda sebagai kreator atau pendukung.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="bg-blue-600 text-white border-none p-8 flex flex-col justify-center">
            <h3 className="text-lg font-medium mb-2 opacity-80">Reputasi Akun</h3>
            <p className="text-5xl font-bold mb-4">75.0</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
               <div className="h-full bg-white w-3/4" />
            </div>
            <p className="text-[10px] mt-4 opacity-60 italic tracking-widest uppercase">Verified Contributor Level 1</p>
          </Card>

          <Card className="bg-gray-50 border-none shadow-none p-8">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">Sektor Kontribusi</h4>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Penulisan</span>
                  <Badge label="Aktif" variant="info" />
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Pendanaan</span>
                  <Badge label="Early" variant="success" />
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Validasi</span>
                  <span className="text-[10px] font-black text-gray-300">N/A</span>
               </div>
            </div>
          </Card>
        </div>

        <div className="col-span-1 lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-black mb-6 tracking-tight">Pencapaian Ekosistem</h3>
            <div className="flex flex-wrap gap-4">
              <div className="p-6 rounded-[2rem] bg-white border border-gray-50 flex flex-col items-center w-40 shadow-sm transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-yellow-50 rounded-full mb-4 flex items-center justify-center text-3xl">🏆</div>
                <span className="text-[10px] font-black text-center uppercase tracking-widest text-gray-900 leading-tight">Early Supporter</span>
              </div>
              <div className="p-6 rounded-[2rem] bg-white border border-gray-50 flex flex-col items-center w-40 shadow-sm transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-blue-50 rounded-full mb-4 flex items-center justify-center text-3xl">✍️</div>
                <span className="text-[10px] font-black text-center uppercase tracking-widest text-gray-900 leading-tight">Prolific Writer</span>
              </div>
              <div className="p-6 rounded-[2rem] bg-white border border-gray-50 flex flex-col items-center w-40 opacity-40 grayscale shadow-none">
                <div className="w-16 h-16 bg-green-50 rounded-full mb-4 flex items-center justify-center text-3xl">🏗️</div>
                <span className="text-[10px] font-black text-center uppercase tracking-widest text-gray-300 leading-tight">Project Leader</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black mb-6 tracking-tight">Log Aktivitas Kontribusi</h3>
            <Card className="p-0 overflow-hidden border-none shadow-sm bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 uppercase text-[9px] font-black tracking-[0.2em]">
                      <th className="px-6 py-5">Aktivitas</th>
                      <th className="px-6 py-5 text-right">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {contributionHistory.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-900 text-xs">{item.activity}</td>
                        <td className="px-6 py-5 text-right text-gray-400 text-[10px] font-bold uppercase">{item.date}</td>
                      </tr>
                    ))}
                    {contributionHistory.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-6 py-16 text-center text-gray-300 font-black uppercase text-[10px] tracking-widest italic">Belum ada aktivitas tercatat.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

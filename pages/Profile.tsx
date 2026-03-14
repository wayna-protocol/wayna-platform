
import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Icons } from '../constants';
import { Page } from '../types';

interface ProfileProps {
  supportedCount: number;
  userName: string;
  onNavigate: (page: Page) => void;
}

export const Profile: React.FC<ProfileProps> = ({ supportedCount, userName, onNavigate }) => {
  return (
    <div className="px-5 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden apple-shadow ring-4 ring-white">
            <img src="https://picsum.photos/seed/waynaprofile/400/400" className="w-full h-full object-cover" alt="Profile" />
          </div>
          <button 
            onClick={() => onNavigate(Page.SETTINGS)}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-50 text-xs"
          >
            ⚙️
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
          <Icons.CheckBadge className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">Kontributor Level 1</p>
        
        <div className="flex gap-2">
          <Badge label="Terverifikasi" variant="success" />
          <Badge label="Early Supporter" variant="info" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <Card className="text-center bg-white p-5 border-none shadow-sm flex flex-col justify-center">
          <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Trust Score</h4>
          <p className="text-xl font-bold text-gray-900">75.0</p>
          <div className="mt-3 h-1 bg-blue-50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: '75%' }} />
          </div>
        </Card>
        <Card className="text-center bg-white p-5 border-none shadow-sm flex flex-col justify-center">
          <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Proyek</h4>
          <p className="text-xl font-bold text-gray-900">{supportedCount}</p>
          <p className="text-[8px] text-blue-500 font-bold uppercase tracking-tight mt-1">Dukungan Aktif</p>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 px-1">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Icons.Logo />
            </div>
            <div className="flex-1 border-b border-gray-50 pb-4">
              <p className="text-sm font-bold text-gray-900 leading-tight">Bergabung dengan Wayna Intelligent</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">Satu jam yang lalu</p>
            </div>
          </div>
          <div className="flex gap-4 items-start opacity-50">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
              <Icons.Token className="w-5 h-5" />
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm font-bold text-gray-900 leading-tight">Mendapatkan Reward Mingguan</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">Terjadwal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

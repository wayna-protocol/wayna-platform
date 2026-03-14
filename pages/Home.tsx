
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Page, Project } from '../types';
import { Icons } from '../constants';

interface HomeProps {
  onNavigate: (page: Page, id?: string) => void;
  projects: Project[];
  userName: string;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, projects }) => {
  return (
    <div className="space-y-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:space-y-0">
      
      {/* Hero Section & Featured Block */}
      <div className="lg:col-span-8 space-y-10 pt-10 lg:pt-0">
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Fundraising Modern <br />
            Desentralisasi
          </h1>
          <p className="text-lg lg:text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
            Buat dan danai proyek tanpa perantara, didukung oleh blockchain dan kecerdasan buatan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="px-10 py-4 text-sm font-bold rounded-2xl bg-[#1D63D2]" onClick={() => onNavigate(Page.CREATE_PROJECT)}>
              Mulai Proyek
            </Button>
            <Button variant="secondary" className="px-10 py-4 text-sm font-bold rounded-2xl border-gray-200" onClick={() => onNavigate(Page.EXPLORE)}>
              Jelajahi Proyek
            </Button>
          </div>
        </div>

        {/* PoF Block */}
        <Card className="flex items-center gap-6 bg-white border border-gray-50 rounded-[2rem] p-8 shadow-sm">
          <div className="bg-[#1D63D2] p-4 rounded-2xl shrink-0 text-white">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Proof of Fundraising (PoF)</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              A new consensus mechanism for validating fundraising efforts on WAYNA.
            </p>
          </div>
        </Card>

        {/* FITUR UTAMA: KEPENULISAN & TOKEN */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900">Ekosistem WAYNA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="group p-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-[2.5rem] cursor-pointer hover:shadow-xl transition-all duration-500"
              onClick={() => onNavigate(Page.WRITE)}
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                <Icons.Sparkles className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-2">Studio Kepenulisan</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Tulis novel dan konten kreatif dengan bantuan AI Intelligent. Publikasikan karya Anda secara langsung.
              </p>
              <div className="mt-6 flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">
                Buka Studio <Icons.ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card 
              className="group p-8 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-[2.5rem] cursor-pointer hover:shadow-xl transition-all duration-500"
              onClick={() => onNavigate(Page.WAFT)}
            >
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform">
                <Icons.Token className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-2">Beranda Token</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Kelola aset WAFT, ETH, dan USDT Anda. Pantau perkembangan finansial desentralisasi Anda di satu tempat.
              </p>
              <div className="mt-6 flex items-center gap-2 text-purple-600 text-xs font-black uppercase tracking-widest">
                Cek Dompet <Icons.ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>

        {/* Proyek Populer Minggu Ini - Mobile View only or extra content */}
        <div className="lg:hidden space-y-6">
          <h3 className="text-2xl font-black text-gray-900">Proyek Populer Minggu Ini</h3>
          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map(project => (
                <ProjectHorizontalCard key={project.id} project={project} onClick={() => onNavigate(Page.PROJECT_DETAIL, project.id)} />
              ))
            ) : (
              <div className="py-12 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center text-center px-6">
                <span className="text-4xl mb-3 opacity-20">🚀</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Belum ada proyek populer. Jadilah yang pertama!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Desktop Proyek */}
      <div className="hidden lg:block lg:col-span-4">
        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 space-y-8 sticky top-24 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">Proyek</h3>
          </div>
          <div className="space-y-8">
            {projects.length > 0 ? (
              projects.map(project => (
                <ProjectSidebarItem key={project.id} project={project} onClick={() => onNavigate(Page.PROJECT_DETAIL, project.id)} />
              ))
            ) : (
              <div className="py-10 text-center flex flex-col items-center justify-center opacity-30">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                  <Icons.Logo />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">Panggung Kreativitas <br /> Masih Kosong.</p>
              </div>
            )}
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors pt-4" onClick={() => onNavigate(Page.EXPLORE)}>
            Lihat Semua <Icons.ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Use React.FC to properly handle standard props like 'key'
const ProjectHorizontalCard: React.FC<{ project: Project, onClick: () => void }> = ({ project, onClick }) => (
  <Card className="p-0 overflow-hidden flex flex-row items-stretch border border-gray-100 h-36" onClick={onClick}>
    <div className="w-1/3 shrink-0 overflow-hidden relative">
      <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
      {project.status === 'funded' && (
        <div className="absolute inset-x-0 bottom-0 bg-green-50/90 backdrop-blur px-2 py-1 text-center">
          <span className="text-[10px] font-black text-green-700 uppercase">Didanai</span>
        </div>
      )}
    </div>
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-gray-900 text-sm line-clamp-1 leading-tight">{project.title}</h4>
        <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-snug">{project.description}</p>
      </div>
      <div className="space-y-2">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500" 
            style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }} 
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-black">
           <span className="text-gray-900">${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
           <span className="text-gray-400">{project.daysLeft} hari</span>
        </div>
      </div>
    </div>
  </Card>
);

// Use React.FC to properly handle standard props like 'key'
const ProjectSidebarItem: React.FC<{ project: Project, onClick: () => void }> = ({ project, onClick }) => (
  <div className="flex gap-4 cursor-pointer group" onClick={onClick}>
    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative shadow-sm border border-gray-50">
      <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={project.title} />
      {project.status === 'funded' && (
        <div className="absolute inset-x-0 bottom-0 bg-green-50/90 backdrop-blur px-1 py-1 text-center">
          <span className="text-[8px] font-black text-green-700 uppercase">Didanai</span>
        </div>
      )}
    </div>
    <div className="flex-1 flex flex-col justify-between py-0.5">
      <div>
        <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{project.title}</h4>
        <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 font-medium">{project.description}</p>
      </div>
      <div className="space-y-2">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500" 
            style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }} 
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-black">
          <span className="text-gray-900">${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
          <span className="text-gray-400">{project.daysLeft} hari lagi</span>
        </div>
      </div>
    </div>
  </div>
);

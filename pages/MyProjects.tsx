
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Page, Project } from '../types';
import { Icons } from '../constants';

interface MyProjectsProps {
  onNavigate: (page: Page, id?: string) => void;
  projects: Project[];
}

export const MyProjects: React.FC<MyProjectsProps> = ({ onNavigate, projects }) => {
  // In this session-based demo, "My Projects" are all projects created by the user
  const myCreatedProjects = projects;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Proyek Saya</h1>
          <p className="text-gray-500 font-medium">Kelola dan pantau perkembangan ide-ide terdesentralisasi Anda.</p>
        </div>
        <Button onClick={() => onNavigate(Page.CREATE_PROJECT)} className="hidden md:flex items-center gap-2 px-8 py-4">
          <span className="text-lg">+</span> Mulai Proyek Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {myCreatedProjects.length > 0 ? (
          myCreatedProjects.map(project => (
            <Card key={project.id} className="p-0 overflow-hidden border-none shadow-sm group hover:shadow-xl transition-all duration-500" onClick={() => onNavigate(Page.PROJECT_DETAIL, project.id)}>
              <div className="h-48 overflow-hidden relative">
                <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'active' ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'}`}>
                    {project.status === 'active' ? 'Aktif' : 'Didanai'}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-6 font-medium">{project.description}</p>
                
                <div className="space-y-3 pt-6 border-t border-gray-50">
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-900">${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
                    <span className="text-gray-300">{project.daysLeft} hari tersisa</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 py-32 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Belum ada proyek yang dibuat</h3>
            <p className="text-gray-400 max-w-sm mb-10 leading-relaxed font-medium">Anda belum meluncurkan proyek apa pun. Mari wujudkan ide brilian Anda menjadi kenyataan sekarang.</p>
            <Button onClick={() => onNavigate(Page.CREATE_PROJECT)} className="px-12 py-5 text-sm font-black uppercase tracking-widest bg-[#1D63D2] shadow-xl shadow-blue-50">
              Luncurkan Proyek Pertama Anda
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Mobile */}
      <div className="md:hidden fixed bottom-24 right-6">
        <button 
          onClick={() => onNavigate(Page.CREATE_PROJECT)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
        >
          <span className="text-3xl">+</span>
        </button>
      </div>
    </div>
  );
};

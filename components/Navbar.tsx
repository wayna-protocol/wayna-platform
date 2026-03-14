
import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  waftBalance: number;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, userName }) => {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
              <div className="bg-[#1D63D2] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                <span className="text-white text-xl font-black">W</span>
              </div>
              <span className="font-black text-2xl tracking-tight text-gray-900 uppercase">WAYNA</span>
            </div>
            
            <nav className="flex items-center gap-8">
              <button onClick={() => onNavigate(Page.EXPLORE)} className={`text-sm font-bold ${activePage === Page.EXPLORE ? 'text-[#1D63D2]' : 'text-gray-500 hover:text-gray-900'}`}>Explore</button>
              <button onClick={() => onNavigate(Page.MY_PROJECTS)} className={`text-sm font-bold ${activePage === Page.MY_PROJECTS ? 'text-[#1D63D2]' : 'text-gray-500 hover:text-gray-900'}`}>Proyek Saya</button>
              <button onClick={() => onNavigate(Page.WRITE)} className={`text-sm font-bold ${activePage === Page.WRITE ? 'text-[#1D63D2]' : 'text-gray-500 hover:text-gray-900'}`}>Studio</button>
              <button onClick={() => onNavigate(Page.WAFT)} className={`text-sm font-bold ${activePage === Page.WAFT ? 'text-[#1D63D2]' : 'text-gray-500 hover:text-gray-900'}`}>Dompet</button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate(Page.PROFILE)}>
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#1D63D2] transition-colors">{userName}</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#1D63D2] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
             </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2" onClick={() => onNavigate(Page.HOME)}>
          <div className="bg-[#1D63D2] w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-black">W</span>
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900 uppercase">WAYNA</span>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => onNavigate(Page.WAFT)} className="p-2 text-purple-600 bg-purple-50 rounded-xl">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </button>
           <button className="p-2 text-gray-900">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
             </svg>
           </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe shadow-lg">
        <div className="flex items-center justify-around h-16 px-4">
          <NavButton active={activePage === Page.HOME} onClick={() => onNavigate(Page.HOME)} icon={<HomeIcon />} label="Home" />
          <NavButton active={activePage === Page.EXPLORE} onClick={() => onNavigate(Page.EXPLORE)} icon={<ExploreIcon />} label="Explore" />
          <NavButton active={activePage === Page.WRITE} onClick={() => onNavigate(Page.WRITE)} icon={<WriteIcon />} label="Studio" />
          <NavButton active={activePage === Page.MY_PROJECTS} onClick={() => onNavigate(Page.MY_PROJECTS)} icon={<ProjectIcon />} label="Proyek Saya" />
          <NavButton active={activePage === Page.PROFILE} onClick={() => onNavigate(Page.PROFILE)} icon={<UserIcon />} label="Profil" />
        </div>
      </nav>
    </>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#1D63D2]' : 'text-gray-400'}`}>
    <div className={`w-6 h-6 ${active ? 'scale-110' : ''}`}>{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

const HomeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
);
const ExploreIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
);
const WriteIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
);
const ProjectIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
);
const UserIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
);

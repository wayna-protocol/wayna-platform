
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface OnboardingProps {
  onFinish: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState<'welcome' | 'connect'>('welcome');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (wallet: string) => {
    setIsConnecting(true);
    // Simulasi koneksi dompet
    setTimeout(() => {
      onFinish();
    }, 1500);
  };

  if (step === 'welcome') {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
        <div className="max-w-md w-full text-center space-y-16">
          <div className="space-y-6 flex flex-col items-center">
            <div className="bg-[#1D63D2] w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200 animate-in zoom-in-50 duration-1000">
               <span className="text-white text-5xl font-black">W</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase italic">WAYNA</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Intelligent Ecosystem</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">Masa Depan <br/> Pendanaan Kreatif</h2>
            <p className="text-gray-400 leading-relaxed font-medium text-sm px-4">
              Platform all-in-one untuk fundraising, kepenulisan novel, dan perdagangan aset digital berbasis blockchain.
            </p>
          </div>

          <div className="pt-8">
            <Button 
              className="w-full py-5 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-100 bg-[#1D63D2] hover:scale-105 active:scale-95 transition-all" 
              onClick={() => setStep('connect')}
            >
              Get Started
            </Button>
            <p className="mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              By continuing, you agree to our Web3 Terms
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-10 flex gap-1 items-center">
           <div className="w-8 h-1 bg-blue-600 rounded-full" />
           <div className="w-2 h-1 bg-gray-100 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8f9fa] flex flex-col items-center justify-center p-6 animate-in slide-in-from-right duration-500">
      <div className="max-w-md w-full space-y-8">
        <button 
          onClick={() => setStep('welcome')}
          className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2"
        >
          ← Kembali
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Hubungkan Dompet</h2>
          <p className="text-sm text-gray-500 font-medium">Pilih dompet kripto Anda untuk masuk ke aplikasi.</p>
        </div>

        <div className="space-y-4">
          {[
            { id: 'metamask', name: 'MetaMask', icon: '🦊', desc: 'Populer di Browser' },
            { id: 'trust', name: 'Trust Wallet', icon: '🛡️', desc: 'Terbaik untuk Mobile' },
            { id: 'phantom', name: 'Phantom', icon: '👻', desc: 'Ekosistem Solana' },
          ].map((wallet) => (
            <Card 
              key={wallet.id}
              onClick={() => !isConnecting && handleConnect(wallet.id)}
              className={`p-6 border-none shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {wallet.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-900 text-lg leading-none mb-1">{wallet.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{wallet.desc}</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                →
              </div>
            </Card>
          ))}
        </div>

        {isConnecting && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] animate-pulse">Menghubungkan ke Blockchain...</p>
          </div>
        )}

        <div className="pt-10 text-center">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
            WAYNA menggunakan enkripsi AES-256 <br/> untuk mengamankan identitas digital Anda.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 flex gap-1 items-center">
           <div className="w-2 h-1 bg-blue-100 rounded-full" />
           <div className="w-8 h-1 bg-blue-600 rounded-full" />
      </div>
    </div>
  );
};


import React from 'react';
import { Card } from '../components/Card';
import { Icons } from '../constants';

interface WAFTProps {
  waftBalance: number;
  usdtBalance: number;
  ethBalance: number;
  solBalance: number;
}

export const WAFT: React.FC<WAFTProps> = ({ waftBalance, usdtBalance, ethBalance, solBalance }) => {
  // Estimated Total Balance dikosongkan sesuai permintaan
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Wallet Card - Kosongan */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-400 border-none p-12 shadow-sm relative overflow-hidden h-auto lg:h-[450px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Estimated Total Balance</p>
                  <h3 className="text-xl font-bold tracking-tight opacity-40">Wayna Multi-Chain Suite</h3>
                </div>
                <div className="flex -space-x-3 opacity-20 grayscale">
                   <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-gray-200 z-30 shadow-sm flex items-center justify-center text-[10px] text-white font-black">W</div>
                   <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-gray-200 z-20 shadow-sm flex items-center justify-center text-[10px] text-white font-black">T</div>
                   <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-gray-200 z-10 shadow-sm flex items-center justify-center text-[10px] text-white font-black">E</div>
                   <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-gray-200 z-0 shadow-sm flex items-center justify-center text-[10px] text-white font-black">S</div>
                </div>
              </div>
              
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-3xl font-bold opacity-20 tracking-widest">$</span>
                <p className="text-7xl font-black tracking-tighter">
                  -
                </p>
                <span className="text-2xl font-bold opacity-20 uppercase tracking-widest">USD</span>
              </div>
              <p className="text-sm font-medium opacity-20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                Connection Idle • Multi-Asset Wallet Active
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <button className="bg-white/50 text-gray-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm cursor-not-allowed">Receive</button>
              <button className="bg-white/10 text-gray-300 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 cursor-not-allowed">Send</button>
              <button className="bg-white/10 text-gray-300 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 cursor-not-allowed">Swap</button>
              <button className="bg-white/10 text-gray-300 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 cursor-not-allowed">Bridge</button>
            </div>

            {/* Decor Elements */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-[120px] pointer-events-none" />
          </Card>

          {/* Asset List Desktop - Hanya WAFT, USDT, ETH, SOL */}
          <div className="mt-8 space-y-4">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Your Assets Portfolio</h4>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { name: 'Wayna Native', symbol: 'WAFT', icon: '💎', balance: waftBalance, color: 'bg-purple-50 text-purple-400' },
                 { name: 'Tether Stable', symbol: 'USDT', icon: '💵', balance: usdtBalance, color: 'bg-green-50 text-green-400' },
                 { name: 'Ethereum', symbol: 'ETH', icon: '⧫', balance: ethBalance, color: 'bg-indigo-50 text-indigo-400' },
                 { name: 'Solana', symbol: 'SOL', icon: '☀️', balance: solBalance, color: 'bg-orange-50 text-orange-400' }
               ].map((asset, i) => (
                 <Card key={i} className="flex items-center justify-between p-6 border-none bg-white/50 shadow-none border border-gray-50 opacity-40">
                   <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-[1.25rem] ${asset.color} flex items-center justify-center text-2xl grayscale`}>
                        {asset.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-black text-gray-900 leading-none mb-1">{asset.name}</h5>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{asset.symbol}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-lg font-black text-gray-900 leading-none mb-1">{asset.balance > 0 ? asset.balance : '-'}</p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">≈ $0.00</p>
                   </div>
                 </Card>
               ))}
            </div>
          </div>
        </div>

        {/* Market Sidebar - Kosongan */}
        <div className="space-y-6">
          <Card className="p-8 border-none bg-white shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Market Activity</h3>
            <div className="py-10 text-center opacity-30 flex flex-col items-center">
               <div className="text-3xl mb-3">📡</div>
               <p className="text-[9px] font-black uppercase tracking-widest">Menunggu Aktivitas...</p>
            </div>
          </Card>

          {/* Yield Booster - Kosongan */}
          <Card className="p-8 border-none bg-indigo-50/10 shadow-none border border-indigo-50 relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl opacity-20">⚡</span>
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Yield Booster</p>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-medium mb-4 italic">Program staking akan segera hadir.</p>
             </div>
          </Card>
        </div>
      </div>
      
      <div className="h-10" />
    </div>
  );
};


import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Icons } from '../constants';
import { DigitalProduct } from '../types';

interface ProductDetailProps {
  product: DigitalProduct;
  isOwned: boolean;
  onBack: () => void;
  onBuy: () => void;
  onDelete: () => void;
  balance: number;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOwned, onBack, onBuy, onDelete, balance }) => {
  const canAfford = isOwned || balance >= product.price;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen lg:min-h-0 lg:bg-transparent animate-in fade-in duration-500">
      {/* Header - Sesuai Screenshot */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50 lg:border-none">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          <Icons.ArrowRight className="w-3.5 h-3.5 rotate-180" />
          Kembali ke Katalog
        </button>
        
        {product.author === 'Anda' && (
          <button 
            onClick={onDelete}
            className="flex items-center gap-1.5 text-[11px] font-black text-[#E11D48] hover:text-red-700 uppercase tracking-widest transition-colors"
          >
            <Icons.Trash className="w-3.5 h-3.5" />
            HAPUS PRODUK
          </button>
        )}
      </div>

      {/* Hero Image */}
      <div className="px-6 py-2">
        <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Details Container */}
      <div className="px-8 py-8 space-y-10 pb-20">
        <div className="space-y-4">
          <Badge label={product.category} variant="info" />
          
          <div>
            <h1 className="text-[7.5rem] font-black text-[#111827] leading-[0.8] tracking-tighter -ml-1">
              {product.name}
            </h1>
            <p className="text-xl text-gray-400 mt-6 font-medium">Oleh <span className="text-gray-900 font-bold">{product.author}</span></p>
          </div>

          <div className="flex items-center gap-1.5 pt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-xl text-yellow-400">★</span>
            ))}
            <span className="text-xs font-bold text-gray-300 ml-2">({product.rating}.0 Rating)</span>
          </div>
        </div>

        {/* Purchase Card - Sesuai Screenshot */}
        <div className="p-8 bg-gray-50/50 border border-gray-100/50 rounded-[2.5rem] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Harga Aset</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#111827]">
                {product.currency === 'USD' ? '$' : ''}{product.price}{product.currency !== 'USD' ? ' ' + product.currency : ''}
              </span>
            </div>
          </div>
          
          <Button 
            disabled={!canAfford && !isOwned}
            onClick={onBuy}
            className={`px-10 py-5 text-[13px] font-black rounded-2xl shadow-xl transition-all active:scale-95 ${
              isOwned 
                ? 'bg-green-500 text-white shadow-green-100 hover:bg-green-600' 
                : !canAfford 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-[#1D63D2] text-white shadow-blue-100 hover:bg-blue-700'
            }`}
          >
            {isOwned ? 'Milik Anda' : 'Beli Sekarang'}
          </Button>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-[#111827] tracking-tight">Tentang Produk Ini</h3>
          <p className="text-sm text-gray-400 leading-[1.8] font-medium max-w-lg">
            Produk digital berkualitas tinggi yang dirancang untuk mempercepat alur kerja Anda. 
            Termasuk dokumentasi lengkap, pembaruan seumur hidup, dan dukungan teknis.
          </p>
        </div>
      </div>
    </div>
  );
};

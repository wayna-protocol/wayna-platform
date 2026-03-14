
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../constants';
import { DigitalProduct } from '../types';

interface SellProductProps {
  onBack: () => void;
  onSubmit: (product: Partial<DigitalProduct>) => void;
}

export const SellProduct: React.FC<SellProductProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD' as 'USD' | 'WAFT' | 'USDT' | 'ETH' | 'SOL',
    category: 'Digital'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      price: Number(formData.price),
      currency: formData.currency,
      category: formData.category,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800',
      author: 'Anda'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <Icons.ArrowRight className="w-4 h-4 rotate-180" />
        Kembali
      </button>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">Jual Produk Digital</h1>
      <p className="text-gray-500 mb-10 text-lg">Dapatkan penghasilan dari karya Anda secara langsung dengan multi-currency support.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Nama Produk / Aset</label>
          <input
            required
            type="text"
            placeholder="Contoh: E-book Strategi AI 2024"
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Harga</label>
            <input
              required
              type="number"
              placeholder="Contoh: 50"
              className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Mata Uang</label>
            <select
              className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg appearance-none cursor-pointer font-bold"
              value={formData.currency}
              onChange={e => setFormData({ ...formData, currency: e.target.value as any })}
            >
              <option value="USD">USD ($) - Traditional</option>
              <option value="WAFT">WAFT (Token) - Ecosystem Native</option>
              <option value="USDT">USDT (Tether) - Stablecoin</option>
              <option value="ETH">ETH (Ethereum)</option>
              <option value="SOL">SOL (Solana)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Kategori</label>
          <input
            required
            type="text"
            placeholder="Contoh: Edukasi, Template, Software"
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          />
        </div>

        <Button className="w-full py-4 text-xl bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-100">Daftarkan Produk</Button>
      </form>
    </div>
  );
};

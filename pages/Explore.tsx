
import React, { useState, useMemo } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Page, Project, DigitalProduct } from '../types';
import { Icons } from '../constants';

interface ExploreProps {
  onNavigate: (page: Page, id?: string) => void;
  projects: Project[];
  products: DigitalProduct[];
  onDeleteProduct: (id: string) => void;
}

export const Explore: React.FC<ExploreProps> = ({ onNavigate, projects, products, onDeleteProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'products'>('projects');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 apple-shadow">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari ide, aset digital, atau kreator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
          </div>
        </div>

        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Proyek
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Aset Digital
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTab === 'projects' ? (
          filteredProjects.map(project => (
            <Card key={project.id} className="p-0 overflow-hidden border-none shadow-sm group hover:shadow-xl transition-all duration-500" onClick={() => onNavigate(Page.PROJECT_DETAIL, project.id)}>
              <div className="h-40 overflow-hidden">
                <img src={project.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
              </div>
              <div className="p-6">
                <h4 className="font-black text-gray-900 truncate mb-2 leading-tight group-hover:text-blue-600">{project.title}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Goal: ${project.goal.toLocaleString()}</p>
                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-600" style={{ width: `${Math.min((project.raised/project.goal)*100, 100)}%` }} />
                </div>
                <div className="flex justify-between items-center text-[9px] font-black text-gray-300 uppercase">
                  <span>{Math.round((project.raised/project.goal)*100)}% Funded</span>
                  <span>{project.daysLeft}d left</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          filteredProducts.map(product => (
            <Card key={product.id} className="p-0 overflow-hidden border-none shadow-sm group hover:shadow-xl transition-all duration-500 flex flex-col h-full relative" onClick={() => onNavigate(Page.PRODUCT_DETAIL, product.id)}>
              <div className="h-48 overflow-hidden bg-gray-100">
                <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
              </div>
              
              {product.author === 'Anda' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProduct(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 shadow-sm hover:bg-red-50 transition-colors z-10"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-2">
                   <Badge label={product.category} variant="info" />
                </div>
                <h4 className="font-black text-gray-900 mb-4 line-clamp-2 leading-tight flex-1">{product.name}</h4>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <p className={`text-lg font-black ${product.currency === 'WAFT' ? 'text-purple-600' : 'text-blue-600'}`}>
                    {product.currency === 'WAFT' ? `${product.price} WAFT` : `$${product.price}`}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-[10px] text-gray-400 font-black">{product.rating}.0</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Empty State */}
      {(activeTab === 'projects' ? filteredProjects : filteredProducts).length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center opacity-30 grayscale">
          <div className="text-6xl mb-6">🔍</div>
          <p className="font-black uppercase tracking-widest text-xs">Pencarian tidak ditemukan</p>
        </div>
      )}

      {/* Floating Action Section Desktop */}
      <div className="sticky bottom-10 flex justify-center mt-10">
        <div className="bg-white/80 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] apple-shadow-lg border border-white flex items-center gap-10">
          <div className="hidden md:block">
            <h4 className="text-sm font-black text-gray-900 leading-none">Siap untuk berkontribusi?</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Daftarkan karya Anda hari ini.</p>
          </div>
          <Button onClick={() => onNavigate(activeTab === 'projects' ? Page.CREATE_PROJECT : Page.SELL_PRODUCT)} className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
            {activeTab === 'projects' ? 'Buka Proyek Baru' : 'Jual Aset Digital'}
          </Button>
        </div>
      </div>
    </div>
  );
};

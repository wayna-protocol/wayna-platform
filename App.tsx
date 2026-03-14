
import React, { useState, useEffect } from 'react';
import { Page, Project, DigitalProduct } from './types';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { WriteEditor } from './pages/WriteEditor';
import { Onboarding } from './pages/Onboarding';
import { Explore } from './pages/Explore';
import { Rewards } from './pages/Rewards';
import { Profile } from './pages/Profile';
import { WAFT } from './pages/WAFT';
import { ProjectDetail } from './pages/ProjectDetail';
import { ProductDetail } from './pages/ProductDetail';
import { CreateProject } from './pages/CreateProject';
import { MyProjects } from './pages/MyProjects';
import { SellProduct } from './pages/SellProduct';
import { Settings } from './pages/Settings';
import { AIAssistant } from './components/AIAssistant';
import { Icons } from './constants';

const INITIAL_PROJECTS: Project[] = [];

const INITIAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'sample-k',
    name: 'K',
    price: 2,
    currency: 'USD',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    category: 'Digital',
    author: 'Anda',
    createdAt: Date.now()
  }
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.ONBOARDING);
  const [userName, setUserName] = useState('Senuma Jung');
  const [waftBalance, setWaftBalance] = useState(1000); 
  const [usdtBalance, setUsdtBalance] = useState(500);
  const [ethBalance, setEthBalance] = useState(1.5);
  const [solBalance, setSolBalance] = useState(10);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [products, setProducts] = useState<DigitalProduct[]>(INITIAL_PRODUCTS);
  const [purchasedProductIds, setPurchasedProductIds] = useState<string[]>([]);
  const [contributionHistory, setContributionHistory] = useState<any[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleNavigate = (page: Page, id?: string) => {
    if (id) setSelectedItemId(id);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage(Page.HOME);
  };

  const getBalanceForCurrency = (currency: string) => {
    switch (currency) {
      case 'WAFT': return waftBalance;
      case 'USDT': return usdtBalance;
      case 'USD': return 10000; // Mock USD balance
      default: return 0;
    }
  };

  const handleBuyProduct = (product: DigitalProduct) => {
    if (purchasedProductIds.includes(product.id)) {
      alert("Aset ini sudah ada di koleksi Anda.");
      return;
    }

    const currentBalance = getBalanceForCurrency(product.currency);
    if (currentBalance < product.price) {
      alert(`Maaf, saldo ${product.currency} Anda tidak mencukupi.`);
      return;
    }
    
    if (window.confirm(`Konfirmasi pembelian "${product.name}" seharga ${product.currency === 'USD' ? '$' : ''}${product.price} ${product.currency !== 'USD' ? product.currency : ''}?`)) {
      if (product.currency === 'WAFT') setWaftBalance(prev => prev - product.price);
      if (product.currency === 'USDT') setUsdtBalance(prev => prev - product.price);
      
      setPurchasedProductIds(prev => [...prev, product.id]);
      
      const newActivity = {
        activity: `Membeli Aset: ${product.name}`,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setContributionHistory([newActivity, ...contributionHistory]);
      alert(`Berhasil! "${product.name}" kini milik Anda.`);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Hapus produk ini secara permanen dari Wayna?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setPurchasedProductIds(prev => prev.filter(pid => pid !== id));
      setSelectedItemId(null);
      alert("Produk telah dihapus.");
      setCurrentPage(Page.EXPLORE);
    }
  };

  const handlePublishWrite = (title: string, wordCount: number) => {
    const newActivity = {
      activity: `Publikasi Karya: ${title} (${wordCount} kata)`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setContributionHistory([newActivity, ...contributionHistory]);
    alert(`"${title}" berhasil dipublikasikan ke ekosistem Wayna!`);
    handleNavigate(Page.HOME);
  };

  const renderPage = () => {
    if (currentPage === Page.ONBOARDING && !isLoggedIn) return <Onboarding onFinish={handleLoginSuccess} />;

    switch (currentPage) {
      case Page.HOME: return <Home onNavigate={handleNavigate} projects={projects} userName={userName} />;
      case Page.EXPLORE: return <Explore onNavigate={handleNavigate} projects={projects} products={products} onDeleteProduct={handleDeleteProduct} />;
      case Page.WRITE: return <WriteEditor onBack={() => handleNavigate(Page.HOME)} onPublish={handlePublishWrite} />;
      case Page.REWARDS: return <Rewards contributionHistory={contributionHistory} />;
      case Page.PROFILE: return <Profile supportedCount={purchasedProductIds.length} userName={userName} onNavigate={handleNavigate} />;
      case Page.WAFT: return <WAFT waftBalance={waftBalance} usdtBalance={usdtBalance} ethBalance={ethBalance} solBalance={solBalance} />;
      case Page.MY_PROJECTS: return <MyProjects onNavigate={handleNavigate} projects={projects} />;
      case Page.CREATE_PROJECT: return <CreateProject onBack={() => setCurrentPage(Page.HOME)} onSubmit={(p) => setProjects([{ ...p as Project, id: Date.now().toString() }, ...projects])} />;
      case Page.SELL_PRODUCT: return <SellProduct onBack={() => setCurrentPage(Page.EXPLORE)} onSubmit={(prod) => setProducts([{ ...prod as DigitalProduct, id: Date.now().toString() }, ...products])} />;
      case Page.PRODUCT_DETAIL:
        const product = products.find(p => p.id === selectedItemId);
        if (!product) return <Explore onNavigate={handleNavigate} projects={projects} products={products} onDeleteProduct={handleDeleteProduct} />;
        return (
          <ProductDetail 
            product={product} 
            isOwned={purchasedProductIds.includes(product.id)}
            balance={getBalanceForCurrency(product.currency)}
            onBack={() => setCurrentPage(Page.EXPLORE)} 
            onBuy={() => handleBuyProduct(product)} 
            onDelete={() => handleDeleteProduct(product.id)} 
          />
        );
      default: return <Home onNavigate={handleNavigate} projects={projects} userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900">
      {currentPage !== Page.ONBOARDING && (
        <Navbar activePage={currentPage} onNavigate={handleNavigate} waftBalance={waftBalance} userName={userName} />
      )}
      <main className={currentPage !== Page.ONBOARDING && currentPage !== Page.WRITE ? "max-w-7xl mx-auto pb-24 lg:pt-24" : ""}>
        {renderPage()}
      </main>
      {currentPage !== Page.ONBOARDING && <AIAssistant />}
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../constants';

interface SettingsProps {
  userName: string;
  onUpdateName: (name: string) => void;
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  walletAddress: string | null;
  onConnectWallet: (addr: string | null) => void;
}

const Section = ({ title, children, icon, isDarkMode }: { title: string, children?: React.ReactNode, icon: string, isDarkMode: boolean }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-4 px-1">
      <span className="text-xl">{icon}</span>
      <h3 className={`text-xs font-bold uppercase tracking-[0.15em] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{title}</h3>
    </div>
    <Card className={`divide-y p-0 overflow-hidden border-none shadow-sm ${isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-50'}`}>
      {children}
    </Card>
  </div>
);

const SettingRow = ({ label, children, description, isDarkMode, icon }: { label: string, children?: React.ReactNode, description?: string, isDarkMode: boolean, icon?: string }) => (
  <div className={`flex items-center justify-between p-5 transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'}`}>
    <div className="flex items-center gap-4 flex-1 pr-4">
      {icon && <span className="text-lg opacity-70">{icon}</span>}
      <div>
        <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
    </div>
    <div className="flex items-center">
      {children}
    </div>
  </div>
);

const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-all duration-300 relative ${active ? 'bg-blue-600' : 'bg-gray-300'}`}
  >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-6' : 'left-1'}`} />
  </button>
);

export const Settings: React.FC<SettingsProps> = ({ 
  userName, 
  onUpdateName, 
  onBack,
  isDarkMode,
  onToggleDarkMode,
  language,
  onLanguageChange,
  walletAddress,
  onConnectWallet
}) => {
  const [name, setName] = useState(userName);
  const [bio, setBio] = useState('Kreator digital di ekosistem WAYNA.');
  const [isSaved, setIsSaved] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [network, setNetwork] = useState('Mainnet');
  const [anonymousMode, setAnonymousMode] = useState(false);

  const handleSave = () => {
    onUpdateName(name);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const simulateConnectWallet = (type: 'Metamask' | 'Trust') => {
    if (walletAddress) {
      onConnectWallet(null);
      return;
    }
    setIsConnecting(true);
    setTimeout(() => {
      onConnectWallet(type === 'Metamask' ? '0x71C...3A92' : '0xBC2...1F44');
      setIsConnecting(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition-colors font-medium">
          <Icons.ArrowRight className="w-4 h-4 rotate-180" />
          Kembali
        </button>
        <div className="flex-1 ml-6">
          <h1 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pengaturan</h1>
          <p className="text-gray-500 text-sm">Sesuaikan pengalaman dan keamanan Anda.</p>
        </div>
        <Button 
          variant={isSaved ? 'secondary' : 'primary'} 
          onClick={handleSave}
          className={isSaved ? 'bg-green-50 text-green-600 border-green-100' : 'shadow-lg shadow-blue-100'}
        >
          {isSaved ? '✓ Tersimpan' : 'Simpan'}
        </Button>
      </div>

      <Section title="Tampilan & Preferensi" icon="🎨" isDarkMode={isDarkMode}>
        <SettingRow label="Mode Gelap" description="Tema visual gelap untuk kenyamanan mata" isDarkMode={isDarkMode} icon="🌙">
          <Toggle active={isDarkMode} onToggle={onToggleDarkMode} />
        </SettingRow>
        <SettingRow label="Bahasa" description="Pilih bahasa antarmuka aplikasi" isDarkMode={isDarkMode} icon="🌐">
          <select 
            className={`bg-transparent font-bold text-sm outline-none cursor-pointer ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="id">🇮🇩 Bahasa Indonesia</option>
            <option value="en">🇺🇸 English (US)</option>
            <option value="jp">🇯🇵 日本語</option>
          </select>
        </SettingRow>
      </Section>

      <Section title="Dompet & Web3" icon="👛" isDarkMode={isDarkMode}>
        <SettingRow label="Status Koneksi" description={walletAddress ? `Terkoneksi ke ${walletAddress}` : "Belum ada dompet terhubung"} isDarkMode={isDarkMode} icon="🔗">
          <div className={`w-2 h-2 rounded-full ${walletAddress ? 'bg-green-500 shadow-sm shadow-green-200' : 'bg-gray-300'}`} />
        </SettingRow>
        
        {!walletAddress ? (
          <div className="p-5 grid grid-cols-2 gap-4">
            <button 
              disabled={isConnecting}
              onClick={() => simulateConnectWallet('Metamask')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Moon_Wallpaper.png" className="w-8 h-8 object-contain rounded-lg" alt="Metamask" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Metamask</span>
            </button>
            <button 
              disabled={isConnecting}
              onClick={() => simulateConnectWallet('Trust')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              <img src="https://trustwallet.com/assets/images/media/assets/trust_platform.png" className="w-8 h-8 object-contain rounded-lg" alt="Trust" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Trust Wallet</span>
            </button>
          </div>
        ) : (
          <>
            <SettingRow label="Jaringan" isDarkMode={isDarkMode} icon="🕸️">
              <select 
                className={`bg-transparent font-bold text-xs outline-none cursor-pointer ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option>Mainnet (Ethereum)</option>
                <option>WAYNA Chain (Testnet)</option>
                <option>Polygon</option>
              </select>
            </SettingRow>
            <div className="p-5">
              <button 
                onClick={() => onConnectWallet(null)}
                className="w-full py-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
              >
                Putuskan Koneksi Dompet
              </button>
            </div>
          </>
        )}
      </Section>

      <Section title="Privasi & Keamanan" icon="🛡️" isDarkMode={isDarkMode}>
        <SettingRow label="Dukungan Anonim" description="Sembunyikan nama Anda dari publik saat mendanai proyek" isDarkMode={isDarkMode} icon="🕵️">
          <Toggle active={anonymousMode} onToggle={() => setAnonymousMode(!anonymousMode)} />
        </SettingRow>
        <SettingRow label="Kunci Biometrik" description="Gunakan FaceID/Fingerprint untuk transaksi" isDarkMode={isDarkMode} icon="🔐">
          <Toggle active={true} onToggle={() => {}} />
        </SettingRow>
        <SettingRow label="Cadangkan Frasa (Seed)" description="Pastikan dompet Anda aman di luar aplikasi" isDarkMode={isDarkMode} icon="📝">
          <button className="text-xs font-bold text-blue-600 hover:underline">Lihat</button>
        </SettingRow>
      </Section>

      <Section title="Profil Kreator" icon="👤" isDarkMode={isDarkMode}>
        <SettingRow label="Nama Publik" isDarkMode={isDarkMode}>
          <input 
            type="text" 
            className={`text-right bg-transparent outline-none font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </SettingRow>
        <SettingRow label="Bio" description="Maksimal 100 karakter" isDarkMode={isDarkMode}>
          <input 
            type="text" 
            className="text-right bg-transparent outline-none text-gray-500 text-xs w-64"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </SettingRow>
      </Section>

      <div className="mt-12 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">𝕏</div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">🌐</div>
        </div>
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">WAYNA INTELLIGENT v1.2.0-STABLE • POWERED BY GEMINI AI</p>
      </div>
    </div>
  );
};

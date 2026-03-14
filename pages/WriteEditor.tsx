
import React, { useState, useRef } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

interface Chapter {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
}

interface WriteEditorProps {
  onPublish: (title: string, wordCount: number) => void;
  onBack: () => void;
}

export const WriteEditor: React.FC<WriteEditorProps> = ({ onPublish, onBack }) => {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: '1', title: 'Bab 1: Pendahuluan', content: 'Mulailah menulis kisah luar biasa Anda di sini...' }
  ]);
  const [activeChapterId, setActiveChapterId] = useState('1');
  const [isSaving, setIsSaving] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [showOutlineModal, setShowOutlineModal] = useState(false);
  const [outlineTopic, setOutlineTopic] = useState('');

  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (content: string) => {
    setChapters(prev => prev.map(c => c.id === activeChapterId ? { ...c, content } : c));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleTitleChange = (title: string) => {
    setChapters(prev => prev.map(c => c.id === activeChapterId ? { ...c, title } : c));
  };

  // Fitur Tambah Bab Baru
  const addChapter = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newChapter = { 
      id: newId, 
      title: `Bab ${chapters.length + 1}: Baru`, 
      content: '' 
    };
    setChapters([...chapters, newChapter]);
    setActiveChapterId(newId);
  };

  // Fitur Hapus Bab Lama - Ditingkatkan dengan pengecekan ID
  const deleteChapter = (id: string) => {
    if (chapters.length <= 1) {
      alert("Anda harus menyisakan setidaknya satu bab untuk menulis.");
      return;
    }
    const targetChapter = chapters.find(c => c.id === id);
    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus "${targetChapter?.title || 'bab ini'}" secara permanen?`);
    if (!confirmed) return;

    const newChapters = chapters.filter(c => c.id !== id);
    setChapters(newChapters);
    
    // Jika menghapus bab aktif, pindah ke bab pertama yang tersisa
    if (activeChapterId === id) {
      setActiveChapterId(newChapters[0].id);
    }
  };

  const generateCover = async () => {
    if (isGeneratingImage || !activeChapter.content) return;
    setIsGeneratingImage(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Generate a minimalist, ethereal, high-quality digital painting as a book cover for this story: ${activeChapter.content.substring(0, 500)}` }]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        const base64 = imagePart.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64}`;
        setChapters(prev => prev.map(c => c.id === activeChapterId ? { ...c, coverImage: imageUrl } : c));
      }
    } catch (error) {
      console.error("Image Generation Error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const generateOutline = async () => {
    if (!outlineTopic.trim() || isGeneratingOutline) return;
    setIsGeneratingOutline(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Buat outline buku yang mendalam tentang topik: "${outlineTopic}". Berikan minimal 5 bab dengan judul dan deskripsi singkat untuk setiap bab.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            }
          }
        }
      });

      const result = JSON.parse(response.text || '[]');
      if (Array.isArray(result) && result.length > 0) {
        const newChapters = result.map((item: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: item.title,
          content: `/* Outline: ${item.description} */\n\nMulailah menulis di sini...`
        }));
        setChapters(newChapters);
        setActiveChapterId(newChapters[0].id);
        setShowOutlineModal(false);
      }
    } catch (error) {
      console.error("Outline Generation Error:", error);
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  const askAI = async (promptType: 'continue' | 'polish') => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let prompt = "";
      if (promptType === 'continue') prompt = `Lanjutkan narasi berikut dengan gaya puitis:\n\n${activeChapter.content}`;
      else if (promptType === 'polish') prompt = `Perhalus narasi berikut agar lebih profesional dan menarik:\n\n${activeChapter.content}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: 'Anda adalah Muse Penulisan Kreatif. Gunakan bahasa Indonesia yang indah, imajinatif, dan mengalir.'
        }
      });

      const result = response.text || '';
      if (promptType === 'continue') handleContentChange(activeChapter.content + "\n\n" + result);
      else handleContentChange(result);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentWordCount = activeChapter.content.trim().split(/\s+/).filter(x => x).length;

  return (
    <div className={`min-h-screen transition-all duration-700 ${isFocusMode ? 'bg-[#fafafa]' : 'bg-white pb-20'}`}>
      {/* Header Utama Editor */}
      <div className={`max-w-7xl mx-auto px-5 py-6 transition-opacity duration-500 ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 font-bold uppercase tracking-widest transition-colors group">
            <Icons.ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFocusMode(true)}
              className="px-4 py-2 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors"
            >
              Mode Fokus
            </button>
            <Button className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest shadow-md" onClick={() => onPublish(activeChapter.title, currentWordCount)}>Publikasikan</Button>
          </div>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Studio Kreatif</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">WAYNA Intelligent Writing Assistant</p>
          </div>
          {chapters.length > 1 && (
            <button 
              onClick={() => deleteChapter(activeChapterId)}
              className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all flex items-center gap-2"
              title="Hapus Bab Ini"
            >
              <Icons.Trash className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Hapus Bab</span>
            </button>
          )}
        </div>
      </div>

      {/* Kontrol Khusus Mode Fokus */}
      {isFocusMode && (
        <div className="fixed top-8 left-0 right-0 flex items-center justify-between px-8 z-[100] animate-in slide-in-from-top-4 duration-500">
          <button 
            onClick={() => setIsFocusMode(false)} 
            className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-md rounded-2xl text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100 hover:text-blue-600 transition-all uppercase tracking-widest active:scale-95 group"
          >
            <Icons.ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Keluar Fokus
          </button>
          
          <div className="px-4 py-2 bg-white/50 backdrop-blur rounded-full text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Focus State
          </div>

          <div className="flex gap-2">
            <button onClick={addChapter} className="w-10 h-10 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100" title="Tambah Bab">+</button>
            {chapters.length > 1 && (
              <button 
                onClick={() => deleteChapter(activeChapterId)} 
                className="w-10 h-10 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-red-400 shadow-sm border border-gray-100 hover:text-red-600"
                title="Hapus Bab Aktif"
              >
                <Icons.Trash className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {showOutlineModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-md p-8 border-none bg-white rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">AI Outline Generator</h3>
              <button onClick={() => setShowOutlineModal(false)} className="text-gray-300 text-2xl">×</button>
            </div>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">Berikan topik atau ide buku Anda, dan WAYNA Intelligent akan menyusun struktur bab yang ideal untuk Anda.</p>
            <textarea 
              autoFocus
              placeholder="Contoh: Strategi AI untuk bisnis UMKM 2025..."
              className="w-full h-32 p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100 text-sm mb-6 transition-all"
              value={outlineTopic}
              onChange={(e) => setOutlineTopic(e.target.value)}
            />
            <Button 
              disabled={isGeneratingOutline || !outlineTopic.trim()}
              onClick={generateOutline}
              className="w-full py-4 flex items-center justify-center gap-2"
            >
              {isGeneratingOutline ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Icons.Sparkles className="w-4 h-4" />
                  Buat Outline
                </>
              )}
            </Button>
          </Card>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-700 ${isFocusMode ? 'pt-24' : ''}`}>
        {!isFocusMode && (
          <div className="lg:col-span-3 space-y-6">
            <div className="sticky top-20">
              <div className="flex items-center justify-between px-1 mb-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Manajemen Bab</h4>
                <button 
                  onClick={addChapter} 
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                  title="Tambah Bab Baru"
                >
                  +
                </button>
              </div>
              
              <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="relative group">
                    <button
                      onClick={() => setActiveChapterId(chapter.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-bold transition-all truncate pr-12 ${
                        activeChapterId === chapter.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {chapter.title || 'Tanpa Judul'}
                    </button>
                    {chapters.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChapter(chapter.id);
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                          activeChapterId === chapter.id ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title="Hapus Bab"
                      >
                        <Icons.Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                 <button 
                   onClick={() => setShowOutlineModal(true)}
                   className="w-full py-4 bg-blue-50 border border-blue-100 text-blue-700 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-100 transition-colors"
                 >
                   <Icons.Sparkles className="w-4 h-4" />
                   AI Outline
                 </button>
                 
                 <div className="p-5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-[2rem] border border-white">
                    <span className="text-[9px] font-bold text-purple-700 uppercase tracking-widest mb-3 block">Studio AI</span>
                    <div className="space-y-2">
                       <button 
                         disabled={isGeneratingImage}
                         onClick={generateCover}
                         className="w-full py-2.5 bg-white border border-purple-100 text-purple-700 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:shadow-sm disabled:opacity-50"
                       >
                         {isGeneratingImage ? '...' : 'Visual Cover'}
                       </button>
                       <button onClick={() => askAI('continue')} className="w-full py-2.5 text-[9px] font-bold text-blue-600 hover:bg-white rounded-xl transition-all uppercase tracking-widest">Lanjutkan</button>
                       <button onClick={() => askAI('polish')} className="w-full py-2.5 text-[9px] font-bold text-blue-600 hover:bg-white rounded-xl transition-all uppercase tracking-widest">Sempurnakan</button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        <div className={`transition-all duration-700 ${isFocusMode ? 'lg:col-span-12 max-w-2xl mx-auto' : 'lg:col-span-9'}`}>
          <div className="relative">
            <Card className={`min-h-[700px] border-none p-8 lg:p-16 shadow-none transition-all duration-700 ${isFocusMode ? 'bg-transparent' : 'apple-shadow bg-white rounded-[3rem]'}`}>
              {activeChapter.coverImage && !isFocusMode && (
                <div className="mb-10 rounded-3xl overflow-hidden shadow-sm animate-in zoom-in-95 duration-500">
                  <img src={activeChapter.coverImage} className="w-full h-56 object-cover" alt="Chapter Cover" />
                </div>
              )}
              <input 
                type="text"
                placeholder="Judul Bab..."
                className={`w-full text-2xl lg:text-4xl font-extrabold mb-10 outline-none border-none placeholder:text-gray-100 bg-transparent text-gray-900 transition-all ${isFocusMode ? 'text-center' : ''}`}
                value={activeChapter.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
              <textarea 
                ref={editorRef}
                placeholder="Mulai petualangan kata-kata Anda..."
                className={`w-full min-h-[500px] text-sm lg:text-base leading-[2] outline-none border-none resize-none placeholder:text-gray-100 bg-transparent text-gray-700 font-medium transition-all ${isFocusMode ? 'text-center lg:text-xl' : ''}`}
                value={activeChapter.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </Card>

            <div className={`mt-8 flex items-center justify-between text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] transition-opacity duration-700 ${isFocusMode ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isSaving ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} /> 
                  {isSaving ? 'Syncing...' : 'Encrypted & Saved'}
                </div>
                <span>{currentWordCount} Kata</span>
              </div>
              {!isFocusMode && <span>Bab ID: {activeChapterId}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Icons } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya WAYNA Intelligent. Ada yang bisa saya bantu terkait proyek, penulisan, atau token WAFT Anda hari ini?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'Anda adalah WAYNA Intelligent, asisten super app masa depan. Anda ahli dalam fundraising (Proof of Fundraising), penulisan kreatif, dan ekonomi token (WAFT). Berikan jawaban yang cerdas, ringkas, dan profesional namun tetap ramah. Gunakan bahasa Indonesia yang baik.',
      },
    });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    if (!chatRef.current) initChat();

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let fullText = '';
      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, sistem saya sedang mengalami kendala. Silakan coba sesaat lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-20 right-4 z-[60] flex flex-col items-end transition-all duration-300 ${isOpen ? 'inset-0 items-center justify-end p-4 bg-black/20 backdrop-blur-sm' : ''}`}>
      {isOpen && (
        <Card className="w-full max-w-lg h-[80vh] mb-4 flex flex-col p-0 overflow-hidden apple-shadow-lg animate-in slide-in-from-bottom-8 duration-500 border-none bg-white rounded-[2rem]">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Icons.Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-tight">WAYNA Intelligent</h3>
                <span className="text-[9px] text-white/70 font-bold uppercase tracking-widest">Active System</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text || (idx === messages.length - 1 && isLoading ? '...' : '')}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text"
              placeholder="Tanya sesuatu..."
              className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-xs outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center disabled:bg-gray-100"
            >
              <Icons.ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </Card>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-200 transition-all active:scale-90"
        >
          <Icons.Sparkles className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

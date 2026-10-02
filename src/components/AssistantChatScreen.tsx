import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  Shirt,
  Info,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, User, OutfitItem } from '../types';

interface AssistantChatScreenProps {
  user: User;
  chatHistory: ChatMessage[];
  onSendMessage: (msgText: string) => Promise<void>;
  onSelectTab: (tab: string) => void;
  onSelectProduct: (product: OutfitItem) => void;
}

export const AssistantChatScreen: React.FC<AssistantChatScreenProps> = ({
  user,
  chatHistory,
  onSendMessage,
  onSelectTab,
  onSelectProduct
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const textToSend = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      await onSendMessage(textToSend);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (chipText: string) => {
    if (chipText.toLowerCase().includes('avatar')) {
      onSelectTab('tryon');
    } else if (chipText.toLowerCase().includes('designer')) {
      onSelectTab('marketplace');
    } else {
      setInputText(chipText);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <Bot className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>AURA AI • SERVER-SIDE STYLIST ENGINE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Conversational Atelier
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed font-sans">
            Powered by Gemini 3.6 Flash. Synthesizes haute couture heritage rules, skin undertone science, and event dress code etiquette.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-[#E2D1B3] animate-pulse" />
          <span>GEMINI 3.6 FLASH ACTIVE</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-4 md:p-6 shadow-none flex flex-col h-[620px]">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
          {chatHistory.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 text-xs font-bold border border-[#1A1A1A] ${
                  isUser
                    ? 'bg-[#E2D1B3] text-[#1A1A1A]'
                    : 'bg-[#1A1A1A] text-[#F9F7F2]'
                }`}>
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble & Cards */}
                <div className={`space-y-3 max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 border text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#F3EFE6] border-[#1A1A1A] text-[#1A1A1A]'
                      : 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  }`}>
                    <p className="font-sans">{msg.text}</p>

                    {/* Style Rationale Note if present */}
                    {msg.styleRationale && (
                      <div className="mt-3 pt-3 border-t border-white/20 text-xs text-[#E2D1B3] flex items-start space-x-2">
                        <Info className="w-3.5 h-3.5 text-[#E2D1B3] shrink-0 mt-0.5" />
                        <span className="italic font-serif">{msg.styleRationale}</span>
                      </div>
                    )}
                  </div>

                  {/* Suggested Outfit Items Carousel / Cards */}
                  {!isUser && msg.suggestedItems && msg.suggestedItems.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {msg.suggestedItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onSelectProduct(item)}
                          className="bg-[#F9F7F2] border border-[#1A1A1A]/30 hover:border-[#1A1A1A] p-3 transition-all cursor-pointer flex items-center space-x-3 group"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 border border-[#1A1A1A] object-cover"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-semibold block">{item.brand}</span>
                            <h5 className="font-serif italic font-bold text-xs text-[#1A1A1A] group-hover:underline truncate">{item.name}</h5>
                            <span className="text-xs font-serif font-bold text-[#1A1A1A]">${item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {!isUser && msg.suggestionChips && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.suggestionChips.map((chip, i) => (
                        <button
                          key={i}
                          onClick={() => handleChipClick(chip)}
                          className="bg-[#F3EFE6] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] border border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 transition-all flex items-center space-x-1"
                        >
                          <span>{chip}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-[#1A1A1A]/50 font-mono block px-1">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-3 text-xs text-[#1A1A1A] font-mono bg-[#F3EFE6] p-3 border border-[#1A1A1A] w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-[#1A1A1A]" />
              <span>Aura AI is calculating style undertones & crafting sartorial guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-[#1A1A1A] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Aura AI for event dress codes, color pairings, or bespoke recommendations..."
            className="flex-1 bg-[#F9F7F2] border border-[#1A1A1A] focus:border-[#1A1A1A] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/50 outline-none font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] disabled:opacity-50 font-semibold px-6 py-3 border border-[#1A1A1A] text-xs transition-colors uppercase tracking-[0.15em] flex items-center space-x-2"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

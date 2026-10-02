import React, { useState } from 'react';
import {
  Sparkles,
  Shirt,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Bot,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { User, EventFocus, ColorPalette, PostureProfile, OutfitItem } from '../types';

interface DashboardScreenProps {
  user: User;
  eventFocus: EventFocus;
  colorPalette: ColorPalette;
  posture: PostureProfile;
  wardrobe: OutfitItem[];
  onSelectTab: (tab: string) => void;
  onSelectProduct: (product: OutfitItem) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  eventFocus,
  colorPalette,
  posture,
  wardrobe,
  onSelectTab,
  onSelectProduct
}) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Primary Curated Look
  const primaryGown = wardrobe[0];
  const secondaryShoes = wardrobe[1];
  const tertiaryAccessory = wardrobe[2];

  const totalCost = (primaryGown?.price || 0) + (secondaryShoes?.price || 0) + (tertiaryAccessory?.price || 0);

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Hero Statement & Wardrobe Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-[#1A1A1A] pb-10">
        {/* Left Column: Stats & Active Job */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-r border-[#1A1A1A]/15 lg:pr-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 mb-6">
              Wardrobe Analytics
            </p>
            <div className="space-y-5">
              <div className="flex justify-between items-end border-b border-[#1A1A1A]/10 pb-2">
                <span className="font-serif italic text-4xl font-bold text-[#1A1A1A]">42</span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#1A1A1A]/70 pb-1">Items Cataloged</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#1A1A1A]/10 pb-2">
                <span className="font-serif italic text-4xl font-bold text-[#1A1A1A]">12</span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#1A1A1A]/70 pb-1">AI Pairings</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#1A1A1A]/10 pb-2">
                <span className="font-serif italic text-4xl font-bold text-[#1A1A1A]">04</span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#1A1A1A]/70 pb-1">Atelier Proposals</span>
              </div>
            </div>
          </div>

          {/* Active AI Job Card */}
          <div className="bg-[#1A1A1A] text-[#F9F7F2] p-6 rounded-none border border-[#1A1A1A] space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#E2D1B3]">Active AI Engine</p>
              <span className="w-2 h-2 rounded-full bg-[#E2D1B3] animate-pulse" />
            </div>
            <h3 className="font-serif text-xl leading-tight font-medium">Virtual Fitting: {primaryGown?.name || 'Curated Ensemble'}</h3>
            <div className="w-full bg-white/20 h-[2px] my-3">
              <div className="bg-[#E2D1B3] h-full w-[85%]" />
            </div>
            <p className="text-[11px] text-[#F9F7F2]/70 font-mono">3D Mesh aligned to 4.2° shoulder posture & {colorPalette.analyzedSkinTone} skin undertones.</p>
          </div>
        </div>

        {/* Center/Right Column: Giant Editorial Hero Title */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>SARTORIAL VISION • TUSCANY COLLECTION</span>
            </div>

            <h1 className="text-[56px] sm:text-[84px] md:text-[100px] leading-[0.82] font-serif tracking-tighter text-[#1A1A1A]">
              The New <br />
              <span className="italic ml-8 sm:ml-16 font-bold">Standard</span>
            </h1>

            <p className="mt-6 text-sm text-[#1A1A1A]/80 max-w-xl leading-relaxed font-sans">
              Welcome back, <span className="font-semibold text-[#1A1A1A]">{user.name}</span>. Your personalized AI stylist has synthesized your biometric posture keypoints and warm skin undertones for <span className="underline decoration-[#E2D1B3] underline-offset-4">{eventFocus.title}</span>.
            </p>
          </div>

          {/* Biometric Badges */}
          <div className="flex flex-wrap gap-4 pt-8">
            <div className="bg-[#F3EFE6] border border-[#1A1A1A] p-4 flex-1 min-w-[200px] flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/60 block mb-1">
                  COMPLEXION UNDERTONE
                </span>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#fce3c7] border border-[#1A1A1A]" />
                  <span className="font-serif italic font-bold text-[#1A1A1A] text-lg">{colorPalette.analyzedSkinTone}</span>
                </div>
              </div>
              <button
                onClick={() => onSelectTab('scan')}
                className="bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[9px] uppercase font-bold tracking-[0.15em] px-3 py-1.5 border border-[#1A1A1A] transition-colors"
              >
                Face Scan →
              </button>
            </div>

            <div className="bg-[#F3EFE6] border border-[#1A1A1A] p-4 flex-1 min-w-[200px]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/60 block mb-1">
                POSTURE ALIGNMENT
              </span>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1A1A1A]" />
                <span className="font-serif italic font-bold text-[#1A1A1A] text-lg">4.2° Shoulder Tilt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Event Banner */}
      <div className="bg-[#F3EFE6] border border-[#1A1A1A] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] uppercase font-semibold tracking-[0.25em] text-[#1A1A1A]/70">
            <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>EVENT DESTINATION • {eventFocus.date}</span>
          </div>
          <h2 className="text-3xl font-serif italic font-bold text-[#1A1A1A] tracking-tight">
            {eventFocus.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#1A1A1A]/80 pt-1">
            <span className="flex items-center space-x-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>{eventFocus.location}</span>
            </span>
            <span className="bg-[#E2D1B3] text-[#1A1A1A] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest border border-[#1A1A1A]/30">
              Dress Code: {eventFocus.dressCode}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectTab('chat')}
            className="bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs px-5 py-3 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-2"
          >
            <Bot className="w-4 h-4" />
            <span>Consult Aura AI</span>
          </button>
          <button
            onClick={() => onSelectTab('tryon')}
            className="bg-[#F9F7F2] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-[#1A1A1A] font-semibold text-xs px-5 py-3 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-2"
          >
            <Shirt className="w-4 h-4" />
            <span>3D Avatar View</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-4">
        <div>
          <h3 className="text-2xl font-serif italic font-bold text-[#1A1A1A]">Curated Seasonal Pairings</h3>
          <p className="text-xs text-[#1A1A1A]/60">Harmonized according to spectral warmth and architectural draping.</p>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {['All', 'Evening', 'Daytime', 'Avant-Garde', 'Tailored'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all border ${
                activeFilter === filter
                  ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  : 'bg-[#F9F7F2] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Recommended Ensemble */}
      <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/15 pb-4 gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-[#E2D1B3] text-[#1A1A1A] border border-[#1A1A1A] px-2.5 py-0.5">
                RECOMMENDATION 01
              </span>
              <span className="text-xs font-serif italic font-bold text-[#1A1A1A]">99.4% Match Score</span>
            </div>
            <h4 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">The Emerald & Antique Gold Ensemble</h4>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-semibold block">Total Valuation</span>
              <span className="text-2xl font-serif italic font-bold text-[#1A1A1A]">${totalCost.toLocaleString()}</span>
            </div>
            <button
              onClick={() => onSelectTab('tryon')}
              className="bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs px-5 py-3 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-2"
            >
              <Shirt className="w-4 h-4" />
              <span>Simulate 3D Fit</span>
            </button>
          </div>
        </div>

        {/* 3 Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[primaryGown, secondaryShoes, tertiaryAccessory].map((item, idx) => {
            if (!item) return null;
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="group bg-[#F9F7F2] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] p-4 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] bg-[#E2D1B3]/30 overflow-hidden mb-3 border border-[#1A1A1A]/10">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-semibold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F9F7F2] px-2 py-0.5">
                      0{idx + 1} • {item.roleBadge || 'Look Element'}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/50 block">{item.brand}</span>
                  <h5 className="font-serif italic text-xl font-bold text-[#1A1A1A] group-hover:underline">
                    {item.name}
                  </h5>
                  <p className="text-xs text-[#1A1A1A]/70 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1A1A1A]/15 flex items-center justify-between text-xs">
                  <span className="font-serif italic font-bold text-lg text-[#1A1A1A]">${item.price}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A] flex items-center">
                    Stockists <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Rationale Box */}
        <div className="bg-[#F3EFE6] border border-[#1A1A1A] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <Info className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
              <strong className="text-[#1A1A1A] uppercase tracking-wider text-[11px]">Atelier Rationale:</strong> Deep emerald silk enhances your warm skin undertone, while bias-cut tailoring offsets 4.2° shoulder alignment gracefully.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('marketplace')}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:opacity-75 whitespace-nowrap"
          >
            Order Tailor Fitting →
          </button>
        </div>
      </div>

      {/* Secondary Collection Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2">
          <h4 className="text-xl font-serif italic font-bold text-[#1A1A1A]">Alternative Catalog Options</h4>
          <button
            onClick={() => onSelectTab('tryon')}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:opacity-75"
          >
            Open 3D Studio →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wardrobe.slice(3, 7).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="bg-[#FFFFFF] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] p-3 transition-all cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden bg-[#F3EFE6] mb-3 border border-[#1A1A1A]/10">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-semibold block">{item.brand}</span>
              <h5 className="font-serif italic font-bold text-[#1A1A1A] text-base group-hover:underline truncate">{item.name}</h5>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A1A1A]/10">
                <span className="font-serif italic text-base font-bold text-[#1A1A1A]">${item.price}</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold bg-[#E2D1B3] text-[#1A1A1A] px-2 py-0.5 border border-[#1A1A1A]/20">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

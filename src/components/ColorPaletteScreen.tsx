import React from 'react';
import { Palette, Sparkles, Droplets, Waves, Layers, BookOpen, ChevronRight, Check } from 'lucide-react';
import { ColorPalette } from '../types';

interface ColorPaletteScreenProps {
  colorPalette: ColorPalette;
  onSelectTab: (tab: string) => void;
}

export const ColorPaletteScreen: React.FC<ColorPaletteScreenProps> = ({
  colorPalette,
  onSelectTab
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <Palette className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>SPECTRAL UNDERTONE ANALYSIS • COLORIMETRY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Signature Palette & Textiles
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed">
            Formulated using high-definition undertone reflectance. Curated specifically for warm golden tones and Mediterranean light.
          </p>
        </div>

        <div className="bg-[#F3EFE6] border border-[#1A1A1A] p-4 text-xs flex flex-col justify-between space-y-2">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/60 block mb-1">
              CLASSIFICATION
            </span>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full bg-[#fce3c7] border border-[#1A1A1A]" />
              <span className="font-serif italic font-bold text-[#1A1A1A] text-xl">{colorPalette.analyzedSkinTone}</span>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('scan')}
            className="bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[9px] uppercase font-bold tracking-[0.15em] px-3 py-1.5 border border-[#1A1A1A] transition-colors w-fit"
          >
            New Face Scan →
          </button>
        </div>
      </div>

      {/* Color Swatches Grid */}
      <div className="space-y-4">
        <div className="border-b border-[#1A1A1A]/15 pb-2">
          <h3 className="text-2xl font-serif italic font-bold text-[#1A1A1A]">Harmonious Color Spectrum</h3>
          <p className="text-xs text-[#1A1A1A]/60">{colorPalette.rationale}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {colorPalette.curatedTones.map((tone, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#1A1A1A] p-5 space-y-4 hover:border-[#1A1A1A] transition-all group"
            >
              <div
                className="w-full h-32 border border-[#1A1A1A] relative flex items-end p-3"
                style={{ backgroundColor: tone.hex }}
              >
                <span className="bg-[#1A1A1A] text-[#F9F7F2] font-mono text-xs px-2.5 py-1 font-bold">
                  {tone.hex}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#1A1A1A]/50 block">
                  {tone.role}
                </span>
                <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xl group-hover:underline">
                  {tone.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fabric & Pattern Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fabric Recommendations */}
        <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#1A1A1A]/15 pb-3">
            <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
            <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xl">Recommended Drapery & Weaves</h4>
          </div>

          <div className="space-y-3">
            {colorPalette.fabricRecommendations.map((fab, i) => (
              <div key={i} className="bg-[#F3EFE6] p-4 border border-[#1A1A1A] space-y-1">
                <h5 className="font-serif italic font-bold text-[#1A1A1A] text-base">{fab.title}</h5>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">{fab.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Geometry */}
        <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#1A1A1A]/15 pb-3">
            <Layers className="w-4 h-4 text-[#1A1A1A]" />
            <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xl">Pattern Geometry & Lines</h4>
          </div>

          <div className="space-y-3">
            {colorPalette.patternGeometry.map((pat, i) => (
              <div key={i} className="bg-[#F3EFE6] p-4 border border-[#1A1A1A] space-y-1">
                <h5 className="font-serif italic font-bold text-[#1A1A1A] text-base">{pat.title}</h5>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">{pat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lookbook Gallery */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2">
          <h3 className="text-2xl font-serif italic font-bold text-[#1A1A1A]">Seasonal Lookbook Archive</h3>
          <button
            onClick={() => onSelectTab('dashboard')}
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A] hover:opacity-75"
          >
            Apply to Outfits →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorPalette.lookbook.map((look) => (
            <div key={look.id} className="bg-[#FFFFFF] border border-[#1A1A1A] overflow-hidden group">
              <div className="aspect-[16/9] bg-[#F3EFE6] overflow-hidden border-b border-[#1A1A1A]">
                <img
                  src={look.imageUrl}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 block">{look.label}</span>
                  <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xl">{look.title}</h4>
                </div>
                <button
                  onClick={() => onSelectTab('tryon')}
                  className="bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs px-4 py-2.5 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-1"
                >
                  <span>Simulate Look</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

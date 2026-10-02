import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Calendar,
  Layers,
  Palette,
  Check,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  MessageSquare,
  ArrowRight,
  Filter
} from 'lucide-react';
import { EventFocus, ColorPalette } from '../types';

export interface StyleFilterRequirements {
  occasion: string;
  patternType: string;
  colorPreference: string;
  customColorHex?: string;
}

interface StyleToolbarProps {
  currentRequirements: StyleFilterRequirements;
  onApplyRequirements: (reqs: StyleFilterRequirements) => void;
  onConsultAura: (reqs: StyleFilterRequirements) => void;
  onResetRequirements: () => void;
}

const occasionOptions = [
  'Tuscany Sunset Gala & Black Tie',
  'Riviera Cocktail & Apertivo',
  'Mediterranean Estate Wedding',
  'Milan Business & Executive Summit',
  'Avant-Garde Runway & Gallery Opening',
  'Resort Yacht & Amalfi Daywear'
];

const patternOptions = [
  'Solid Silk & Satin Drapes',
  'Vertical Pinstripes & Herringbone',
  'Botanical Jacquard & Damask',
  'Geometric Architectural Lines',
  'Micro-Houndstooth & Wool Tweed',
  'Asymmetric Drape & Deconstructed'
];

const colorPalettePresets = [
  {
    name: 'Terracotta & Golden Ochre',
    colors: ['#C85A32', '#E0A938', '#F3EFE6'],
    label: 'Warm Earth'
  },
  {
    name: 'Venetian Midnight Navy & Chalk',
    colors: ['#1B2A4A', '#1A1A1A', '#EFEFEF'],
    label: 'Cool Contrast'
  },
  {
    name: 'Emerald Green & Champagne Gold',
    colors: ['#1A3A2A', '#D4AF37', '#FAF0E6'],
    label: 'Jewel Luxury'
  },
  {
    name: 'Burgundy Rose & Antique Ivory',
    colors: ['#581825', '#D4AF37', '#F3EFE6'],
    label: 'Romantic Couture'
  },
  {
    name: 'Monochrome Onyx & Slate',
    colors: ['#1A1A1A', '#555555', '#FFFFFF'],
    label: 'High Contrast'
  }
];

export const StyleToolbar: React.FC<StyleToolbarProps> = ({
  currentRequirements,
  onApplyRequirements,
  onConsultAura,
  onResetRequirements
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(currentRequirements.occasion);
  const [customOccasion, setCustomOccasion] = useState<string>('');
  
  const [selectedPattern, setSelectedPattern] = useState<string>(currentRequirements.patternType);
  const [customPattern, setCustomPattern] = useState<string>('');

  const [selectedColor, setSelectedColor] = useState<string>(currentRequirements.colorPreference);
  const [customColorHex, setCustomColorHex] = useState<string>(currentRequirements.customColorHex || '#C85A32');

  const [activeTab, setActiveTab] = useState<'occasion' | 'pattern' | 'color'>('occasion');

  const handleApply = () => {
    const finalOccasion = customOccasion.trim() ? customOccasion.trim() : selectedOccasion;
    const finalPattern = customPattern.trim() ? customPattern.trim() : selectedPattern;
    const finalColor = selectedColor;

    onApplyRequirements({
      occasion: finalOccasion,
      patternType: finalPattern,
      colorPreference: finalColor,
      customColorHex
    });
  };

  const handleAskAura = () => {
    const finalOccasion = customOccasion.trim() ? customOccasion.trim() : selectedOccasion;
    const finalPattern = customPattern.trim() ? customPattern.trim() : selectedPattern;
    const finalColor = selectedColor;

    onConsultAura({
      occasion: finalOccasion,
      patternType: finalPattern,
      colorPreference: finalColor,
      customColorHex
    });
  };

  const handleReset = () => {
    setSelectedOccasion(occasionOptions[0]);
    setCustomOccasion('');
    setSelectedPattern(patternOptions[0]);
    setCustomPattern('');
    setSelectedColor(colorPalettePresets[0].name);
    setCustomColorHex('#C85A32');
    onResetRequirements();
  };

  return (
    <div className="mt-12 border-t-2 border-[#1A1A1A] bg-[#FFFFFF] shadow-2xl transition-all duration-300">
      {/* Toolbar Bar Sticky Header / Summary Bar */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="bg-[#E2D1B3] text-[#1A1A1A] p-1.5 border border-[#1A1A1A]">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E2D1B3]">
                SARTORIAL SPECIFIER TOOLBAR
              </span>
              <span className="text-[9px] bg-[#E2D1B3] text-[#1A1A1A] font-bold px-2 py-0.5 uppercase tracking-wider">
                ACTIVE SPECIFICATIONS
              </span>
            </div>
            <h3 className="font-serif italic text-sm sm:text-base text-[#F9F7F2] font-bold flex items-center gap-2">
              <span>{selectedOccasion || 'All Occasions'}</span>
              <span className="text-[#E2D1B3]">•</span>
              <span>{selectedPattern || 'All Patterns'}</span>
              <span className="text-[#E2D1B3]">•</span>
              <span>{selectedColor || 'All Tones'}</span>
            </h3>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleApply}
            className="bg-[#E2D1B3] hover:bg-[#FFFFFF] text-[#1A1A1A] font-semibold text-xs px-4 py-2 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Specifications</span>
          </button>

          <button
            onClick={handleAskAura}
            className="bg-[#F3EFE6] hover:bg-[#E2D1B3] text-[#1A1A1A] font-semibold text-xs px-3.5 py-2 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Aura AI</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-[#1A1A1A] border border-[#F9F7F2]/30 hover:bg-[#F9F7F2]/20 text-[#F9F7F2] transition-colors"
            title={isExpanded ? 'Collapse Toolbar' : 'Expand Toolbar'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Selection Panel */}
      {isExpanded && (
        <div className="p-6 bg-[#F9F7F2] border-b border-[#1A1A1A] space-y-6 animate-in slide-in-from-bottom duration-200">
          {/* Sub Navigation Tabs inside Toolbar */}
          <div className="flex items-center border-b border-[#1A1A1A]/20 pb-3 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('occasion')}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all border ${
                activeTab === 'occasion'
                  ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1. Occasion & Event</span>
            </button>

            <button
              onClick={() => setActiveTab('pattern')}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all border ${
                activeTab === 'pattern'
                  ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Type of Pattern & Textile</span>
            </button>

            <button
              onClick={() => setActiveTab('color')}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all border ${
                activeTab === 'color'
                  ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>3. Colours Needed & Spectrum</span>
            </button>
          </div>

          {/* TAB 1: OCCASION SPECIFIER */}
          {activeTab === 'occasion' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif italic font-bold text-[#1A1A1A] text-lg">
                    Select or Specify Event Occasion
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 font-sans">
                    Choose the dress code requirement or specify custom event details to tailor the collection.
                  </p>
                </div>
              </div>

              {/* Preset Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {occasionOptions.map((occ) => {
                  const isSelected = selectedOccasion === occ && !customOccasion;
                  return (
                    <button
                      key={occ}
                      onClick={() => {
                        setSelectedOccasion(occ);
                        setCustomOccasion('');
                      }}
                      className={`p-3 text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                          : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                      }`}
                    >
                      <span className="font-serif italic font-bold text-xs">{occ}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#E2D1B3]" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-1">
                  Or Enter Custom Event / Dress Code
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lake Como Private Villa Soirée, Yacht Black Tie..."
                  value={customOccasion}
                  onChange={(e) => {
                    setCustomOccasion(e.target.value);
                    if (e.target.value) setSelectedOccasion(e.target.value);
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PATTERN TYPE SPECIFIER */}
          {activeTab === 'pattern' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif italic font-bold text-[#1A1A1A] text-lg">
                    Select Textile Geometry & Pattern Type
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 font-sans">
                    Specify the preferred weaves, draping styles, or geometric patterns needed for your silhouette.
                  </p>
                </div>
              </div>

              {/* Preset Pattern Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {patternOptions.map((pat) => {
                  const isSelected = selectedPattern === pat && !customPattern;
                  return (
                    <button
                      key={pat}
                      onClick={() => {
                        setSelectedPattern(pat);
                        setCustomPattern('');
                      }}
                      className={`p-3 text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                          : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                      }`}
                    >
                      <span className="font-serif italic font-bold text-xs">{pat}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#E2D1B3]" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Pattern Input */}
              <div className="pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-1">
                  Or Enter Custom Weave / Pattern Request
                </label>
                <input
                  type="text"
                  placeholder="e.g., Silk Brocade with Gold Thread, Pleated Chiffon..."
                  value={customPattern}
                  onChange={(e) => {
                    setCustomPattern(e.target.value);
                    if (e.target.value) setSelectedPattern(e.target.value);
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 3: COLOURS NEEDED SPECIFIER */}
          {activeTab === 'color' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif italic font-bold text-[#1A1A1A] text-lg">
                    Select Required Colour Tones & Spectrum
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 font-sans">
                    Choose from curated colorimetry pairings formulate to elevate golden skin undertones.
                  </p>
                </div>
              </div>

              {/* Preset Color Swatches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {colorPalettePresets.map((preset) => {
                  const isSelected = selectedColor === preset.name;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => setSelectedColor(preset.name)}
                      className={`p-3 text-left border transition-all space-y-2 ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                          : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-mono font-semibold opacity-70">
                          {preset.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#E2D1B3]" />}
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {preset.colors.map((hex, i) => (
                          <span
                            key={i}
                            className="w-6 h-6 border border-[#1A1A1A]"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>

                      <span className="font-serif italic font-bold text-xs block">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Hex Color Picker */}
              <div className="pt-2 bg-[#FFFFFF] border border-[#1A1A1A] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColorHex}
                    onChange={(e) => {
                      setCustomColorHex(e.target.value);
                      setSelectedColor(`Custom Tone (${e.target.value})`);
                    }}
                    className="w-9 h-9 border border-[#1A1A1A] cursor-pointer"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] block">
                      Custom Color Picker
                    </span>
                    <span className="font-mono text-xs text-[#1A1A1A]/70 uppercase">
                      Selected Hex: {customColorHex}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedColor(`Custom Tone (${customColorHex})`)}
                  className="bg-[#F3EFE6] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-[#1A1A1A] font-semibold text-xs px-3.5 py-2 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em]"
                >
                  Use Custom Hex Color
                </button>
              </div>
            </div>
          )}

          {/* Bottom Action Footer inside Toolbar */}
          <div className="pt-4 border-t border-[#1A1A1A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 text-xs text-[#1A1A1A]/60 hover:text-[#1A1A1A] font-semibold uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Specifications</span>
            </button>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={handleAskAura}
                className="flex-1 sm:flex-none bg-[#F3EFE6] hover:bg-[#E2D1B3] text-[#1A1A1A] font-semibold text-xs px-5 py-2.5 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consult Aura AI</span>
              </button>

              <button
                onClick={handleApply}
                className="flex-1 sm:flex-none bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs px-6 py-2.5 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply To Collection</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

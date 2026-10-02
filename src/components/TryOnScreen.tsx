import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  CheckCircle2,
  Camera,
  Shirt,
  Download,
  Share2,
  Sliders
} from 'lucide-react';
import { User, PostureProfile, OutfitItem } from '../types';

interface TryOnScreenProps {
  user: User;
  posture: PostureProfile;
  wardrobe: OutfitItem[];
  onSelectTab: (tab: string) => void;
}

export const TryOnScreen: React.FC<TryOnScreenProps> = ({
  user,
  posture,
  wardrobe,
  onSelectTab
}) => {
  const [viewAngle, setViewAngle] = useState<'FRONT' | 'SIDE' | 'BACK'>('FRONT');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'item_01', // Emerald Silk Gown
    'item_02', // Aura Gold Sandals
    'item_03'  // Structural Cuff
  ]);
  const [lightingMode, setLightingMode] = useState<'Tuscan Sunset' | 'Studio Daylight' | 'Evening Black Tie'>('Tuscan Sunset');
  const [isRotating, setIsRotating] = useState(false);

  const toggleLayer = (id: string) => {
    if (activeLayers.includes(id)) {
      setActiveLayers(activeLayers.filter((l) => l !== id));
    } else {
      setActiveLayers([...activeLayers, id]);
    }
  };

  const selectedItems = wardrobe.filter((w) => activeLayers.includes(w.id));

  const handleRotate = () => {
    setIsRotating(true);
    setRotationAngle((prev) => (prev + 90) % 360);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>DIGITAL DOUBLE ATELIER • 3D RENDERING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Virtual 3D Avatar & Try-On
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed">
            Mesh simulated for height <span className="font-semibold text-[#1A1A1A]">{user.height || '175 cm'}</span>, 4.2° shoulder posture compensation, and custom drape physics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectTab('posture')}
            className="flex items-center space-x-2 bg-[#F3EFE6] border border-[#1A1A1A] px-3.5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Posture: 4.2° Tilt Matched</span>
          </button>
          <button
            onClick={() => onSelectTab('chat')}
            className="flex items-center space-x-2 bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] border border-[#1A1A1A] px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            <span>Ask AI Stylist</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 3D Canvas Studio */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative aspect-[3/4] md:aspect-[4/5] border border-[#1A1A1A] overflow-hidden bg-[#F3EFE6] p-6 shadow-none flex flex-col justify-between transition-all duration-700">
            {/* Top Bar Overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] px-3 py-1.5 rounded-none text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#E2D1B3] animate-pulse" />
                <span>3D SIMULATION ACTIVE</span>
              </div>

              {/* Angle View Selector */}
              <div className="flex items-center space-x-1 bg-[#F9F7F2] border border-[#1A1A1A] p-1 text-xs">
                {(['FRONT', 'SIDE', 'BACK'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setViewAngle(angle)}
                    className={`px-3 py-1 text-[10px] font-mono font-bold tracking-wider transition-all ${
                      viewAngle === angle
                        ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                        : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Center Graphic Showcase */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <div
                className={`relative w-full max-w-md h-full flex items-center justify-center transition-transform duration-700 ${
                  isRotating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                }`}
                style={{ transform: `rotateY(${rotationAngle}deg)` }}
              >
                <div className="relative w-full h-full max-h-[500px] flex items-center justify-center">
                  {/* Subtle Grid Lines Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

                  {/* Layered Avatar Image */}
                  <div className="relative w-64 h-[440px] border border-[#1A1A1A] bg-[#FFFFFF] shadow-xl flex items-center justify-center group">
                    <img
                      src={
                        selectedItems.find((i) => i.category === 'dress')?.imageUrl ||
                        selectedItems[0]?.imageUrl ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuDAszrCsiSCWiiE5ZFXTiCBjYGKNroOmtz3svu9YhxragaYs_J2EDkyFHsEhXznP3pV3ZqvVckjaEGBRQfUuH4Hmsm8cE7gbu7Kr2V-_K8sqSjxkRH8zCLEqdMmI8A8-dAeXJ9xJeuBO8msSbFL_fm7IIDJ8wcqm8c5479s7LOcmMC0Q1IUCPX4zh5kZYSkBx-W1AZfa8gGSav_pp0mKdeJm_jvGs-r4DVTpWr53TJd_Bm1XOySqDqA'
                      }
                      alt="Avatar Fitting"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Biometric Posture Measurement Overlay Lines */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                      <div className="border-t border-dashed border-[#1A1A1A]/40 w-full flex justify-between text-[9px] font-mono text-[#1A1A1A] font-semibold bg-[#F9F7F2]/80 px-1 py-0.5">
                        <span>SHOULDER ALIGNMENT: 41 CM</span>
                        <span>TILT: -4.2°</span>
                      </div>
                      <div className="border-t border-dashed border-[#1A1A1A]/40 w-full flex justify-between text-[9px] font-mono text-[#1A1A1A] font-semibold bg-[#F9F7F2]/80 px-1 py-0.5">
                        <span>WAIST: 66 CM</span>
                        <span>HIP: 92 CM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls Overlay */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F9F7F2] border border-[#1A1A1A] p-3 z-10 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRotate}
                  className="flex items-center space-x-1.5 bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1.5 rounded-none text-[11px] font-semibold uppercase tracking-wider transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rotate ({rotationAngle}°)</span>
                </button>

                {/* Ambient Lighting Toggle */}
                <div className="flex items-center space-x-1 bg-[#F3EFE6] border border-[#1A1A1A]/30 px-2 py-1">
                  <Sliders className="w-3.5 h-3.5 text-[#1A1A1A] mr-1" />
                  {(['Tuscan Sunset', 'Studio Daylight', 'Evening Black Tie'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLightingMode(mode)}
                      className={`px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                        lightingMode === mode
                          ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                          : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                      }`}
                    >
                      {mode.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert('Snapshot saved to lookbook!')}
                  className="flex items-center space-x-1 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] px-2.5 py-1.5 border border-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Snapshot</span>
                </button>
                <button
                  onClick={() => alert('Outfit shared to your personal stylist link!')}
                  className="flex items-center space-x-1 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] px-2.5 py-1.5 border border-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Garments Layering & Fitting Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#1A1A1A]" />
                <h3 className="font-serif italic font-bold text-[#1A1A1A] text-lg">Active Garment Layers</h3>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                {selectedItems.length} Selected
              </span>
            </div>

            {/* Garment Toggle List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {wardrobe.map((item) => {
                const isSelected = activeLayers.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleLayer(item.id)}
                    className={`flex items-center justify-between p-3 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#F3EFE6] border-[#1A1A1A] text-[#1A1A1A]'
                        : 'bg-[#F9F7F2] border-[#1A1A1A]/20 text-[#1A1A1A]/60 hover:border-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover border border-[#1A1A1A]"
                      />
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-semibold block">{item.brand}</span>
                        <h4 className="font-serif italic font-bold text-sm text-[#1A1A1A]">{item.name}</h4>
                        <span className="text-xs font-serif font-bold text-[#1A1A1A]">${item.price}</span>
                      </div>
                    </div>

                    <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#F9F7F2]'
                        : 'border-[#1A1A1A]/40 bg-[#F9F7F2]'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Fitting Cost Summary */}
            <div className="bg-[#F3EFE6] p-4 border border-[#1A1A1A] space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#1A1A1A]/70 uppercase tracking-wider text-[10px] font-semibold">Total Look Value:</span>
                <span className="font-serif italic font-bold text-[#1A1A1A] text-lg">
                  ${selectedItems.reduce((acc, i) => acc + i.price, 0).toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => onSelectTab('marketplace')}
                className="w-full bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs py-3 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center justify-center space-x-2"
              >
                <span>Request Custom Tailoring</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

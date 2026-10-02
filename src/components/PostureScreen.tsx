import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Camera,
  Shield,
  Sparkles,
  RefreshCw,
  Info,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { User, PostureProfile } from '../types';

interface PostureScreenProps {
  user: User;
  posture: PostureProfile;
  onScanPosture: () => void;
  onSelectTab: (tab: string) => void;
}

export const PostureScreen: React.FC<PostureScreenProps> = ({
  user,
  posture,
  onScanPosture,
  onSelectTab
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      onScanPosture();
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <Activity className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>BIOMETRIC POSTURE RESTRUCTURING • 3D KEYPOINTS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Posture Analysis & Draping
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed font-sans">
            Evaluates spinal vector alignment and shoulder plane angles to engineer garment drapes that compensate for asymmetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleScanClick}
            disabled={isScanning}
            className="flex items-center space-x-2 bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs px-5 py-3 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em]"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Re-Calculating...' : 'Re-Scan Posture'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Scan Camera Simulation Viewport */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-3">
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-[#1A1A1A]" />
              <h3 className="font-serif italic font-bold text-[#1A1A1A] text-lg">Biometric Viewfinder</h3>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#E2D1B3] border border-[#1A1A1A]/30 px-2 py-0.5">
              {posture.scannedAt}
            </span>
          </div>

          <div className="relative aspect-[3/4] border border-[#1A1A1A] bg-[#F3EFE6] flex items-center justify-center group overflow-hidden">
            {/* Background Model Image */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArkoRLkjq_CEVUQTP4fHM7URyGpPyQ-x7yborqK0BIe8CCRBB1SD6Uaksg5aUkPza8S6nX93HRU-RA4v-8b2RWR3JO_0pAPzYni5gXwdr7SYd4dW4FYhtSmyRKYlBYdTUFbGcc842RGdwTNAeu7_HwLoVVIOoTQssTH9Vr69qCN2U2OBHI0T4UFlemfGkgHhwBsOsWoCsqgOzs5e6rqhBusovx5k1iTnR-7ZWzC0d-FweQDlJssrzv"
              alt="Posture Viewfinder"
              className="w-full h-full object-cover filter contrast-105"
            />

            {/* Posture Vector Wireframe Overlay */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
              {/* Top Shoulder Axis */}
              <div className="relative border-t-2 border-[#1A1A1A] w-full flex justify-between items-center text-[9px] font-mono text-[#1A1A1A] font-bold">
                <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-1 py-0.5">-4.2° Tilt</span>
                <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-1 py-0.5">Shoulder 41cm</span>
              </div>

              {/* Spine Line */}
              <div className="absolute top-1/4 bottom-1/4 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-[#1A1A1A]" />

              {/* Hip Axis */}
              <div className="relative border-t-2 border-[#1A1A1A] w-full flex justify-between items-center text-[9px] font-mono text-[#1A1A1A] font-bold">
                <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-1 py-0.5">Hip Alignment 0.0°</span>
                <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-1 py-0.5">Optimal</span>
              </div>
            </div>

            {isScanning && (
              <div className="absolute inset-0 bg-[#F9F7F2]/95 flex flex-col items-center justify-center p-6 space-y-3 z-20">
                <div className="w-12 h-12 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono font-bold text-[#1A1A1A]">Calculating 3D Shoulder Keypoints...</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-[#1A1A1A]/80 bg-[#F3EFE6] p-3 border border-[#1A1A1A]">
            <Shield className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="font-sans">
              Privacy Shield Active: Biometric keypoints extracted locally without cloud photo retention.
            </span>
          </div>
        </div>

        {/* Right Side: Posture Findings & Silhouette Strategy */}
        <div className="lg:col-span-7 space-y-6">
          {/* Diagnostic Result Card */}
          <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/60">
                DIAGNOSTIC INSIGHT
              </span>
              <span className="text-xs text-[#1A1A1A] font-serif italic font-bold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#1A1A1A]" />
                Verified Active
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif italic font-bold text-[#1A1A1A]">{posture.insight}</h3>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                A subtle 4.2° forward tilt in the shoulder axis can cause unstructured garments to sag or pucker around the collarbones. Our tailored recommendation applies structural padding and asymmetric V-neck geometries.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 block">Sartorial Countermeasures:</span>
              <ul className="space-y-2 text-xs text-[#1A1A1A]">
                {posture.recommendedStrategy.map((strat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-[#F3EFE6] p-3 border border-[#1A1A1A] font-sans">
                    <Sparkles className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                    <span>{strat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optimized Silhouettes Grid */}
          <div className="space-y-4">
            <div className="border-b border-[#1A1A1A]/15 pb-2">
              <h4 className="text-2xl font-serif italic font-bold text-[#1A1A1A]">Engineered Silhouettes</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posture.optimizedSilhouettes.map((sil, i) => (
                <div key={i} className="bg-[#FFFFFF] border border-[#1A1A1A] p-4 space-y-3 hover:border-[#1A1A1A] transition-all">
                  <div className="aspect-[4/3] overflow-hidden bg-[#F3EFE6] border border-[#1A1A1A]/10">
                    <img src={sil.imageUrl} alt={sil.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/50 block">{sil.category}</span>
                    <h5 className="font-serif italic font-bold text-[#1A1A1A] text-lg">{sil.title}</h5>
                    <p className="text-xs text-[#1A1A1A]/70 mt-1 line-clamp-2">{sil.description}</p>
                  </div>
                  <button
                    onClick={() => onSelectTab('tryon')}
                    className="w-full bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs py-2.5 rounded-none border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center justify-center space-x-1"
                  >
                    <span>View on 3D Avatar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

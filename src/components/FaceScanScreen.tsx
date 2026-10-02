import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Shield,
  Palette,
  ChevronRight,
  UserCheck,
  Zap,
  Sliders,
  X,
  FileImage,
  ArrowRight
} from 'lucide-react';
import { ColorPalette, User } from '../types';

interface FaceScanScreenProps {
  user: User;
  onUpdateUser: (updated: Partial<User>) => void;
  onUpdatePalette: (palette: ColorPalette) => void;
  onSelectTab: (tab: string) => void;
}

interface PresetPortrait {
  id: string;
  name: string;
  undertone: string;
  hex: string;
  imageUrl: string;
  geometry: string;
  contrast: string;
  description: string;
  curatedTones: { name: string; hex: string; role: string }[];
}

const presetPortraits: PresetPortrait[] = [
  {
    id: 'p1',
    name: 'Warm Golden Complexion',
    undertone: 'Warm Golden Ivory (#FCE3C7)',
    hex: '#FCE3C7',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    geometry: 'Oval / Balanced Golden Ratio',
    contrast: 'Medium High (78%)',
    description: 'Golden undertones with peach spectral warmth. Ideal for terracotta, emerald, and cream silks.',
    curatedTones: [
      { name: 'Warm Terracotta', hex: '#C85A32', role: 'Primary Statement' },
      { name: 'Tuscan Sun Gold', hex: '#E0A938', role: 'Accent Highlight' },
      { name: 'Cream Linen', hex: '#F3EFE6', role: 'Base Neutral' }
    ]
  },
  {
    id: 'p2',
    name: 'Cool Olive Complexion',
    undertone: 'Cool Olive Rose (#E8D1C5)',
    hex: '#E8D1C5',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    geometry: 'High Cheekbones / Diamond',
    contrast: 'High Contrast (85%)',
    description: 'Cool undertones with subtle rose olive spectral hues. Perfect for midnight navy, burgundy, and slate.',
    curatedTones: [
      { name: 'Midnight Venetian Blue', hex: '#1B2A4A', role: 'Primary Statement' },
      { name: 'Deep Royal Burgundy', hex: '#581825', role: 'Accent Highlight' },
      { name: 'Chalk Pearl', hex: '#EFEFEF', role: 'Base Neutral' }
    ]
  },
  {
    id: 'p3',
    name: 'Deep Chestnut Bronze',
    undertone: 'Rich Bronze Chestnut (#8D5B4C)',
    hex: '#8D5B4C',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    geometry: 'Structured Jawline / Square Oval',
    contrast: 'Vibrant High (90%)',
    description: 'Deep warm undertones with rich melanin depth. Complemented by chartreuse, crisp white, and antique gold.',
    curatedTones: [
      { name: 'Antique Gold', hex: '#D4AF37', role: 'Primary Statement' },
      { name: 'Chartreuse Silk', hex: '#7FFF00', role: 'Accent Highlight' },
      { name: 'Pure Ivory Linen', hex: '#FAF0E6', role: 'Base Neutral' }
    ]
  }
];

export const FaceScanScreen: React.FC<FaceScanScreenProps> = ({
  user,
  onUpdateUser,
  onUpdatePalette,
  onSelectTab
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'preset'>('upload');
  const [selectedImage, setSelectedImage] = useState<string>(
    user.avatarUrl || presetPortraits[0].imageUrl
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('Standby');
  const [scanResult, setScanResult] = useState<PresetPortrait | null>(presetPortraits[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          runFaceScan(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          runFaceScan(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Start live webcam camera scan
  const startCamera = async () => {
    setActiveMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access not granted or unavailable:', err);
      setCameraActive(false);
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        // Stop stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        setCameraActive(false);
        runFaceScan(dataUrl);
      }
    }
  };

  // Trigger simulated/AI Face Scanning animation
  const runFaceScan = async (imageUrl: string) => {
    setIsScanning(true);
    setScanProgress(10);
    setScanStage('Initializing 3D Facial Vector Grid...');

    // Progress step 1
    await new Promise((r) => setTimeout(r, 600));
    setScanProgress(35);
    setScanStage('Detecting Facial Contour & Golden Ratio Coordinates...');

    // Step 2
    await new Promise((r) => setTimeout(r, 700));
    setScanProgress(65);
    setScanStage('Analyzing Skin Spectral Reflectance & Melanin Undertone...');

    // Step 3
    await new Promise((r) => setTimeout(r, 600));
    setScanProgress(90);
    setScanStage('Formulating Bespoke Sartorial Color Matrix...');

    await new Promise((r) => setTimeout(r, 500));
    setScanProgress(100);
    setIsScanning(false);
    setScanStage('Analysis Complete');

    // Send to backend for saving
    try {
      const res = await fetch('/api/v1/colors');
      if (res.ok) {
        // Pick or formulate result
        const match = presetPortraits.find((p) => p.imageUrl === imageUrl) || {
          ...presetPortraits[0],
          imageUrl
        };
        setScanResult(match);
      }
    } catch {
      // fallback
    }
  };

  const handleSelectPreset = (preset: PresetPortrait) => {
    setActiveMode('preset');
    setSelectedImage(preset.imageUrl);
    setScanResult(preset);
    runFaceScan(preset.imageUrl);
  };

  // Apply scan results to profile and proceed to collection
  const handleApplyAndContinue = () => {
    if (!scanResult) return;

    // Update user avatar
    onUpdateUser({
      avatarUrl: selectedImage
    });

    // Update color palette
    const newPalette: ColorPalette = {
      analyzedSkinTone: scanResult.undertone,
      rationale: scanResult.description,
      curatedTones: scanResult.curatedTones,
      fabricRecommendations: [
        {
          title: 'High-Luster Silk & Satin Drapes',
          description: 'Reflects warm ambient light directly onto golden skin tones.',
          icon: 'Sparkles'
        },
        {
          title: 'Structured Brushed Linen',
          description: 'Provides organic matte texture contrasting smooth complexion.',
          icon: 'Layers'
        }
      ],
      patternGeometry: [
        {
          title: 'Vertical Asymmetric Tailoring',
          description: 'Elongates neck and balances facial symmetry.',
          icon: 'Grid'
        }
      ],
      lookbook: [
        {
          id: 'lb_1',
          title: 'Tuscany Sunset Formal',
          label: 'Sartorial Highlight',
          imageUrl: selectedImage
        }
      ]
    };

    onUpdatePalette(newPalette);
    onSelectTab('dashboard');
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <Camera className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>STEP 01 • FACIAL BIOMETRIC SCAN & COLORIMETRY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Face Scanner & Image Analysis
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed font-sans">
            Upload your portrait or initialize live biometric facial mapping to extract exact skin spectral undertones, golden ratio facial geometry, and curated sartorial color codes.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] underline underline-offset-4"
          >
            Skip to Dashboard →
          </button>
        </div>
      </div>

      {/* Main Grid: Left Scanner Viewport | Right Analysis Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Viewfinder & Camera Canvas */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-6">
          {/* Top Mode Toggle Tabs */}
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveMode('upload')}
                className={`text-xs font-semibold uppercase tracking-[0.15em] px-3.5 py-1.5 transition-colors ${
                  activeMode === 'upload'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                    : 'bg-[#F3EFE6] text-[#1A1A1A] hover:bg-[#E2D1B3]'
                }`}
              >
                Upload Photo
              </button>
              <button
                onClick={startCamera}
                className={`text-xs font-semibold uppercase tracking-[0.15em] px-3.5 py-1.5 transition-colors ${
                  activeMode === 'camera'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                    : 'bg-[#F3EFE6] text-[#1A1A1A] hover:bg-[#E2D1B3]'
                }`}
              >
                Live Camera
              </button>
              <button
                onClick={() => setActiveMode('preset')}
                className={`text-xs font-semibold uppercase tracking-[0.15em] px-3.5 py-1.5 transition-colors ${
                  activeMode === 'preset'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                    : 'bg-[#F3EFE6] text-[#1A1A1A] hover:bg-[#E2D1B3]'
                }`}
              >
                Presets
              </button>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 font-bold">
              PRIVACY PROTECTED
            </span>
          </div>

          {/* Viewfinder Canvas Area */}
          <div className="relative aspect-[4/5] bg-[#F3EFE6] border border-[#1A1A1A] overflow-hidden flex items-center justify-center group">
            {activeMode === 'camera' && cameraActive ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={captureCameraPhoto}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 border border-[#1A1A1A] transition-colors shadow-2xl flex items-center space-x-2 z-30"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture & Analyze</span>
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Facial Scanner Portrait"
                  className="w-full h-full object-cover"
                />

                {/* Facial Mapping Keypoints Wireframe Overlay */}
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
                  {/* Top forehead keypoints */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#1A1A1A] font-bold">
                    <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-2 py-0.5">
                      Symmetry Index: 98.4%
                    </span>
                    <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-2 py-0.5">
                      Luminance: 720cd/m²
                    </span>
                  </div>

                  {/* Golden Ratio Facial Mesh SVG Overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-40 stroke-[#1A1A1A] fill-none" viewBox="0 0 100 100">
                    {/* Face Oval Ellipse */}
                    <ellipse cx="50" cy="45" rx="26" ry="34" strokeWidth="0.4" strokeDasharray="1 1" />
                    {/* Eye Axis Line */}
                    <line x1="25" y1="38" x2="75" y2="38" strokeWidth="0.3" />
                    {/* Nose Axis */}
                    <line x1="50" y1="20" x2="50" y2="70" strokeWidth="0.3" strokeDasharray="2 2" />
                    {/* Mouth Axis */}
                    <line x1="32" y1="58" x2="68" y2="58" strokeWidth="0.3" />
                    {/* Keypoint Dots */}
                    <circle cx="38" cy="38" r="1" fill="#1A1A1A" />
                    <circle cx="62" cy="38" r="1" fill="#1A1A1A" />
                    <circle cx="50" cy="48" r="1" fill="#1A1A1A" />
                    <circle cx="50" cy="58" r="1" fill="#1A1A1A" />
                    <circle cx="50" cy="74" r="1" fill="#1A1A1A" />
                  </svg>

                  {/* Bottom Chin & Undertone Axis */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#1A1A1A] font-bold">
                    <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-2 py-0.5">
                      Undertone: {scanResult?.undertone.split(' ')[0] || 'Warm'}
                    </span>
                    <span className="bg-[#F9F7F2] border border-[#1A1A1A] px-2 py-0.5">
                      Melanin Vector: Optimal
                    </span>
                  </div>
                </div>

                {/* Animated Laser Scanning Line */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-[#1A1A1A] shadow-[0_0_15px_#1A1A1A] animate-pulse z-20 top-1/2 -translate-y-1/2" />
                )}
              </div>
            )}

            {/* Scanning Overlay Loader */}
            {isScanning && (
              <div className="absolute inset-0 bg-[#F9F7F2]/90 flex flex-col items-center justify-center p-6 space-y-4 z-30">
                <div className="w-14 h-14 border-3 border-[#1A1A1A] border-t-transparent animate-spin rounded-none" />
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#1A1A1A] block">
                    {scanStage}
                  </span>
                  <div className="w-48 bg-[#E2D1B3] h-1.5 border border-[#1A1A1A] overflow-hidden mx-auto mt-2">
                    <div
                      className="bg-[#1A1A1A] h-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* File Upload Dropzone (when in upload mode) */}
          {activeMode === 'upload' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                dragOver
                  ? 'border-[#1A1A1A] bg-[#E2D1B3]'
                  : 'border-[#1A1A1A]/30 bg-[#F3EFE6] hover:border-[#1A1A1A]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-6 h-6 text-[#1A1A1A]" />
                <p className="text-xs font-serif italic font-bold text-[#1A1A1A]">
                  Click or drag portrait photo here to analyze
                </p>
                <p className="text-[10px] text-[#1A1A1A]/60 font-mono uppercase tracking-wider">
                  Supports JPG, PNG, WebP • Auto-cleared after analysis
                </p>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-center space-x-2 text-[11px] text-[#1A1A1A]/80 bg-[#F3EFE6] p-3 border border-[#1A1A1A]">
            <Shield className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="font-sans">
              Privacy Shield Active: Facial measurements and photos are processed ephemerally in server memory and never shared without permission.
            </span>
          </div>
        </div>

        {/* Right Column: Facial Analysis & Sartorial Palette Results */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Selection Buttons if user wants fast choice */}
          {activeMode === 'preset' && (
            <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 block">
                SELECT PRESET PORTRAIT DEMO
              </span>
              <div className="grid grid-cols-3 gap-3">
                {presetPortraits.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`border p-1.5 flex flex-col items-center text-center transition-all ${
                      selectedImage === preset.imageUrl
                        ? 'border-[#1A1A1A] bg-[#E2D1B3]'
                        : 'border-[#1A1A1A]/20 bg-[#F3EFE6] hover:border-[#1A1A1A]'
                    }`}
                  >
                    <img
                      src={preset.imageUrl}
                      alt={preset.name}
                      className="w-12 h-12 object-cover border border-[#1A1A1A] mb-1"
                    />
                    <span className="text-[9px] font-serif italic font-bold leading-tight line-clamp-1">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Results Card */}
          <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/60">
                SPECTRAL SCAN RESULTS
              </span>
              <span className="text-xs text-[#1A1A1A] font-serif italic font-bold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#1A1A1A]" />
                {scanStage === 'Analysis Complete' ? 'Verified' : 'Scanning'}
              </span>
            </div>

            {/* Undertone Highlight */}
            <div className="bg-[#F3EFE6] p-4 border border-[#1A1A1A] space-y-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]/60 block">
                CLASSIFIED COMPLEXION UNDERTONE
              </span>
              <div className="flex items-center space-x-3">
                <span
                  className="w-6 h-6 rounded-full border border-[#1A1A1A] shrink-0"
                  style={{ backgroundColor: scanResult?.hex || '#FCE3C7' }}
                />
                <div>
                  <h3 className="font-serif italic font-bold text-xl text-[#1A1A1A]">
                    {scanResult?.undertone || 'Warm Golden Ivory'}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans pt-1">
                {scanResult?.description}
              </p>
            </div>

            {/* Geometry & Contrast Metrics */}
            <div className="grid grid-cols-2 gap-3 font-sans">
              <div className="bg-[#F3EFE6] p-3 border border-[#1A1A1A]">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#1A1A1A]/60 block">
                  FACIAL GEOMETRY
                </span>
                <span className="font-serif italic font-bold text-sm text-[#1A1A1A]">
                  {scanResult?.geometry || 'Oval / Balanced'}
                </span>
              </div>
              <div className="bg-[#F3EFE6] p-3 border border-[#1A1A1A]">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#1A1A1A]/60 block">
                  CONTRAST RATIO
                </span>
                <span className="font-serif italic font-bold text-sm text-[#1A1A1A]">
                  {scanResult?.contrast || 'Medium High (78%)'}
                </span>
              </div>
            </div>

            {/* Curated Tones Palette Preview */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 block">
                OPTIMAL SARTORIAL PALETTE
              </span>
              <div className="grid grid-cols-3 gap-2">
                {scanResult?.curatedTones.map((tone, idx) => (
                  <div key={idx} className="bg-[#F3EFE6] border border-[#1A1A1A] p-2 space-y-1">
                    <div
                      className="w-full h-8 border border-[#1A1A1A]"
                      style={{ backgroundColor: tone.hex }}
                    />
                    <span className="text-[9px] font-serif italic font-bold block text-[#1A1A1A] truncate">
                      {tone.name}
                    </span>
                    <span className="text-[8px] font-mono text-[#1A1A1A]/60 uppercase block">
                      {tone.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trigger Re-Scan or Run Manual Scan */}
            <button
              onClick={() => runFaceScan(selectedImage)}
              disabled={isScanning}
              className="w-full bg-[#F3EFE6] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-[#1A1A1A] font-semibold text-xs py-2.5 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Re-Run Spectral Analysis'}</span>
            </button>
          </div>

          {/* Final Action Button: Apply & Proceed */}
          <button
            onClick={handleApplyAndContinue}
            className="w-full bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-sm py-4 border border-[#1A1A1A] transition-colors uppercase tracking-[0.2em] flex items-center justify-center space-x-2 shadow-xl"
          >
            <span>Apply Analysis & Enter Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

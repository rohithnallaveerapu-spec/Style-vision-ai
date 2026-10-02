import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { UserConsents } from '../types';

interface PrivacyScreenProps {
  consents: UserConsents;
  onUpdateConsent: (newConsents: Partial<UserConsents>) => Promise<void>;
  onExportData: () => Promise<void>;
  onDeleteAllData: () => Promise<void>;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({
  consents,
  onUpdateConsent,
  onExportData,
  onDeleteAllData
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [message, setMessage] = useState('');

  const toggleConsent = async (key: keyof UserConsents) => {
    if (typeof consents[key] !== 'boolean') return;
    setIsUpdating(true);
    try {
      await onUpdateConsent({ [key]: !consents[key] });
      setMessage('Privacy consent updated successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExport = async () => {
    await onExportData();
    setMessage('User biometric & style profile exported.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async () => {
    if (!deleteConfirmed) {
      setDeleteConfirmed(true);
      return;
    }
    await onDeleteAllData();
    setDeleteConfirmed(false);
    setMessage('All biometric measurements and profile data permanently deleted.');
    setTimeout(() => setMessage(''), 4000);
  };

  const consentItems: { key: keyof UserConsents; title: string; desc: string }[] = [
    {
      key: 'photo_analysis',
      title: 'Biometric Posture & Photo Analysis',
      desc: 'Allows StyleVision AI to calculate 3D keypoints for shoulder tilt, spine angle, and hip alignment.'
    },
    {
      key: 'face_style_analysis',
      title: 'Facial Colorimetry & Skin Tone Scan',
      desc: 'Processes spectral lighting from camera frame to analyze skin undertones (e.g. Warm Ivory).'
    },
    {
      key: 'body_measurement_analysis',
      title: 'Body Measurement & Size Matching',
      desc: 'Stores height, chest, waist, and hip dimensions in memory for accurate fit predictions.'
    },
    {
      key: 'virtual_try_on',
      title: 'Virtual 3D Avatar Try-On',
      desc: 'Renders 3D clothing draping simulations directly on your digital double canvas.'
    },
    {
      key: 'personalized_recommendations',
      title: 'AI Stylist Recommendations',
      desc: 'Generates algorithmic outfit pairings based on current event focus and color palette.'
    },
    {
      key: 'photo_storage',
      title: 'Voluntary Photo Storage',
      desc: 'Permits temporary caching of snapshot images for seasonal lookbook comparison.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>PRIVACY-BY-DESIGN COMPLIANCE • DATA MINIMIZATION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Biometric Governance & Consent
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed font-sans">
            You maintain exclusive ownership of all biometric, photo, and size measurement parameters. Zero-trust architecture ensures data is processed ephemerally.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F3EFE6] border border-[#1A1A1A] px-3.5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
          <Lock className="w-4 h-4 text-[#1A1A1A]" />
          <span>GDPR & CCPA VERIFIED</span>
        </div>
      </div>

      {message && (
        <div className="bg-[#E2D1B3] border border-[#1A1A1A] p-4 text-[#1A1A1A] text-xs flex items-center space-x-2 font-semibold font-sans">
          <CheckCircle2 className="w-4 h-4 text-[#1A1A1A]" />
          <span>{message}</span>
        </div>
      )}

      {/* Explicit Consents Toggle List */}
      <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-3">
          <h3 className="font-serif italic font-bold text-[#1A1A1A] text-2xl">Explicit User Consents</h3>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60">
            Updated: {new Date(consents.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-4">
          {consentItems.map((item) => {
            const isEnabled = Boolean(consents[item.key]);
            return (
              <div
                key={item.key}
                className="flex items-start justify-between p-4 bg-[#F3EFE6] border border-[#1A1A1A] gap-4"
              >
                <div className="space-y-1">
                  <h4 className="font-serif italic font-bold text-[#1A1A1A] text-base">{item.title}</h4>
                  <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">{item.desc}</p>
                </div>

                <button
                  onClick={() => toggleConsent(item.key)}
                  disabled={isUpdating}
                  className={`w-12 h-6 rounded-none border border-[#1A1A1A] p-0.5 transition-colors relative shrink-0 ${
                    isEnabled ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-[#E2D1B3] border border-[#1A1A1A] transition-transform ${
                      isEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Export & Deletion Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Card */}
        <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#1A1A1A]/15 pb-3">
            <Download className="w-4 h-4 text-[#1A1A1A]" />
            <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xl">Export Biometric & Style Profile</h4>
          </div>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
            Download a full machine-readable JSON archive containing your saved measurements, color analysis scores, and posture alignment metrics.
          </p>
          <button
            onClick={handleExport}
            className="bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs px-5 py-3 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download My Data (JSON)</span>
          </button>
        </div>

        {/* Delete Card */}
        <div className="bg-[#FFFFFF] border border-[#1A1A1A] p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#1A1A1A]/15 pb-3">
            <Trash2 className="w-4 h-4 text-[#1A1A1A]" />
            <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xl">Permanently Purge Biometric Data</h4>
          </div>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
            Instantly wipe all stored photos, posture alignment parameters, and body measurements from server memory according to GDPR requirements.
          </p>
          <button
            onClick={handleDelete}
            className={`text-xs px-5 py-3 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] font-semibold flex items-center space-x-2 ${
              deleteConfirmed
                ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                : 'bg-[#F3EFE6] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-[#1A1A1A]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{deleteConfirmed ? 'Confirm Permanent Deletion' : 'Delete All Biometric Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

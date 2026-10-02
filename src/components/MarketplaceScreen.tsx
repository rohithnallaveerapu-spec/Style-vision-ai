import React, { useState } from 'react';
import {
  Store,
  Sparkles,
  MapPin,
  CheckCircle2,
  Send,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { Designer, User, UserConsents } from '../types';

interface MarketplaceScreenProps {
  designers: Designer[];
  user: User;
  consents: UserConsents;
  onSubmitProposal: (designerId: string, occasionDetails: string, fabricPreferences: string, notes: string) => Promise<void>;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  designers,
  user,
  consents,
  onSubmitProposal
}) => {
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occasion, setOccasion] = useState('Summer Wedding in Tuscany (Black Tie Optional)');
  const [fabricPref, setFabricPref] = useState('Breathable Silk / Lightweight Wool Blend');
  const [notes, setNotes] = useState('Requesting posture-aligned shoulder padding and warm ivory undertone pairing.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpenProposal = (designer: Designer) => {
    setSelectedDesigner(designer);
    setIsModalOpen(true);
    setSuccessMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesigner) return;

    setIsSubmitting(true);
    try {
      await onSubmitProposal(selectedDesigner.id, occasion, fabricPref, notes);
      setSuccessMsg(`Proposal request sent securely to ${selectedDesigner.name}'s atelier!`);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMsg('');
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-2">
            <Store className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>BESPOKE MARKETPLACE • HAUTE COUTURE ATELIERS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#1A1A1A]">
            Independent Master Tailors
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 max-w-xl mt-2 leading-relaxed font-sans">
            Commission bespoke garments directly from master artisans. Encrypted biometric profiles and posture data are transmitted via privacy-by-design pipelines.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F3EFE6] border border-[#1A1A1A] px-3.5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
          <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
          <span>ENCRYPTED BIOMETRIC PIPELINE</span>
        </div>
      </div>

      {/* Designer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designers.map((designer) => (
          <div
            key={designer.id}
            className="bg-[#FFFFFF] border border-[#1A1A1A] overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image Banner */}
              <div className="relative aspect-[4/3] bg-[#F3EFE6] overflow-hidden border-b border-[#1A1A1A]">
                <img
                  src={designer.imageUrl}
                  alt={designer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 right-3 text-[9px] font-mono font-bold bg-[#1A1A1A] text-[#F9F7F2] px-2.5 py-1 uppercase tracking-wider">
                  {designer.status}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif italic font-bold text-[#1A1A1A] text-xl group-hover:underline">
                      {designer.name}
                    </h3>
                    <span className="text-[10px] text-[#1A1A1A]/70 font-semibold uppercase tracking-[0.15em] flex items-center mt-0.5">
                      <MapPin className="w-3 h-3 mr-1" />
                      {designer.title}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-[#1A1A1A]/50 uppercase font-mono block">Starting At</span>
                    <span className="font-serif italic font-bold text-[#1A1A1A] text-base">
                      ${designer.startingPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#1A1A1A]/70 line-clamp-3 leading-relaxed font-sans">{designer.bio}</p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {designer.specialty.map((spec, i) => (
                    <span
                      key={i}
                      className="bg-[#F3EFE6] text-[#1A1A1A] border border-[#1A1A1A] text-[9px] px-2 py-0.5 font-mono font-semibold uppercase tracking-wider"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleOpenProposal(designer)}
                className="w-full bg-[#1A1A1A] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] text-[#F9F7F2] font-semibold text-xs py-3 border border-[#1A1A1A] transition-colors uppercase tracking-[0.15em] flex items-center justify-center space-x-2"
              >
                <span>Request Custom Fitting Proposal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proposal Modal */}
      {isModalOpen && selectedDesigner && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] border border-[#1A1A1A] max-w-xl w-full p-6 space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#1A1A1A] hover:opacity-60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-[#1A1A1A] pb-4">
              <img
                src={selectedDesigner.imageUrl}
                alt={selectedDesigner.name}
                className="w-12 h-12 border border-[#1A1A1A] object-cover"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/60">BESPOKE PROPOSAL REQUEST</span>
                <h3 className="font-serif italic font-bold text-[#1A1A1A] text-2xl">{selectedDesigner.name} Atelier</h3>
              </div>
            </div>

            {successMsg ? (
              <div className="bg-[#E2D1B3] border border-[#1A1A1A] p-4 text-[#1A1A1A] text-xs flex items-center space-x-3 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#1A1A1A] shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[10px] mb-1">Occasion / Event Details</label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#1A1A1A] focus:border-[#1A1A1A] p-2.5 text-[#1A1A1A] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[10px] mb-1">Fabric & Material Preferences</label>
                  <input
                    type="text"
                    value={fabricPref}
                    onChange={(e) => setFabricPref(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#1A1A1A] focus:border-[#1A1A1A] p-2.5 text-[#1A1A1A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[10px] mb-1">Specific Styling Notes & Requirements</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#1A1A1A] focus:border-[#1A1A1A] p-2.5 text-[#1A1A1A] outline-none resize-none"
                  />
                </div>

                {/* Biometric Data Transfer Consent Status */}
                <div className="bg-[#F3EFE6] p-3 border border-[#1A1A1A] space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-[#1A1A1A]">Biometric Transfer:</span>
                    <span className={consents.body_measurement_analysis ? 'text-[#1A1A1A]' : 'text-stone-500'}>
                      {consents.body_measurement_analysis ? 'Granted (Encrypted)' : 'Not Shared'}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#1A1A1A]/70">
                    Transferred directly under Privacy-by-Design zero-trust credentials.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-[#F3EFE6] border border-[#1A1A1A] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.15em]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#E2D1B3] hover:text-[#1A1A1A] border border-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.15em] flex items-center space-x-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Proposal'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

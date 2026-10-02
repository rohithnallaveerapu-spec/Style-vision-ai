import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FaceScanScreen } from './components/FaceScanScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { TryOnScreen } from './components/TryOnScreen';
import { ColorPaletteScreen } from './components/ColorPaletteScreen';
import { PostureScreen } from './components/PostureScreen';
import { AssistantChatScreen } from './components/AssistantChatScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { PrivacyScreen } from './components/PrivacyScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { StyleToolbar, StyleFilterRequirements } from './components/StyleToolbar';

import {
  initialUser,
  initialConsents,
  initialPostureProfile,
  initialColorPalette,
  sampleWardrobeItems,
  sampleDesigners,
  initialChatMessages,
  initialEventFocus
} from './mockData';

import {
  User,
  UserConsents,
  PostureProfile,
  ColorPalette,
  OutfitItem,
  Designer,
  ChatMessage,
  EventFocus
} from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState('scan');
  const [user, setUser] = useState<User>(initialUser);
  const [consents, setConsents] = useState<UserConsents>(initialConsents);
  const [posture, setPosture] = useState<PostureProfile>(initialPostureProfile);
  const [colorPalette, setColorPalette] = useState<ColorPalette>(initialColorPalette);
  const [wardrobe, setWardrobe] = useState<OutfitItem[]>(sampleWardrobeItems);
  const [designers, setDesigners] = useState<Designer[]>(sampleDesigners);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialChatMessages);
  const [eventFocus, setEventFocus] = useState<EventFocus>(initialEventFocus);
  const [styleRequirements, setStyleRequirements] = useState<StyleFilterRequirements>({
    occasion: 'Tuscany Sunset Gala & Black Tie',
    patternType: 'Solid Silk & Satin Drapes',
    colorPreference: 'Terracotta & Golden Ochre',
    customColorHex: '#C85A32'
  });

  const handleApplyStyleRequirements = (reqs: StyleFilterRequirements) => {
    setStyleRequirements(reqs);
    setEventFocus((prev) => ({
      ...prev,
      title: reqs.occasion
    }));
  };

  const handleConsultAuraWithRequirements = (reqs: StyleFilterRequirements) => {
    setStyleRequirements(reqs);
    setEventFocus((prev) => ({
      ...prev,
      title: reqs.occasion
    }));
    setCurrentTab('chat');
    handleSendMessage(
      `I require a bespoke outfit styled specifically for the following parameters:\n` +
      `• Event Occasion: ${reqs.occasion}\n` +
      `• Pattern & Textile Type: ${reqs.patternType}\n` +
      `• Color Spectrum Needed: ${reqs.colorPreference}\n` +
      `Could you curate the perfect ensemble and explain the sartorial rationale?`
    );
  };

  const handleResetStyleRequirements = () => {
    const defaultReqs: StyleFilterRequirements = {
      occasion: 'Tuscany Sunset Gala & Black Tie',
      patternType: 'Solid Silk & Satin Drapes',
      colorPreference: 'Terracotta & Golden Ochre',
      customColorHex: '#C85A32'
    };
    setStyleRequirements(defaultReqs);
    setEventFocus(initialEventFocus);
  };

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<OutfitItem | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Synchronize state with backend REST API on boot
  useEffect(() => {
    async function loadBackendData() {
      try {
        const [meRes, colorRes, postureRes, wardrobeRes, chatRes, eventRes, designerRes] = await Promise.all([
          fetch('/api/v1/auth/me'),
          fetch('/api/v1/colors'),
          fetch('/api/v1/posture'),
          fetch('/api/v1/wardrobe'),
          fetch('/api/v1/ai/chat/history'),
          fetch('/api/v1/events/focus'),
          fetch('/api/v1/designers')
        ]);

        if (meRes.ok) {
          const data = await meRes.json();
          if (data.user) setUser(data.user);
          if (data.consents) setConsents(data.consents);
        }
        if (colorRes.ok) {
          const data = await colorRes.json();
          if (data.palette) setColorPalette(data.palette);
        }
        if (postureRes.ok) {
          const data = await postureRes.json();
          if (data.posture) setPosture(data.posture);
        }
        if (wardrobeRes.ok) {
          const data = await wardrobeRes.json();
          if (data.items) setWardrobe(data.items);
        }
        if (chatRes.ok) {
          const data = await chatRes.json();
          if (data.history) setChatHistory(data.history);
        }
        if (eventRes.ok) {
          const data = await eventRes.json();
          if (data.event) setEventFocus(data.event);
        }
        if (designerRes.ok) {
          const data = await designerRes.json();
          if (data.designers) setDesigners(data.designers);
        }
      } catch (e) {
        console.warn('Backend sync failed, using initial state:', e);
      }
    }

    loadBackendData();
  }, []);

  // Handlers for API calls
  const handleUpdateUser = async (updated: Partial<User>) => {
    try {
      const res = await fetch('/api/v1/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        setUser((prev) => ({ ...prev, ...updated }));
      }
    } catch {
      setUser((prev) => ({ ...prev, ...updated }));
    }
  };

  const handleUpdateConsent = async (newConsents: Partial<UserConsents>) => {
    try {
      const res = await fetch('/api/v1/consent', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConsents)
      });
      if (res.ok) {
        const data = await res.json();
        setConsents(data.consents);
      } else {
        setConsents((prev) => ({ ...prev, ...newConsents, updatedAt: new Date().toISOString() }));
      }
    } catch {
      setConsents((prev) => ({ ...prev, ...newConsents, updatedAt: new Date().toISOString() }));
    }
  };

  const handleScanPosture = async () => {
    try {
      const res = await fetch('/api/v1/posture/scan', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPosture(data.posture);
      } else {
        setPosture((prev) => ({ ...prev, scannedAt: 'Just now', status: 'verified' }));
      }
    } catch {
      setPosture((prev) => ({ ...prev, scannedAt: 'Just now', status: 'verified' }));
    }
  };

  const handleSendMessage = async (msgText: string) => {
    try {
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText })
      });
      if (res.ok) {
        const data = await res.json();
        setChatHistory(data.history);
      } else {
        // Fallback chat addition
        const userMsg: ChatMessage = {
          id: `msg_${Date.now()}`,
          sender: 'user',
          text: msgText,
          timestamp: 'Just now'
        };
        const auraMsg: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          sender: 'aura',
          text: `For your ${eventFocus.title} event, I recommend high-tailored breathable silk matching your ${colorPalette.analyzedSkinTone} complexion.`,
          styleRationale: 'Aligned with warm ivory skin tone and 4.2° shoulder alignment.',
          timestamp: 'Just now',
          suggestedItems: [wardrobe[0], wardrobe[1]],
          suggestionChips: ['See on my avatar', 'Request designer custom piece']
        };
        setChatHistory((prev) => [...prev, userMsg, auraMsg]);
      }
    } catch {
      const userMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        sender: 'user',
        text: msgText,
        timestamp: 'Just now'
      };
      const auraMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'aura',
        text: `Based on your ${colorPalette.analyzedSkinTone} undertone, emerald silk and antique gold sandals complement your upcoming ${eventFocus.title} event best.`,
        styleRationale: 'Deep emerald jewel tones ground warm golden skin undertones.',
        timestamp: 'Just now',
        suggestedItems: [wardrobe[0], wardrobe[1]],
        suggestionChips: ['See on my avatar', 'Suggest accessories']
      };
      setChatHistory((prev) => [...prev, userMsg, auraMsg]);
    }
  };

  const handleSubmitProposal = async (
    designerId: string,
    occasionDetails: string,
    fabricPreferences: string,
    notes: string
  ) => {
    await fetch('/api/v1/designer-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        designerId,
        occasionDetails,
        fabricPreferences,
        notes
      })
    });
  };

  const handleExportData = async () => {
    const res = await fetch('/api/v1/privacy/export', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stylevision_biometric_data_${user.name.replaceAll(' ', '_')}.json`;
      a.click();
    }
  };

  const handleDeleteAllData = async () => {
    await fetch('/api/v1/privacy/delete-all', { method: 'DELETE' });
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#E2D1B3] selection:text-[#1A1A1A]">
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        eventFocus={eventFocus}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPrivacy={() => setCurrentTab('privacy')}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'scan' && (
          <FaceScanScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onUpdatePalette={(newPal) => {
              setColorPalette(newPal);
              // Option to sync with backend
              fetch('/api/v1/colors').catch(() => {});
            }}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardScreen
            user={user}
            eventFocus={eventFocus}
            colorPalette={colorPalette}
            posture={posture}
            wardrobe={wardrobe}
            onSelectTab={setCurrentTab}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        )}

        {currentTab === 'tryon' && (
          <TryOnScreen
            user={user}
            posture={posture}
            wardrobe={wardrobe}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'color' && (
          <ColorPaletteScreen
            colorPalette={colorPalette}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'posture' && (
          <PostureScreen
            user={user}
            posture={posture}
            onScanPosture={handleScanPosture}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'chat' && (
          <AssistantChatScreen
            user={user}
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
            onSelectTab={setCurrentTab}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplaceScreen
            designers={designers}
            user={user}
            consents={consents}
            onSubmitProposal={handleSubmitProposal}
          />
        )}

        {currentTab === 'privacy' && (
          <PrivacyScreen
            consents={consents}
            onUpdateConsent={handleUpdateConsent}
            onExportData={handleExportData}
            onDeleteAllData={handleDeleteAllData}
          />
        )}

        {/* Sartorial Requirement Tool Bar at last */}
        <StyleToolbar
          currentRequirements={styleRequirements}
          onApplyRequirements={handleApplyStyleRequirements}
          onConsultAura={handleConsultAuraWithRequirements}
          onResetRequirements={handleResetStyleRequirements}
        />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectTab={setCurrentTab}
      />

      {/* Auth / Profile Modal */}
      {isAuthModalOpen && (
        <AuthModal
          user={user}
          onClose={() => setIsAuthModalOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] bg-[#F9F7F2] py-8 px-6 text-xs text-[#1A1A1A]/70 text-center space-y-2 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-left">
            ©2026 STYLEVISION AI / BESPOKE ATELIER <br />
            <span className="opacity-50 font-mono">ENCRYPTED BIOMETRIC PROTECTIONS • GEMINI 3.6 FLASH</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-0.5">Sartorial Precision</p>
            <p className="font-serif italic text-base text-[#1A1A1A] font-bold">The New Standard in AI Couture</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

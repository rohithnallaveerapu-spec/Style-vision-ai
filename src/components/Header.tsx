import React from 'react';
import {
  Sparkles,
  User as UserIcon,
  Shirt,
  Palette,
  Activity,
  MessageSquareText,
  Store,
  ShieldCheck,
  Calendar,
  Lock,
  Camera
} from 'lucide-react';
import { User, EventFocus } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: User;
  eventFocus: EventFocus;
  onOpenAuth: () => void;
  onOpenPrivacy: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  user,
  eventFocus,
  onOpenAuth,
  onOpenPrivacy
}) => {
  const navItems = [
    { id: 'scan', label: 'Face Scan', icon: Camera },
    { id: 'dashboard', label: 'Collection', icon: Sparkles },
    { id: 'tryon', label: '3D Try-On', icon: Shirt },
    { id: 'color', label: 'Colorimetry', icon: Palette },
    { id: 'posture', label: 'Posture', icon: Activity },
    { id: 'chat', label: 'Aura AI', icon: MessageSquareText },
    { id: 'marketplace', label: 'Atelier', icon: Store },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentTab('dashboard')}>
          <div className="w-9 h-9 rounded-none bg-[#1A1A1A] flex items-center justify-center text-[#F9F7F2] font-serif italic text-xl font-bold tracking-tighter group-hover:bg-[#E2D1B3] group-hover:text-[#1A1A1A] transition-colors">
            SV
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-2xl font-bold tracking-tighter text-[#1A1A1A]">
                StyleVision AI
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] bg-[#E2D1B3] text-[#1A1A1A] px-1.5 py-0.5 rounded-none border border-[#1A1A1A]/30">
                Atelier
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] py-1 transition-all ${
                  isActive
                    ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A] font-bold'
                    : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:opacity-75'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Event Focus Pill */}
          <div
            onClick={() => setCurrentTab('dashboard')}
            className="hidden sm:flex items-center space-x-2 bg-[#F3EFE6] border border-[#1A1A1A]/20 px-3 py-1 rounded-none text-xs text-[#1A1A1A] cursor-pointer hover:border-[#1A1A1A] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span className="truncate max-w-[150px] font-mono text-[11px] uppercase tracking-wider font-semibold">
              {eventFocus.title}
            </span>
          </div>

          {/* Privacy Status */}
          <button
            onClick={onOpenPrivacy}
            title="Privacy Shield Active"
            className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] bg-[#E2D1B3] border border-[#1A1A1A] px-2.5 py-1 rounded-none hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span className="hidden md:inline font-mono">Shield Active</span>
          </button>

          {/* Profile User Pill */}
          <button
            id="user-profile-button"
            onClick={onOpenAuth}
            className="flex items-center space-x-2 bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] px-3 py-1.5 rounded-none text-xs font-medium transition-all hover:bg-[#E2D1B3] hover:text-[#1A1A1A]"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-5 h-5 rounded-none object-cover border border-[#F9F7F2]/40"
              />
            ) : (
              <UserIcon className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline font-serif italic text-sm">{user.name}</span>
            {user.isElite && (
              <span className="text-[9px] bg-[#E2D1B3] text-[#1A1A1A] font-bold px-1 rounded-none uppercase tracking-widest">
                Elite
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto space-x-2 px-4 py-2 bg-[#F3EFE6] border-t border-[#1A1A1A]/20 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={`mobile-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap px-3 py-1 transition-all ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { X, User as UserIcon, Lock, Sparkles, Check } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updatedUser: Partial<User>) => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  user,
  onClose,
  onUpdateUser
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [height, setHeight] = useState(user.height || '175 cm');
  const [profession, setProfession] = useState(user.profession || 'Design Director');
  const [location, setLocation] = useState(user.location || 'Milan / New York');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdateUser({ name, email, height, profession, location });
      setSuccessMsg('Profile & Biometric Settings Saved.');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-900/40 rounded-2xl max-w-md w-full p-6 space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 border-b border-stone-800 pb-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase">STYLEVISION MEMBER PROFILE</span>
            <h3 className="font-serif text-stone-100 text-xl">{user.name}</h3>
          </div>
        </div>

        {successMsg ? (
          <div className="bg-emerald-950/80 border border-emerald-700 p-4 rounded-xl text-emerald-200 text-xs flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-300 font-mono mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg p-2.5 text-stone-100 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-stone-300 font-mono mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg p-2.5 text-stone-100 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-mono mb-1">Height (for 3D Avatar)</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg p-2.5 text-stone-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-300 font-mono mb-1">Profession</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg p-2.5 text-stone-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-300 font-mono mb-1">Location / Residence</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg p-2.5 text-stone-100 outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 text-stone-950 font-medium font-sans"
              >
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

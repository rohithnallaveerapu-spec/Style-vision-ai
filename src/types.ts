export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'DESIGNER' | 'ADMIN';
  isElite?: boolean;
  avatarUrl?: string;
  ageRange?: string;
  height?: string;
  profession?: string;
  location?: string;
  budget?: string;
  stylePreferences?: string[];
  favoriteColors?: string[];
  preferredBrands?: string[];
}

export interface UserConsents {
  photo_analysis: boolean;
  face_style_analysis: boolean;
  body_measurement_analysis: boolean;
  virtual_try_on: boolean;
  photo_storage: boolean;
  personalized_recommendations: boolean;
  analytics: boolean;
  updatedAt: string;
}

export interface UserMeasurements {
  id: string;
  userId: string;
  height: number; // in cm
  shoulder: number; // in cm
  chest: number; // in cm
  waist: number; // in cm
  hip: number; // in cm
  sleeve_length?: number;
  inseam?: number;
  shoe_size?: string;
  unit: 'cm' | 'inch';
  updatedAt: string;
}

export interface PostureProfile {
  id: string;
  userId: string;
  status: 'optimal' | 'verified' | 'pending';
  insight: string;
  tiltDetected: string;
  recommendedStrategy: string[];
  optimizedSilhouettes: {
    title: string;
    category: string;
    imageUrl: string;
    description: string;
  }[];
  scannedAt: string;
}

export interface ColorPalette {
  analyzedSkinTone: string;
  rationale: string;
  curatedTones: {
    name: string;
    hex: string;
    role: string; // e.g. "Primary Contrast", "Accent Highlight", "Base Neutral"
  }[];
  fabricRecommendations: {
    title: string;
    description: string;
    icon: string;
  }[];
  patternGeometry: {
    title: string;
    description: string;
    icon: string;
  }[];
  lookbook: {
    id: string;
    title: string;
    label: string;
    imageUrl: string;
  }[];
}

export interface OutfitItem {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'dress' | 'shoes' | 'accessory' | 'outerwear';
  brand: string;
  price: number;
  color: string;
  imageUrl: string;
  description: string;
  roleBadge?: string; // e.g. "The Main Piece", "Complementary", "Accent"
  stockists?: {
    name: string;
    price: number;
    stockStatus: string;
    deliveryDays: string;
  }[];
}

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  style: string;
  colorPalette: string[];
  items: OutfitItem[];
  estimatedCost: number;
  explanation: string;
  rationale?: string;
  isFavorite?: boolean;
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  price: number;
  imageUrl: string;
  tags: string[];
  purchaseDate?: string;
}

export interface Designer {
  id: string;
  name: string;
  title: string; // e.g. "Master Tailor", "Deconstructionist"
  location: string;
  status: 'Elite Status' | 'Verified' | 'Master';
  specialty: string[];
  startingPrice: number;
  imageUrl: string;
  portfolioImages: string[];
  bio: string;
}

export interface DesignerRequest {
  id: string;
  userId: string;
  designerId: string;
  designerName: string;
  designerAvatar: string;
  occasionDetails: string;
  fabricPreferences?: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'in_review' | 'completed';
  attachedMeasurements?: boolean;
  attachedPosture?: boolean;
  attachedPalette?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aura';
  text: string;
  timestamp: string;
  styleRationale?: string;
  suggestedItems?: OutfitItem[];
  suggestionChips?: string[];
}

export interface EventFocus {
  id: string;
  title: string;
  location: string;
  dressCode: string;
  date: string;
  bgImage: string;
}

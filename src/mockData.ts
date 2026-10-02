import {
  User,
  UserConsents,
  UserMeasurements,
  PostureProfile,
  ColorPalette,
  Outfit,
  WardrobeItem,
  Designer,
  DesignerRequest,
  ChatMessage,
  EventFocus,
  OutfitItem
} from './types';

export const initialUser: User = {
  id: 'usr_001',
  name: 'Julianne Vane',
  email: 'julianne@stylevision.ai',
  role: 'USER',
  isElite: true,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5WTmarFIAIrgYetdBoMLaVGVvDd8ZIpQ0tqvLWhKIQKUEc_p2HBzLV82FAepCh29aN8zYEhDonUfcExl5fY9TT8eFZ8Vu6mNNk1YKe_U0WvcypAsfGG0rPtVUVDviEZN4C4ckba8WAHAINJPa4y0l4TLORFILGRNi7qcQbHzkpDYkKqnR_0rJOP9RrRjSSlcgfZ3rLQuLmai3MIZsd8MEWvDV3EdonH0St0i_HbwqCHvgfYCHTJMD',
  ageRange: '25-34',
  height: '175 cm',
  profession: 'Design Director',
  location: 'Milan / New York',
  budget: 'Luxury',
  stylePreferences: ['Avant-Garde', 'Modern Tailoring', 'Sustainable Silk'],
  favoriteColors: ['Deep Emerald', 'Antique Gold', 'Rich Cream'],
  preferredBrands: ['Maison Laurent', 'Aria Solis', 'Elias Vance']
};

export const initialConsents: UserConsents = {
  photo_analysis: true,
  face_style_analysis: true,
  body_measurement_analysis: true,
  virtual_try_on: true,
  photo_storage: true,
  personalized_recommendations: true,
  analytics: true,
  updatedAt: new Date().toISOString()
};

export const initialMeasurements: UserMeasurements = {
  id: 'meas_001',
  userId: 'usr_001',
  height: 175,
  shoulder: 41,
  chest: 86,
  waist: 66,
  hip: 92,
  sleeve_length: 60,
  inseam: 82,
  shoe_size: 'EU 39',
  unit: 'cm',
  updatedAt: new Date().toISOString()
};

export const initialEventFocus: EventFocus = {
  id: 'evt_001',
  title: 'Summer Wedding in Tuscany',
  location: 'Villa Cetinale, Siena',
  dressCode: 'Black Tie Optional, breathable fabrics.',
  date: 'Next Month',
  bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw2lIMgqB9puVPmfhlHEbbRaBY1m4gMj-CHPSxufj2QbONFb9oUir9ZQNKN9FOV59hwefvRmQdeQz_S4JuX4FAUFx6iWQu3M19f7YfxTBEZvs9hRKajHyXv5KjUP9nmW2lqXE6I28SqbLRhUbhiRFBhE6rtwhvMvoVqYEGEAX5yIq57FkaSuvGU8GW209sOS6RiDGl1OhGJ5alcGCE-keCHZOiJqT0LL73QBNIwz4yrRfujDubbKpF'
};

export const initialPostureProfile: PostureProfile = {
  id: 'post_001',
  userId: 'usr_001',
  status: 'verified',
  insight: 'Slightly forward shoulder tilt detected.',
  tiltDetected: 'Forward Shoulder Angle (~4.2°)',
  recommendedStrategy: [
    'Structured shoulders to create visual balance and width.',
    'V-necklines to draw the eye vertically and open the chest area.'
  ],
  optimizedSilhouettes: [
    {
      title: 'Structured Blazer',
      category: 'Architecture',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArkoRLkjq_CEVUQTP4fHM7URyGpPyQ-x7yborqK0BIe8CCRBB1SD6Uaksg5aUkPza8S6nX93HRU-RA4v-8b2RWR3JO_0pAPzYni5gXwdr7SYd4dW4FYhtSmyRKYlBYdTUFbGcc842RGdwTNAeu7_HwLoVVIOoTQssTH9Vr69qCN2U2OBHI0T4UFlemfGkgHhwBsOsWoCsqgOzs5e6rqhBusovx5k1iTnR-7ZWzC0d-FweQDlJssrzv',
      description: 'Padded shoulder inserts and sharp posture-aligning cut.'
    },
    {
      title: 'A-Line Midi',
      category: 'Balance',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4Jzk_ESGN2iVoOUHs7J8nCWMuuzcZ_EVg0EMUf44mGG7yFxjOmv2FBYfm4ctHXbzrmDsM6PEiCz4f4BF8umY-Vp-qiXqwkRah0w6hglrPvCC4BkaHNX3PZwAwocRiJCAd5XIVpnYqw-rwhw3w05IQ97zpKBU4jOQ8qWE0gpDCEQwuBNhi5mlCA8Fugid_Pe2ykxYGMz5H_lCFxKrt1yMWWG3zrUuBcvV6QwLVDGoIpb9oSDGk5z4N',
      description: 'Deep V-neckline elongating the neck and opening the chest.'
    }
  ],
  scannedAt: 'Today, 2:10 PM'
};

export const initialColorPalette: ColorPalette = {
  analyzedSkinTone: 'Warm Ivory',
  rationale: 'These tones enhance your natural warmth and contrast perfectly with your hair color. The golden undertones in your skin are best complemented by rich, earthy jewel tones and luxurious creams, avoiding stark, cool whites.',
  curatedTones: [
    { name: 'Deep Emerald', hex: '#047857', role: 'PRIMARY CONTRAST' },
    { name: 'Antique Gold', hex: '#D4AF37', role: 'ACCENT HIGHLIGHT' },
    { name: 'Rich Cream', hex: '#FDFBF7', role: 'BASE NEUTRAL' }
  ],
  fabricRecommendations: [
    {
      title: 'Silk Textures',
      description: 'Reflects light beautifully, enhancing the golden glow of your skin.',
      icon: 'water_drop'
    },
    {
      title: 'Cashmere Blends',
      description: 'Provides a matte contrast that grounds the luxurious sheen of silks.',
      icon: 'line_weight'
    }
  ],
  patternGeometry: [
    {
      title: 'Geometric Mediterranean',
      description: 'Structured but fluid patterns that add visual interest without overwhelming your natural contrast.',
      icon: 'category'
    },
    {
      title: 'Subtle Jacquard',
      description: 'Tonal patterns that create depth through texture rather than stark color contrast.',
      icon: 'texture'
    }
  ],
  lookbook: [
    {
      id: 'look_01',
      title: 'Evening Elegance',
      label: 'Look 01',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCteKd19vvKp_rCrbrcyeWaPVn8O1OYj398QbDpmTz7M6ROylNYMDT1BPO15clvLib-3czJu-32Bq4lNRebktAQ3kIyC4bwHtUkSRNrwp-Uvd8n0Ltc-zDX609CRzOMd7hYtNqofA3Rid_66c_4Cxzwi1DhlY3ZPAcpFBWRGhQPowq34PaqLg_v5gTd97asEQ-n_wkmm37NqMrbC3J9RgnYCg6WB0e3sqyXI0rgxVaKP6hmvLMn0knN'
    },
    {
      id: 'look_02',
      title: 'Daytime Structure',
      label: 'Look 02',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImlI8HM8eg_gLGm-nhoVPYJK6VZ9GT6PaMank0rdniEjmAJLUHVWNVhxlOkq0YEivMZi6wnKTValJ9wxJFLRrwkJg9SHXT3gq9XBjg2Z0EtXT-07J3bGXp4C2XD1ZjZLs2pNKi1IEYzSI_tnMY7iSIYTLT1Zr_-mcNwAUl3St6W-0FvBZKH51nPlH-8w3NiZq0Bq1thP3J_M2jZQ3iKe7e9ILAYukCXg8nSbKQkKkaA6ayTq5Ms-i'
    }
  ]
};

export const sampleWardrobeItems: OutfitItem[] = [
  {
    id: 'item_01',
    name: 'Emerald Silk Gown',
    category: 'dress',
    brand: 'Aria Solis',
    price: 850,
    color: 'Deep Emerald',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAszrCsiSCWiiE5ZFXTiCBjYGKNroOmtz3svu9YhxragaYs_J2EDkyFHsEhXznP3pV3ZqvVckjaEGBRQfUuH4Hmsm8cE7gbu7Kr2V-_K8sqSjxkRH8zCLEqdMmI8A8-dAeXJ9xJeuBO8msSbFL_fm7IIDJ8wcqm8c5479s7LOcmMC0Q1IUCPX4zh5kZYSkBx-W1AZfa8gGSav_pp0mKdeJm_jvGs-r4DVTpWr53TJd_Bm1XOySqDqA',
    description: 'Floor length silk slip gown with bias cut for comfortable movement during long outdoor Tuscan events.',
    roleBadge: 'The Main Piece'
  },
  {
    id: 'item_02',
    name: 'Aura Gold Sandals',
    category: 'shoes',
    brand: 'Maison Laurent',
    price: 1200,
    color: 'Antique Gold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYCBOpmPxdNpEqi7vdkzFqxt827oX-BiTU4_4ZveIQFEVAd-caPLXQLqN_j01V2ZZzK6_0co8BcNWH5nbdmqDa8ZjBKtAze99DnQPl3p7ahkeSHZuOnjLzPudIjDqj0532eRf85P7Nubh36NZxgfN7TiXdOGL-0VGLxtvqTyGHS0sPoy8lgyihGJ80Ux3qtSmvSClDN3DwfGTnzrOIjbfodFOhTVE3TvjPVNFDxq1Pk5s-kPkVqkD_',
    description: 'Minimalist gold strappy stiletto sandals balancing the richness of the emerald gown.',
    roleBadge: 'Complementary'
  },
  {
    id: 'item_03',
    name: 'Structural Cuff',
    category: 'accessory',
    brand: 'Elias Vance',
    price: 650,
    color: 'Antique Gold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc7wbCpgYwAV01D5_WsRJ29y7FIB9FxEW-tHzY4glnP6jZApCTDn72N1XZ4e4-njF6rknSoMG_piQrVUgT2tDBp31OBqX5jYWuCdpUO_MIV07V0bIAx9J-ow6np_0jT4PJyTOUNOWUwA3u0PjU5dAo4EQYcscJov_2wQFJbqjgNqKOBzLBa6H4_roMNEIqlyImxqxKw6dHLPqU6BZTNxx_fF-_w_zZ76PxI9FvLa3ZQ4m4iHo0w0EQ',
    description: 'Delicate, architectural gold cuff bracelet adding a modern touch without overwhelming the silk.',
    roleBadge: 'Accent'
  },
  {
    id: 'item_04',
    name: 'Oversized Cream Blazer',
    category: 'outerwear',
    brand: 'Elias Vance',
    price: 850,
    color: 'Rich Cream',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBawH239rAQzaNkBxmt4VZXVlcbKvqTTQtPYMPxQE-DiRQPcMRzllaLoE2wQc5GWi5Z45hoJrMT1_mGE_nZOCvH9wAsGc1_U1mJV8YznaPB6lTW6atilZz9OyUU3zQl2yYCoPFHoan-1lohGEURXzxPEkg-QnERdq6XmO9mR5wzN23a8_n0dIRqh6cWMkiynXHaU5ZbZcW1lMN8_v4_hj4CwchYFWkmb94LNFhdXjOSU6pLeBQizxK3',
    description: 'Structured shoulders, Italian wool blend.'
  },
  {
    id: 'item_05',
    name: 'Silk Noir Slip Dress',
    category: 'dress',
    brand: 'Studio Nomi',
    price: 1200,
    color: 'Charcoal Black',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlACjmbsDUpupTvE2twRCqTnIgRodzSes1bIGYiTE4ITVbTT0h2Fj3LfHA2fFTBdPkLZ91WQLHOTLWGNw2dHmyw4bYQj5rQLxFyQcixWmLwOyunDWl2duq8HVz033T4YkqWcOAnvMB5QRH9xtdtJWFXy_4uiwlDV8FeXAhPtJT2vqYRpijHlGlEbAgpfaedut5CHUmA8jnqPcbpIFQjZ9bfCtDkQrAh42zORnfXpBl5bb9IhPHsg27',
    description: 'Bias cut, draped cowl neckline.'
  },
  {
    id: 'item_06',
    name: 'Camel Wide-Leg Trousers',
    category: 'bottom',
    brand: 'Elias Vance',
    price: 650,
    color: 'Camel Beige',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAunqDQ_2W08BYG5VsSeTijw-_H-Th2xR_V3pcahAr8phd_07Gb5YLnIMQosF_sE2bTK49_woiiH7YHS9WS4ylmylCYt9Jcq7XCZTeuBzYvP_htdpP-diaVafEczW0x72bkrWN8LzV9OYAVBQw0ClagKtjEftExweWF4-ehpttMQtYitVGKY9Ma6BlZ6JxE04A-dU4AWWuMafi_12wkYs8x8iZgPntZxEE7zMVGovUOLbnjLga73wWg',
    description: 'High-waisted, double pleat detailing.'
  },
  {
    id: 'item_07',
    name: 'The Structural Blazer',
    category: 'outerwear',
    brand: 'Elias Vance',
    price: 1250,
    color: 'Charcoal Grey',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9202s2_5ISX96aTD4KBfW8z9HX9jhJE-odnSkNccA2PTSz86ukWYS8WlvUBLKzAKNxnOv6g0GyJTqi05-1Rtj178NajifjoyvuG9jaIG93gyQTztPFiZJG9LWOGO1KLO-FWJM0hdQ1zljOMp2o4qXla6_pvwHc9A_thGUpxtc2pvpK9FyQzak514V_0AxPHzcK0cr9FpM8oDosAI93OnvJbuXBjgTtrQCV5jas1z-6B9TOsudSa_C',
    description: 'A masterful blend of sharp geometric tailoring and fluid drape. Exaggerated shoulders and nipped waist.',
    stockists: [
      { name: 'Ssense', price: 1250, stockStatus: 'In Stock (2 left)', deliveryDays: '2 Days' },
      { name: 'MatchesFashion', price: 1280, stockStatus: 'Low Stock (Size S only)', deliveryDays: '3-5 Days' }
    ]
  }
];

export const sampleDesigners: Designer[] = [
  {
    id: 'des_001',
    name: 'Aria Solis',
    title: 'Deconstructionist • Tokyo',
    location: 'Tokyo & Paris',
    status: 'Elite Status',
    specialty: ['Avant-Garde', 'Sustainable Silk'],
    startingPrice: 3500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSJjGF16O6tMuxBiRcvm_qBtbKu7_blKp4-x4vmC583vrXDb9PBuZSL-L592gA3wiW4t7VB70rHnqhbf8kffMMV-RnFuuSSsSiQupgu6l7ACX84b2CDX0dOrssSMYbjJYbcnDIGrYM8dvPkTfpfmntBq15Zm6QlRqI6ouIyUPtrIWw4f5huvnflfocrLffo7Fv_nhoc-UVG9T1SbsvvhYw6Rf5Gq3-0EVJdmLvXGaFXVuLA7slMEzS',
    portfolioImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0FSewAtHT_3L5Bc46_upu_vPVMbY0kW5X5liTCUj2ao_I7okf7H5JNKxkS-iBapaimUlJDnfu8NQfV6WFqhN1_2eKs7IgVYjtTCHsZ4iueg5tvJe_8OvcDemexbjBKiEz15NDxZuq1OZctn4MTQuj6IMWtqzrnDqWFoX0rsf0Ypi3Secqwos5RNoLZSAY0CeXwKB0xq9i3ddRms_cZ8v2fQ9adTffmGsvs1PiFQbaNmjb0lM51KoH'
    ],
    bio: 'Pioneering sculptural silhouettes made exclusively from ethically harvested organic peace silks.'
  },
  {
    id: 'des_002',
    name: 'Maison Laurent',
    title: 'Haute Couture House',
    location: 'Paris',
    status: 'Elite Status',
    specialty: ['Traditional', 'Haute Couture'],
    startingPrice: 5200,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgHlVc8TQwfBE3PMQj8oyoK4NnlLTkdmXBvGPOFjaJdswIIOPxpvXe51R9xxwL4VPTZf3xeunmqofNbi0dqlVikEOL_WsCqR8zzRLDI10McNokiJA_4bETj6fEyIbXLsdy_VwYkBXCL30zhpRv1KNWPTqOliDAa5bW-L5N4xPSNEw3G9PYkmAVx1PpSd1nIL8qlGuDKMATjjctbpARwC_k6bBjlecX6KqwImqGg8s71_CpN23hDnUz',
    portfolioImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgHlVc8TQwfBE3PMQj8oyoK4NnlLTkdmXBvGPOFjaJdswIIOPxpvXe51R9xxwL4VPTZf3xeunmqofNbi0dqlVikEOL_WsCqR8zzRLDI10McNokiJA_4bETj6fEyIbXLsdy_VwYkBXCL30zhpRv1KNWPTqOliDAa5bW-L5N4xPSNEw3G9PYkmAVx1PpSd1nIL8qlGuDKMATjjctbpARwC_k6bBjlecX6KqwImqGg8s71_CpN23hDnUz'
    ],
    bio: 'Century-old Parisian craftsmanship blending hand-embroidery with contemporary digital pattern drafting.'
  },
  {
    id: 'des_003',
    name: 'Elias Vance',
    title: 'Master Tailor • Milan',
    location: 'Milan',
    status: 'Master',
    specialty: ['Luxury', 'Modern Tailoring'],
    startingPrice: 2100,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzy8X7NhI1pNwG3eMw6aNjojo9kVImPPrh4-y-KPH2AGhbdAHtYpsiJNCYWzjRISX3qj32g2zNVuQ7qZ7a1up2gq-NaB9zjSxD2yIF0UzDQN9zNvqWZgWBJS1SdONe02gF6KXmi2cF-b1cYKvxY0OJrvpPRjBV-a6qjaK9qsDO_fQ5TrdyVvwrJsLQHG2x7sdH9S9--w3RKSlLtxTRJ7AFN0RWe9RCt1GfztXBY4yS66rLoMp-xj0e',
    portfolioImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwtE4LEeCVOONlAEsMb3JG-QPoVz-cmdXQEwbYyw4NXO2hr9XxN1bKEEt10qig9f3VKdrDNk2ht2tmF-fDqAK5HwUbYy_yJ1XWoEAGjYW5TgQ8f4s9ezQ3tkH-oMRi7Sdwp5VTGhKGkS-i-R3h2rC1ZB1Yne-yS1Ouf2BgBD77g9m6tXxaU3ZcCdM5LvDrydVV5bSjuPhABI1fT-cPOpMEU9jDLGukrQ6QeiMp7tKCB7_tIHM9vdQO'
    ],
    bio: 'Specializing in hyper-structured architectural suits tailored to individual biometric posture scans.'
  },
  {
    id: 'des_004',
    name: 'Studio Nomi',
    title: 'Zero-Waste Artisan',
    location: 'Stockholm',
    status: 'Verified',
    specialty: ['Sustainable', 'Zero-Waste'],
    startingPrice: 1800,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvSbiMVJZ_9iXbUMY5tTpqvFt0l7m5oaNxQmqpOXiY34G-XnkavHQRxMT187h5bROstOPlJ1vGFVGQCCanCtTKFIRGkuI7svkqdOVuhvURJsNvYyV-WeRJRlFxX8XpcxiztvbLYYc51GVTxPAVGDBZ2fILQAVz0HuafTR33OIXhqQ5l01MkbMY60x-H7xmR2Jdwh7S11vEKLxZjBHGDIok0DoWysjOO39pT70tmWZ43iYZRQjspieF',
    portfolioImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvSbiMVJZ_9iXbUMY5tTpqvFt0l7m5oaNxQmqpOXiY34G-XnkavHQRxMT187h5bROstOPlJ1vGFVGQCCanCtTKFIRGkuI7svkqdOVuhvURJsNvYyV-WeRJRlFxX8XpcxiztvbLYYc51GVTxPAVGDBZ2fILQAVz0HuafTR33OIXhqQ5l01MkbMY60x-H7xmR2Jdwh7S11vEKLxZjBHGDIok0DoWysjOO39pT70tmWZ43iYZRQjspieF'
    ],
    bio: 'Fluid, diaphanous garments crafted with zero-waste Scandinavian draping techniques.'
  },
  {
    id: 'des_005',
    name: 'Elena Rostova',
    title: 'Master Tailor • Milan',
    location: 'Milan',
    status: 'Master',
    specialty: ['Bespoke Gowns', 'High Tailoring'],
    startingPrice: 4200,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYa6twtt3kieh9jTVasd_nZn-mLsJNB3xfEaRDkcRxOq-DSjCrk3FDH4bl9o88v73a5i_6Chw5PnHHc4_KLH_NVO5E7FIoIBue9ZsTMOaYVd5VE9-O7WONCY_3eM36T1onV0aH1h6lFp6GyYEXDMjwFGv2V5Avadjqiz9XFfKtfhOOM5ue7JIwlYDXjbhdjIFrizT1kUW6OcmBQXzw5niYGhazS0Svcwb9u5ydNhHP4Ve_aumVsQqd',
    portfolioImages: [],
    bio: 'Elegance personified. Known for bespoke red-carpet pieces and private atelier pattern drafting.'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    sender: 'user',
    text: 'I need an outfit for a summer wedding in Tuscany next month. Something elegant but breathable.',
    timestamp: 'Today, 2:14 PM'
  },
  {
    id: 'msg_002',
    sender: 'aura',
    text: "Tuscany in summer calls for lightweight fabrics like silk or high-quality linen. I've curated a few options that blend Mediterranean romance with high-end tailoring.",
    styleRationale: 'These emerald tones complement your skin tone beautifully for a summer setting, while the bias cut ensures comfortable movement during a long outdoor event.',
    timestamp: 'Today, 2:14 PM',
    suggestedItems: [sampleWardrobeItems[0], sampleWardrobeItems[1]],
    suggestionChips: ['See on my avatar', 'Suggest accessories', 'Lower budget options']
  }
];

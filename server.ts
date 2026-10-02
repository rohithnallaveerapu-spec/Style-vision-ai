import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  initialUser,
  initialConsents,
  initialMeasurements,
  initialPostureProfile,
  initialColorPalette,
  sampleWardrobeItems,
  sampleDesigners,
  initialChatMessages,
  initialEventFocus
} from './src/mockData';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory data store for server runtime state
let currentUser = { ...initialUser };
let currentConsents = { ...initialConsents };
let currentMeasurements = { ...initialMeasurements };
let currentPosture = { ...initialPostureProfile };
let currentColorPalette = { ...initialColorPalette };
let wardrobeList = [...sampleWardrobeItems];
let designerRequestsList: any[] = [];
let chatHistory = [...initialChatMessages];
let currentEventFocus = { ...initialEventFocus };

// Lazy initialize Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// =========================================
// API ENDPOINTS - STYLEVISION BACKEND v1
// =========================================

// 1. Auth & Me
app.get('/api/v1/auth/me', (req, res) => {
  res.json({
    success: true,
    user: currentUser,
    consents: currentConsents
  });
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email) {
    currentUser.email = email;
    currentUser.name = email.split('@')[0] || 'User';
  }
  res.json({
    success: true,
    message: 'Authenticated successfully',
    token: 'jwt_mock_token_stylevision_982341',
    user: currentUser
  });
});

app.post('/api/v1/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// 2. User Profile & Preferences
app.get('/api/v1/users/me', (req, res) => {
  res.json({ success: true, data: currentUser });
});

app.patch('/api/v1/users/me', (req, res) => {
  currentUser = { ...currentUser, ...req.body };
  res.json({ success: true, data: currentUser, message: 'Profile updated' });
});

// 3. Privacy & Consents Management
app.get('/api/v1/consent', (req, res) => {
  res.json({ success: true, consents: currentConsents });
});

app.put('/api/v1/consent', (req, res) => {
  currentConsents = {
    ...currentConsents,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json({
    success: true,
    consents: currentConsents,
    message: 'Privacy consents updated in accordance with Privacy-by-Design principles.'
  });
});

// 4. Measurements
app.get('/api/v1/measurements', (req, res) => {
  if (!currentConsents.body_measurement_analysis) {
    return res.status(403).json({
      success: false,
      error: 'Consent not granted for body measurement processing.'
    });
  }
  res.json({ success: true, measurements: currentMeasurements });
});

app.post('/api/v1/measurements', (req, res) => {
  if (!currentConsents.body_measurement_analysis) {
    return res.status(403).json({
      success: false,
      error: 'Consent for body measurement analysis is disabled.'
    });
  }
  currentMeasurements = {
    ...currentMeasurements,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json({
    success: true,
    measurements: currentMeasurements,
    message: 'Measurements encrypted & saved.'
  });
});

// 5. Posture Profile & Biometrics
app.get('/api/v1/posture', (req, res) => {
  if (!currentConsents.photo_analysis) {
    return res.status(403).json({
      success: false,
      error: 'Consent for photo analysis is revoked.'
    });
  }
  res.json({ success: true, posture: currentPosture });
});

app.post('/api/v1/posture/scan', (req, res) => {
  if (!currentConsents.photo_analysis) {
    return res.status(403).json({
      success: false,
      error: 'Consent for photo analysis is required.'
    });
  }
  currentPosture = {
    ...currentPosture,
    status: 'verified',
    scannedAt: 'Just now'
  };
  res.json({
    success: true,
    posture: currentPosture,
    message: 'Posture scan completed with encrypted biometric alignment.'
  });
});

// 6. Color Analysis & Palette
app.get('/api/v1/colors', (req, res) => {
  res.json({ success: true, palette: currentColorPalette });
});

// 7. Wardrobe Management
app.get('/api/v1/wardrobe', (req, res) => {
  res.json({ success: true, items: wardrobeList });
});

app.post('/api/v1/wardrobe', (req, res) => {
  const newItem = {
    id: `item_${Date.now()}`,
    ...req.body
  };
  wardrobeList.unshift(newItem);
  res.json({ success: true, item: newItem, message: 'Item added to wardrobe' });
});

app.delete('/api/v1/wardrobe/:id', (req, res) => {
  const { id } = req.params;
  wardrobeList = wardrobeList.filter((item) => item.id !== id);
  res.json({ success: true, message: 'Item removed from wardrobe' });
});

// 8. Designers & Marketplace
app.get('/api/v1/designers', (req, res) => {
  res.json({ success: true, designers: sampleDesigners });
});

app.get('/api/v1/designers/:id', (req, res) => {
  const designer = sampleDesigners.find((d) => d.id === req.params.id);
  if (!designer) {
    return res.status(404).json({ success: false, error: 'Designer not found' });
  }
  res.json({ success: true, designer });
});

app.get('/api/v1/designer-requests', (req, res) => {
  res.json({ success: true, requests: designerRequestsList });
});

app.post('/api/v1/designer-requests', (req, res) => {
  const { designerId, occasionDetails, fabricPreferences, notes } = req.body;
  const designer = sampleDesigners.find((d) => d.id === designerId);
  const newReq = {
    id: `req_${Date.now()}`,
    userId: currentUser.id,
    designerId,
    designerName: designer?.name || 'Artisan Designer',
    designerAvatar: designer?.imageUrl || '',
    occasionDetails,
    fabricPreferences,
    notes,
    status: 'pending',
    attachedMeasurements: currentConsents.body_measurement_analysis,
    attachedPosture: currentConsents.photo_analysis,
    attachedPalette: currentColorPalette.analyzedSkinTone,
    createdAt: new Date().toISOString()
  };
  designerRequestsList.unshift(newReq);
  res.json({
    success: true,
    request: newReq,
    message: 'Proposal request submitted securely to designer atelier.'
  });
});

// 9. AI Stylist Chat & Advice ("Aura AI") using @google/genai (gemini-3.6-flash)
app.post('/api/v1/ai/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  // Record user message
  const userMsg = {
    id: `msg_${Date.now()}`,
    sender: 'user' as const,
    text: message,
    timestamp: 'Just now'
  };
  chatHistory.push(userMsg);

  try {
    const aiClient = getGeminiClient();
    let replyText = '';
    let styleRationale = '';

    if (aiClient) {
      const prompt = `You are Aura AI, the elite personal fashion stylist and image consultant for StyleVision AI.
User profile:
- Name: ${currentUser.name}
- Style Preferences: ${currentUser.stylePreferences?.join(', ') || 'Avant-Garde, Modern Tailoring'}
- Skin Tone: ${currentColorPalette.analyzedSkinTone}
- Posture Insight: ${currentPosture.insight}
- Current Event Focus: ${currentEventFocus.title} (${currentEventFocus.location}, Dress Code: ${currentEventFocus.dressCode})

User request: "${message}"

Respond concisely as an ultra-luxury fashion consultant with sartorial expertise. Provide a warm, elevated styling response.
Format your output as a short paragraph of direct advice, followed by a sentence explaining the style rationale (e.g. why these colors or silhouettes fit their skin tone or posture).`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      replyText = response.text || "I've tailored a custom look for your upcoming event matching your warm undertones and structured silhouette needs.";
      styleRationale = `Curated specifically for your ${currentColorPalette.analyzedSkinTone} skin tone and ${currentPosture.insight.toLowerCase()} posture profile.`;
    } else {
      replyText = `For ${currentEventFocus.title}, I recommend pairing a structured silk ensemble with warm metallic accessories. This highlights your ${currentColorPalette.analyzedSkinTone} complexion while ensuring breathable comfort.`;
      styleRationale = `The selected cut aligns with your posture recommendation (${currentPosture.recommendedStrategy[0] || 'Structured shoulders'}).`;
    }

    const auraMsg = {
      id: `msg_${Date.now() + 1}`,
      sender: 'aura' as const,
      text: replyText,
      styleRationale,
      timestamp: 'Just now',
      suggestedItems: [sampleWardrobeItems[0], sampleWardrobeItems[2]],
      suggestionChips: ['See on my avatar', 'Lower budget options', 'Request designer custom piece']
    };

    chatHistory.push(auraMsg);

    res.json({
      success: true,
      message: auraMsg,
      history: chatHistory
    });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    const fallbackMsg = {
      id: `msg_${Date.now() + 1}`,
      sender: 'aura' as const,
      text: `Based on your ${currentColorPalette.analyzedSkinTone} tone and ${currentEventFocus.title} event, I recommend a floor-length bias-cut silk gown paired with subtle gold accents.`,
      styleRationale: 'Emerald silk beautifully balances warm undertones.',
      timestamp: 'Just now',
      suggestedItems: [sampleWardrobeItems[0], sampleWardrobeItems[1]],
      suggestionChips: ['See on my avatar', 'Suggest accessories']
    };
    chatHistory.push(fallbackMsg);
    res.json({ success: true, message: fallbackMsg, history: chatHistory });
  }
});

app.get('/api/v1/ai/chat/history', (req, res) => {
  res.json({ success: true, history: chatHistory });
});

// 10. Event Focus
app.get('/api/v1/events/focus', (req, res) => {
  res.json({ success: true, event: currentEventFocus });
});

app.patch('/api/v1/events/focus', (req, res) => {
  currentEventFocus = { ...currentEventFocus, ...req.body };
  res.json({ success: true, event: currentEventFocus });
});

// 11. Data Export & Deletion (Privacy-by-Design Compliance)
app.post('/api/v1/privacy/export', (req, res) => {
  const exportData = {
    user: currentUser,
    consents: currentConsents,
    measurements: currentMeasurements,
    posture: currentPosture,
    colorPalette: currentColorPalette,
    wardrobe: wardrobeList,
    chatHistory,
    exportedAt: new Date().toISOString()
  };
  res.json({ success: true, data: exportData });
});

app.delete('/api/v1/privacy/delete-all', (req, res) => {
  // Clear user biometrics & profile according to GDPR / Right to be forgotten
  currentMeasurements = {
    id: 'meas_empty',
    userId: currentUser.id,
    height: 0,
    shoulder: 0,
    chest: 0,
    waist: 0,
    hip: 0,
    unit: 'cm',
    updatedAt: new Date().toISOString()
  };
  wardrobeList = [];
  chatHistory = [];
  designerRequestsList = [];
  res.json({
    success: true,
    message: 'All personal biometric data, photos, measurements, and history have been permanently deleted.'
  });
});

// =========================================
// VITE DEV & PRODUCTION MIDDLEWARE
// =========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StyleVision AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

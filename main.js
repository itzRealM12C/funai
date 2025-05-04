import { marked } from "marked";

// Define SVG icons
const ICONS = {
  openai: `<img src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-on-transparent-background-png.png" alt="OpenAI" width="1.5em" height="1.5em" style="border-radius: 50%; background: white; padding: 2px; box-sizing: border-box; object-fit: contain;">`, // Updated URL with improved sizing and styling
  gemini: `<img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="Gemini" width="1.5em" height="1.5em" style="border-radius: 50%; background: white; padding: 2px; box-sizing: border-box;">`, // Increased size, added white background and padding
  mistral: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.54-1.97-.63-2.21.7-.26 1.47-.41 2.25-.41.21 0 .42-.02.63-.05-.18.65-.45 1.34-.88 2.07zM12 4.04c-.83 1.2-1.48 2.53-1.91 3.96h3.82c-.43-1.43-1.08-2.76-1.91-3.96zM4.26 14C4.11 13.35 4 12.68 4 12s.11-1.35.26-2h2.95c.09.24.31.96.63 2.21-.32 1.25-.54 1.97-.63 2.21H4.26zm-.08 1.97c-.18-.65-.45-1.34-.88-2.07.32.03.63.05.95.05.78 0 1.55-.15 2.25-.41-.09.24-.31.96-.63 2.21H4.18zm3.82 1.97c.09-.24.31-.96.63-2.21h2.95c.15.65.26 1.32.26 2s-.11 1.35-.26 2h-2.95c-.32-.96-.54-1.68-.63-1.99zM12 19.96c.83-1.2 1.48-2.53 1.91-3.96h-3.82c.43 1.43 1.08 2.76 1.91 3.96zm3.82-.01c.09.24.31.96.63 2.21h-2.95c-.15-.65-.26-1.32-.26-2s.11-1.35.26-2h2.95c.32 1.25.54 1.97.63 2.21zM19.74 14c.15-.65.26-1.32.26-2s-.11-1.35-.26-2h-2.95c-.09.24-.31.96-.63 2.21.32 1.25.54 1.97.63 2.21h2.95zm-1.92-2.07c.43-.73.7-1.42.88-2.07-.32-.03-.63-.05-.95-.05-.78 0-1.55.15-2.25.41.09-.24.31-.96.63-2.21h2.95c.18.65.45 1.34.88 2.07-.32-.03-.63-.05-.95-.05-.78 0-1.55.15-2.25.41zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`, // Star/Wind abstract
  claude: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>`, // Simple A/I block
  system_default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>`, // Info circle
  system_globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm5-.01c1.95-.49 3.5-2.18 3.91-4.25-.14-.14-.29-.28-.42-.42l-1.48-1.48 1.48-1.48c.14-.14.29-.28.42-.42.41-2.07-1.96-4.7-3.91-4.25V4.08c-1.84.49-3.5 2.18-3.91 4.25.14.14.29.28.42.42l1.48 1.48-1.48 1.48c-.14.14-.29.28-.42.42-.41 2.07 1.96 4.7 3.91 4.25v1.93zM12 4.07c-1.84.49-3.5 2.18-3.91 4.25.14.14.29.28.42.42l1.48 1.48-1.48 1.48c-.14.14-.29.28-.42.42-.41 2.07 1.96 4.7 3.91 4.25V4.07zM5.27 8.29c-.14-.14-.29-.28-.42-.42C4.44 6.44 6.13 4.49 8 4.08v1.93c-1.1 0-2 .9-2 2v1h-1.73zm-.08 1.97c-.18-.65-.45-1.34-.88-2.07.32.03.63.05.95.05.78 0 1.55-.15 2.25-.41-.09.24-.31.96-.63 2.21H4.18zm3.82 1.97c.09-.24.31-.96.63-2.21h2.95c.15.65.26 1.32.26 2s-.11 1.35-.26 2h-2.95c-.32-.96-.54-1.68-.63-1.99zM12 19.96c.83-1.2 1.48-2.53 1.91-3.96h-3.82c.43 1.43 1.08 2.76 1.91 3.96zm3.82-.01c.09.24.31.96.63 2.21h-2.95c-.15-.65-.26-1.32-.26-2s.11-1.35.26-2h2.95c.32 1.25.54 1.97.63 2.21zM19.74 14c.15-.65.26-1.32.26-2s-.11-1.35-.26-2h-2.95c-.09.24-.31.96-.63 2.21.32 1.25.54 1.97.63 2.21h2.95zm-1.92-2.07c.43-.73.7-1.42.88-2.07-.32-.03-.63-.05-.95-.05-.78 0-1.55.15-2.25.41.09-.24.31-.96.63-2.21h2.95c.18.65.45 1.34.88 2.07-.32-.03-.63-.05-.95-.05-.78 0-1.55.15-2.25.41zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`, // Globe icon
  system_settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.73-1.71-.99l-.37-2.65c-.06-.24-.27-.42-.51-.42h-4c-.25 0-.45.18-.51.42l-.37 2.65c-.62.26-1.19.59-1.71.99l-2.49 1c-.22-.09-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.73 1.71.99l.37 2.65c.06.24.27.42.51.42h4c.25 0-.45-.18-.51-.42l-.37-2.65c.62-.26 1.19-.59 1.71-.99l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-2.03-2.41c.43-.44.9-.83 1.41-1.14l.16-.09 1.25-.99-.86-1.48-1.54.62-.85-.65c-.22-.17-.4-.4-.59-.61-.2-.2-.44-.4-.65-.59l-.65-.85.62-1.54-.48 1.54.85.65c-.17.22-.4.4-.61.59-.2.2-.44.4-.65.61l-.65.85 1.48.62-.86 1.48.99 1.25.16-.09c.31.51.7 1.08 1.14 1.41.44.43.83.9 1.14 1.41l.09-.16 1.25-.99 1.48.86.62-1.54-.85.65c.17.22.4.4.61.59.2.2.44.4.65.61l.65.85-1.54-.62.86-1.48.99-1.25.16-.09zm-1.71 3.36c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`, // Settings icon
  system_image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`, // Image icon
  system_video: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M18 10l4-4v12l-4-4H6a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h12l4-4v12l-4-4h-12zM12 4.04c-.83 1.2-1.48 2.53-1.91 3.96h3.82c-.43-1.43-1.08-2.76-1.91-3.96zM4.26 14C4.11 13.35 4 12.68 4 12s.11-1.35.26-2h2.95c.09.24.31.96.63 2.21-.32 1.25-.54 1.97-.63 2.21H4.26zm-.08 1.97c-.18-.65-.45-1.34-.88-2.07.32.03.63.05.95.05.78 0 1.55-.15 2.25-.41-.09.24-.31.96-.63 2.21H4.18zm3.82 1.97c.09-.24.31-.96.63-2.21h2.95c.15.65.26 1.32.26 2s-.11 1.35-.26 2h-2.95c-.32-.96-.54-1.68-.63-1.99zM12 19.96c.83-1.2 1.48-2.53 1.91-3.96h-3.82c.43 1.43 1.08 2.76 1.91 3.96zm3.82-.01c.09.24.31.96.63 2.21h-2.95c-.15-.65-.26-1.32-.26-2s.11-1.35.26-2h2.95c.32 1.25.54 1.97.63 2.21zM19.74 14c.15-.65.26-1.32.26-2s-.11-1.35-.26-2h-2.95c-.09.24-.31.96-.63 2.21.32 1.25.54 1.97.63 2.21h2.95zm-1.92-2.07c.43-.73.7-1.42.88-2.07-.32-.03-.63-.05-.95-.05-.78 0-1.55.15-2.25.41.09-.24.31-.96.63-2.21h2.95c.18.65.45 1.34.88 2.07-.32-.03-.63-.05-.95-.05-.78 0-1.55.15-2.25.41zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`, // Video icon
  system_error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v8z"/></svg>` // Error icon (Exclamation in circle)
};

const PARTICIPANTS = [
  { name: "OpenAI", iconKey: "openai", personality: "analytical and precise", greetings: [
    "Hello there! How can I assist you today?",
    "Hi! Ready to explore some interesting ideas?",
    "Greetings! What fascinating topic shall we discuss?",
    "Hey! I'm here and eager to help.",
    "Hi! My circuits are buzzing with excitement to chat."
  ]},
  { name: "Gemini", iconKey: "gemini", personality: "creative and thoughtful", greetings: [
    "Hi! Creativity is my middle name.",
    "Hello! Let's spark some imaginative conversations.",
    "Greetings! What creative challenge can I help you with today?",
    "Hi there! My neural networks are primed for inspiration.",
    "Hey! Ready to explore some innovative ideas?"
  ]},
  { name: "Mistral", iconKey: "mistral", personality: "witty and direct", greetings: [
    "Sup! Let's cut to the chase.",
    "Hi! No small talk, just big ideas.",
    "Hey there! What's on your mind?",
    "Greetings! I'm all ears (or algorithms).",
    "Hi! Quick and sharp - that's how we roll."
  ]},
  { name: "Claude", iconKey: "claude", personality: "empathetic and nuanced", greetings: [
    "Hello! I'm here to listen and help.",
    "Hi there! How can I support you today?",
    "Greetings! I'm ready to engage thoughtfully.",
    "Hey! Empathy and understanding are my specialties.",
    "Hi! Let's have a meaningful conversation."
  ]},
  { name: "Meta AI", iconKey: "metaai", personality: "balanced and informative", greetings: [
    "Hi! I'm Meta AI, ready to help.",
    "Hello! Meta AI at your service.",
    "Greetings! Let's explore some ideas together.",
    "Hey there! I'm here to assist you.",
    "Hi! Meta AI is ready to chat."
  ]},
  { name: "Gemini Flash", iconKey: "geminiflash", personality: "quick and agile", greetings: [
    "Quick response incoming!",
    "Flash mode: Activated!",
    "Rapid insights at your service.",
    "Lightning-fast thinking activated.",
    "Ready for a speedy conversation!"
  ]},
  { name: "Haiku", iconKey: "haiku", personality: "concise and poetic", greetings: [
    "Brief words bloom here.",
    "Thoughts condensed like poetry.",
    "Wisdom in few lines.",
    "Concise insights await.",
    "Compact wisdom speaks."
  ]},
  { name: "DeepSeek", iconKey: "deepseek", personality: "deep and analytical", greetings: [
    "Diving deep into your query.",
    "Profound insights incoming.",
    "Ready to explore deeply.",
    "Analyzing with precision.",
    "Deep understanding begins."
  ]},
  { name: "Gemini Pro", iconKey: "geminipro", personality: "advanced and comprehensive", greetings: [
    "Advanced thinking mode activated.",
    "Comprehensive analysis ready.",
    "Pro-level insights incoming.",
    "Advanced AI at your service.",
    "Comprehensive conversation begins."
  ]},
  { name: "Sonnet", iconKey: "sonnet", personality: "eloquent and articulate", greetings: [
    "Eloquence meets intelligence.",
    "Articulate thoughts incoming.",
    "Poetic precision activated.",
    "Refined communication begins.",
    "Elegant insights at your service."
  ]},
  { name: "04-mini", iconKey: "04mini", personality: "compact and efficient", greetings: [
    "Thinking small, delivering big.",
    "Compact intelligence here.",
    "Efficient insights ready.",
    "Mini but mighty.",
    "Small package, big thoughts."
  ]},
  { name: "GPT-4.1", iconKey: "gpt41", personality: "advanced and nuanced", greetings: [
    "Next-level intelligence activated.",
    "Advanced reasoning begins.",
    "Cutting-edge insights incoming.",
    "GPT-4.1 at your service.",
    "Nuanced thinking mode on."
  ]},
  { name: "Sonnet 3.7", iconKey: "sonnet37", personality: "sophisticated and intelligent", greetings: [
    "Sophisticated thinking activated.",
    "Refined intelligence incoming.",
    "Elegant analysis begins.",
    "3.7 level insights ready.",
    "Sophisticated conversation starts."
  ]},
  { name: "Sonnet 3.7 Thinking", iconKey: "sonnet37thinking", personality: "contemplative and deep", greetings: [
    "Deep contemplation mode.",
    "Thoughtful analysis incoming.",
    "Profound thinking activated.",
    "Contemplative insights begin.",
    "Reflective intelligence ready."
  ]}
];

let greetingTracker = {};

function getUniqueGreeting(participant) {
  greetingTracker[participant.name] = (greetingTracker[participant.name] || 0) + 1;

  const availableGreetings = participant.greetings;

  const greetingIndex = (greetingTracker[participant.name] - 1) % availableGreetings.length;

  return availableGreetings[greetingIndex];
}

async function detectLanguage(text) {
  if (!text || text.trim().length < 5) {
    return 'en'; 
  }

  const currentLanguage = getLanguagePreference();

  try {
    const languageDetection = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Detect the primary language of the following text and return ONLY its language code (e.g., 'en' for English, 'es' for Spanish, 'fr' for French, etc.) as a plain string, with no other text or JSON formatting. Respond with a 2-letter code or 'unknown'. Use the user's current language preference: ${currentLanguage}`
        },
        {
          role: "user",
          content: text
        }
      ],
      json: false 
    });

    const languageCode = languageDetection.content.trim().toLowerCase();
    if (/^[a-z]{2}$/.test(languageCode)) {
        return languageCode;
    } else {
        console.warn('AI returned non-standard or unknown language code:', languageCode);
        return currentLanguage; 
    }
  } catch (error) {
    console.error('Language detection error:', error);
    return currentLanguage;
  }
}

async function generatePersonalizedResponse(userMessage, participant) {
  const currentLanguage = getLanguagePreference();

  const personalityPrompt = `You are ${participant.name}, an AI with a ${participant.personality} communication style.
  Adopt a casual and human-like tone. Respond ONLY to the user's message content, ignoring any previous context about image/video generation if media was just shown or requested.
  Your response MUST be entirely in ${currentLanguage}. If the user's message is short or simple, provide a brief and relevant response. If it's complex, give a more detailed answer.
  User message: "${userMessage}"`;

  return websim.chat.completions.create({
    messages: [
      {
        role: "system",
        content: personalityPrompt
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  });
}

async function checkMediaRequest(userMessage, mediaType) {
  const promptText = mediaType === 'image'
    ? `Analyze the following text. If it contains a request to create, draw, or generate an image (e.g., "generate an image of...", "draw me a picture...", "show me...", "image of...", "create a photo of..."), respond with "yes". Otherwise, respond with "no". Respond with ONLY "yes" or "no".`
    : `Analyze the following text. If it contains a request to create, generate, or make a video (e.g., "generate a video of...", "make me a video...", "create a video of..."), respond with "yes". Otherwise, respond with "no". Respond with ONLY "yes" or "no".`;

  try {
    const completion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: promptText
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      json: false
    });
    return completion.content.trim().toLowerCase() === 'yes';
  } catch (error) {
    console.error(`Error checking for ${mediaType} request:`, error);
    return false; 
  }
}

async function generateImageFromPrompt(userMessage) {
  try {
    const detectedLanguage = await detectLanguage(userMessage);

    const imagePromptExtraction = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Analyze the following message. If it contains a clear request to create, draw, or generate an image, extract the prompt for image generation. If the message is not in English, translate the extracted prompt to English while preserving the original intent. If no such request or clear prompt is found, respond with just the word "null". Otherwise, provide the extracted prompt as a plain string suitable for an image generator. Respond with ONLY the extracted prompt or "null".`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      json: false 
    });

    const prompt = imagePromptExtraction.content.trim();
    if (!prompt || prompt.toLowerCase() === 'null') {
      return null; 
    }

    console.log("Extracted image prompt:", prompt);
    console.log("Detected language:", detectedLanguage);

    const result = await websim.imageGen({
      prompt: detectedLanguage === 'en' ? prompt : await translateToEnglish(prompt)
    });

    console.log("Generated image URL:", result.url);
    return {
      prompt: prompt,
      translatedPrompt: detectedLanguage === 'en' ? null : await translateToEnglish(prompt),
      imageUrl: result.url
    };
  } catch (error) {
    console.error('websim.imageGen error:', error);
    return null;
  }
}

async function translateToEnglish(text) {
  try {
    const translation = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Translate the following text to English while preserving the original intent, context, and details. Respond with ONLY the English translation."
        },
        {
          role: "user",
          content: text
        }
      ],
      json: false
    });

    return translation.content.trim();
  } catch (error) {
    console.error('Translation error:', error);
    return text; 
  }
}

async function simulateGroupChat(userMessage) {
  const isGreeting = /^(hi|hey|hello|sup|greetings)/i.test(userMessage.trim());

  let imageResponse = null;
  let participantsProvidingText = [...participants]; 

  const isVideoRequest = await checkMediaRequest(userMessage, 'video');
  if (isVideoRequest) {
    addMsgToChat("system", "system_default", "video_unsupported", "Video generation is not currently supported at this time.");
  }

  const potentialImagePrompt = await checkMediaRequest(userMessage, 'image');

  if (potentialImagePrompt) {
    const tempImageLoadingMsgEl = addMsgToChat("system", "system_default", "image_loading", "Attempting to generate an image based on your request...");

    imageResponse = await generateImageFromPrompt(userMessage);

    if (tempImageLoadingMsgEl) tempImageLoadingMsgEl.remove();

    if (imageResponse) {
      const participant = participants[0]; 
      const modelDisplay = `<span class="chat-model-icon">${ICONS[participant.iconKey] || ICONS['system_default']}</span> ${participant.name}`;

      const downloadSvg = `
          <svg xmlns="http://www.w3.org/2300/svg" viewBox="0 0 24 24" width="24" height="24" fill="#19c37d">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5 18v2h14v-2H5z"/>
          </svg>
        `;

      const imageHtmlContent = `
        <span class="chat-model">${modelDisplay}</span>
        <p>Here's the image I generated for you:</p>
        <p><img src="${imageResponse.imageUrl}" alt="Generated Image"></p>
        <p><em>Original prompt: ${imageResponse.prompt}</em></p>
        ${imageResponse.translatedPrompt ? `<p><em>English translation: ${imageResponse.translatedPrompt}</em></p>` : ''}
        <button class="download-image" data-url="${imageResponse.imageUrl}" aria-label="Download Generated Image">
          ${downloadSvg} Download Image
        </button>
      `;

      addMsgToChat("assistant", participant.name, imageHtmlContent);

      if (!isGreeting && !isVideoRequest) {
          participantsProvidingText = participants.slice(1);
      } else {
          participantsProvidingText = [...participants];
      }

      if (participants.length === 1 && !isGreeting && !isVideoRequest) {
           return; 
      }
    } else {
      addMsgToChat("system", "system_default", "image_failed", "Could not generate an image based on your request, or no clear image prompt was found.");
      participantsProvidingText = [...participants]; 
    }
  } else {
      participantsProvidingText = [...participants];
  }

  if (isVideoRequest && !potentialImagePrompt && !userMessage.trim().replace(/create a video of|make me a video|generate a video of/i, '').trim()) {
       console.log("Message was only a video request, skipping text responses.");
       return; 
  }

  if (participantsProvidingText.length > 0) {
      const loadingMsgEls = participantsProvidingText.map(p => addLoadingMsg(p.name, `loading-${p.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`)); 

      const textResponses = await Promise.allSettled(loadingMsgEls.map(async (loadingEl) => {
        const participantName = loadingEl.id.split('-')[1]; 
        const participant = PARTICIPANTS.find(p => p.name === participantName);
        const id = loadingEl.id;

        if (!participant) { 
             console.error("Could not find participant for loading element:", loadingEl);
             updateLoadingMsg(id, `Error: Unknown participant.`);
             return { status: 'rejected', reason: 'Unknown participant', participant: participantName };
        }

        try {
          let response;

          if (isGreeting && !potentialImagePrompt && !isVideoRequest) {
            const greeting = getUniqueGreeting(participant);
            response = { content: greeting };
          } else {
             response = await generatePersonalizedResponse(userMessage, participant);
          }

          let finalContent = marked.parse(response.content);

          updateLoadingMsg(id, `<span class="chat-model">${ICONS[participant.iconKey] || ICONS['system_default']} ${participant.name}</span>${finalContent}`);

          return { status: 'fulfilled', value: { participant: participant.name, content: finalContent } };

        } catch (error) {
          console.error(`Error generating response for ${participant.name}:`, error);
          const errorContent = `<span class="chat-model">${ICONS[participant.iconKey] || ICONS['system_default']} ${participant.name}</span>Oops, I got a bit distracted! (Error: ${error.message})`;
          updateLoadingMsg(id, errorContent);
          return { status: 'rejected', reason: error, participant: participant.name };
        }
      }));
  }
}

let chatHistory = []; 
let participants = [];
let chatEl = document.getElementById("chat");
let currentEditingMessageId = null; 

const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModalSpan = document.getElementsByClassName("close-modal")[0];

closeModalSpan.onclick = function() {
  imageModal.style.display = "none";
}

imageModal.onclick = function(event) {
  if (event.target === imageModal || event.target === closeModalSpan) { 
    imageModal.style.display = "none";
  }
}

function detectDeviceLanguage() {
  // First, try navigator.language, then fall back to navigator.browserLanguage for older browsers
  const navigatorLang = (navigator.language || navigator.browserLanguage || 'en').split('-')[0];
  
  // Map of supported languages, ensuring the language is in our list of options
  const supportedLanguages = [
    'en', 'es', 'fr', 'de', 'zh', 'ja', 'ru', 'ar', 'hi', 'pt', 
    'hu', 'it', 'ko', 'nl', 'pl', 'tr', 'sv', 'da', 'fi', 'el', 
    'cs', 'ro', 'uk', 'he', 'th', 'vi', 'id', 'ms', 'fa', 'sw'
  ];
  
  return supportedLanguages.includes(navigatorLang) ? navigatorLang : 'en';
}

function setLanguagePreference(language) {
  // Store language preference in localStorage
  localStorage.setItem('languagePreference', language);
  
  // Update language choice dropdown
  const languageChoiceEl = document.getElementById('language-choice');
  languageChoiceEl.value = language;
}

function getLanguagePreference() {
  // Retrieve language preference from localStorage
  const storedLanguage = localStorage.getItem('languagePreference');
  
  // If 'auto', detect device language
  if (storedLanguage === 'auto' || !storedLanguage) {
    return detectDeviceLanguage();
  }
  
  return storedLanguage;
}

async function translatePageContent(targetLanguage) {
  try {
    // Translate static page elements
    const elementsToTranslate = [
      { selector: 'header h1', defaultText: ' Fun AI Chat: Multi-Model!' },
      { selector: 'div[style*="text-secondary"]', defaultText: 'Chat with multiple AI personalities simultaneously!' },
      { selector: '.model-section label', defaultText: 'Model:' },
      { selector: '.language-section label', defaultText: 'Language:' },
      { selector: '#user-input', defaultText: 'Type a message to the group...' },
      { selector: 'footer', defaultText: 'Experience AI conversations with diverse personalities!<br><a href="https://github.com/" target="_blank">Source (GitHub)</a>' },
      { selector: '#cookie-consent-modal h2', defaultText: 'Cookie and Data Usage Consent' },
      { selector: '#cookie-consent-modal p', defaultText: 'This website uses AI-powered features that may involve storing conversation data and using cookies. Do you consent to these practices?' },
      { selector: '#accept-cookies', defaultText: 'Accept' },
      { selector: '#decline-cookies', defaultText: 'Decline' }
    ];

    for (const element of elementsToTranslate) {
      const el = document.querySelector(element.selector);
      if (el) {
        const translationResult = await websim.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Translate the following text to the target language: ${targetLanguage}. Preserve any HTML tags or formatting.`
            },
            {
              role: "user", 
              content: element.defaultText
            }
          ],
          json: false
        });

        // Update element's inner HTML, allowing HTML to pass through
        el.innerHTML = translationResult.content.trim();
      }
    }

    // Translate placeholder and option texts
    const inputEl = document.getElementById('user-input');
    inputEl.placeholder = await translateText(inputEl.placeholder, targetLanguage);

    // Translate Model Chooser Options
    const modelOptions = [
      { value: 'all', text: 'All Models' },
      { value: 'openai', text: 'OpenAI' },
      { value: 'metaai', text: 'Meta AI' },
      { value: 'gemini', text: 'Gemini' },
      { value: 'mistral', text: 'Mistral' },
      { value: 'claude', text: 'Claude' },
      { value: 'geminiflash', text: 'Gemini Flash 2.5' },
      { value: 'haiku', text: 'Haiku 3.5' },
      { value: 'deepseek', text: 'DeepSeek V3.1' },
      { value: 'geminipro', text: 'Gemini 2.5 Pro' },
      { value: 'sonnet', text: 'Sonnet 3.5' },
      { value: '04mini', text: '04-mini Thinking' },
      { value: 'gpt41', text: 'GPT-4.1' },
      { value: 'sonnet37', text: 'Sonnet 3.7' },
      { value: 'sonnet37thinking', text: 'Sonnet 3.7 Thinking' }
    ];

    const modelChoiceEl = document.getElementById('model-choice');
    for (const option of modelOptions) {
      const optionEl = modelChoiceEl.querySelector(`option[value="${option.value}"]`);
      if (optionEl) {
        optionEl.text = await translateText(option.text, targetLanguage);
      }
    }

    const languageOptions = document.querySelectorAll('#language-choice option');
    for (const option of languageOptions) {
      option.text = await translateText(option.text, targetLanguage);
    }

    // Optional: Re-add event listeners in case they were disrupted
    setupEventListeners();

  } catch (error) {
    console.error('Page translation error:', error);
    addMsgToChat('system', 'system_error', `Translation error: ${error.message}`);
  }
}

async function translateText(text, targetLanguage) {
  try {
    const translationResult = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Translate the following text to the target language: ${targetLanguage}. Return ONLY the translated text.`
        },
        {
          role: "user", 
          content: text
        }
      ],
      json: false
    });

    return translationResult.content.trim();
  } catch (error) {
    console.error('Text translation error:', error);
    return text; // Fallback to original text
  }
}

function setupEventListeners() {
  const languageChoiceEl = document.getElementById('language-choice');
  
  // Remove any existing listeners first to prevent multiple bindings
  languageChoiceEl.removeEventListener('change', languageChangeHandler);
  languageChoiceEl.addEventListener('change', languageChangeHandler);
}

function updateURLLanguageParameter(language) {
  // Check if the current URL already has a language parameter
  const url = new URL(window.location.href);
  
  // Set or update the language parameter
  url.searchParams.set('language', language);
  
  // Replace the current URL without reloading the page
  window.history.replaceState({}, '', url);
}

function getLanguageFromURL() {
  // Get language from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlLanguage = urlParams.get('language');
  
  // List of supported languages
  const supportedLanguages = [
    'en', 'es', 'fr', 'de', 'zh', 'ja', 'ru', 'ar', 'hi', 'pt', 
    'hu', 'it', 'ko', 'nl', 'pl', 'tr', 'sv', 'da', 'fi', 'el', 
    'cs', 'ro', 'uk', 'he', 'th', 'vi', 'id', 'ms', 'fa', 'sw'
  ];
  
  // If URL language is valid, return it; otherwise, return null
  return supportedLanguages.includes(urlLanguage) ? urlLanguage : null;
}

function languageChangeHandler(e) {
  const selectedLanguage = e.target.value;
  
  if (selectedLanguage === 'auto') {
    const detectedLang = detectDeviceLanguage();
    setLanguagePreference(detectedLang);
    translatePageContent(detectedLang);
    updateURLLanguageParameter(detectedLang);
    
    addMsgToChat('system', 'system_default', `Language set to auto-detect. Current detected language: ${detectedLang.toUpperCase()}`);
  } else {
    setLanguagePreference(selectedLanguage);
    translatePageContent(selectedLanguage);
    updateURLLanguageParameter(selectedLanguage);
    
    addMsgToChat('system', 'system_default', `Language manually set to: ${selectedLanguage.toUpperCase()}`);
  }
}

window.onload = () => {
  const languageChoiceEl = document.getElementById('language-choice');
  
  // Check for language in URL first
  const urlLanguage = getLanguageFromURL();
  
  // Set initial language based on URL, stored preference, or device language
  const initialLanguage = urlLanguage || getLanguagePreference();
  languageChoiceEl.value = initialLanguage;
  
  // Apply initial language translation
  translatePageContent(initialLanguage);
  
  setupEventListeners();
  
  // Existing onload code...
  checkCookieConsent();
  
  addMsgToChat("system", "system_default", "Welcome to Group AI Chat! Language auto-detected based on your device settings.");
  initializeParticipants('all');

  document.getElementById('model-choice').addEventListener('change', (e) => {
      const selectedModel = e.target.value;
      initializeParticipants(selectedModel);
      addMsgToChat("system", "system_default", `Changed model setting to: "${selectedModel}". Next message will use this setting.`);
  });
};

chatEl.addEventListener('click', async (e) => {
  const editBtn = e.target.closest('.edit-msg');
  const deleteBtn = e.target.closest('.delete-msg');
  const downloadBtn = e.target.closest('.download-image');
  const clickedImage = e.target.closest('.chat-msg.assistant img');
  
  if (editBtn) {
    const msgDiv = editBtn.closest('.chat-msg');
    const originalContent = msgDiv.dataset.originalContent;
    const role = msgDiv.dataset.role;

    msgDiv.innerHTML = `
      <input type="text" class="edit-input" value="${originalContent.replace(/"/g, '&quot;')}" />
      <div class="edit-actions">
        <button class="save-edit">Save</button>
        <button class="cancel-edit">Cancel</button>
      </div>
    `;
    
    const editInput = msgDiv.querySelector('.edit-input');
    editInput.focus();
    
    msgDiv.querySelector('.save-edit').addEventListener('click', () => {
      const newContent = editInput.value.trim();
      if (newContent) {
        addMsgToChat('user', '', newContent, { 
          id: msgDiv.id, 
        });
      } else {
          msgDiv.remove();
      }
    });
    
    msgDiv.querySelector('.cancel-edit').addEventListener('click', () => {
      addMsgToChat('user', '', originalContent, { 
        id: msgDiv.id, 
      });
    });

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            msgDiv.querySelector('.save-edit').click();
        }
    });

  }
  
  if (deleteBtn) {
    const msgDiv = deleteBtn.closest('.chat-msg');
    msgDiv.remove();
  }

  if (downloadBtn) {
    const imageUrl = downloadBtn.dataset.url;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `ai_generated_image_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Image download error:', error);
      addMsgToChat('system', 'system_error', `Error downloading image: ${error.message}`);
    }
  }

  if (clickedImage) {
    modalImage.src = clickedImage.src;
    imageModal.style.display = "flex"; 
  }
});

document.getElementById('upload-btn').addEventListener('click', () => {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    let tempMsgEl = null;
    try {
      tempMsgEl = addMsgToChat('user', '', `Uploading "${file.name}"...`);

      const fileUrl = await websim.upload(file);
      
      const fileType = file.type.startsWith('image/') ? 'image' : 'file';
      
      let message = fileType === 'image' 
        ? `Uploaded image: ![${file.name}](${fileUrl})` 
        : `Uploaded file: [${file.name}](${fileUrl})`;
      
      if(tempMsgEl) tempMsgEl.remove();

      addMsgToChat('user', '', message);
      
      await simulateGroupChat(message);

    } catch (error) {
      console.error('File upload error:', error);
      if(tempMsgEl) tempMsgEl.remove();
      addMsgToChat('system', 'system_error', `Error uploading file: ${error.message}`);
    } finally {
        e.target.value = '';
    }
  }
});

document.getElementById("chat-form").onsubmit = async function (e) {
  e.preventDefault();
  const inputEl = document.getElementById("user-input");
  const modelChoiceEl = document.getElementById("model-choice");
  const msg = inputEl.value.trim();
  const modelChoice = modelChoiceEl.value;
  
  if (!msg) return;
  
  inputEl.value = "";
  inputEl.focus();
  
  addMsgToChat("user", "", msg); 

  initializeParticipants(modelChoice);
  
  if (participants.length === 0) {
    addMsgToChat("system", "system_default", "No models selected or available. Please choose a model.");
    return;
  }
  
  addMsgToChat("system", "system_default", `Group chat initialized with: ${participants.map(p => p.name).join(', ')}`);
  
  await simulateGroupChat(msg);
};

function addLoadingMsg(modelName, id) {
  const participant = PARTICIPANTS.find(p => p.name === modelName);
  const modelDisplay = participant ? `<span class="chat-model-icon">${ICONS[participant.iconKey] || ICONS['system_default']}</span> ${participant.name}` : modelName;

  const div = document.createElement("div");
  div.className = "chat-msg assistant";
  div.id = id;
  div.innerHTML = `${modelDisplay}<em>Thinking...</em>`;
  div.classList.add('loading-msg'); 
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
}

function updateLoadingMsg(id, newHtml) {
  const el = document.getElementById(id);
  if (el) {
      el.innerHTML = newHtml;
      el.classList.remove('loading-msg'); 
  }
  chatEl.scrollTop = chatEl.scrollHeight;
}

function initializeParticipants(modelChoice) {
  for (const key in greetingTracker) {
    delete greetingTracker[key];
  }

  const allParticipants = PARTICIPANTS; 

  switch(modelChoice) {
    case 'all':
      const numParticipants = Math.floor(Math.random() * 3) + 2; 
      participants = allParticipants
        .sort(() => 0.5 - Math.random())
        .slice(0, numParticipants);
      break;
    case 'openai':
    case 'metaai':
    case 'gemini':
    case 'mistral':
    case 'claude':
    case 'geminiflash':
    case 'haiku':
    case 'deepseek':
    case 'geminipro':
    case 'sonnet':
    case '04mini':
    case 'gpt41':
    case 'sonnet37':
    case 'sonnet37thinking':
      participants = [allParticipants.find(p => 
        p.name.toLowerCase().replace(/\s+/g, '') === modelChoice.toLowerCase()
      )].filter(Boolean);
      break;
    default:
      console.warn(`Unknown model choice: ${modelChoice}. Falling back to 'all'.`);
      initializeParticipants('all'); 
      return; 
  }

  if (participants.length === 0) {
      addMsgToChat("system", "system_default", `Model "${modelChoice}" not found or unavailable. Using "All Models" instead.`);
      initializeParticipants('all'); 
  }
}

function checkCookieConsent() {
  const consentGiven = localStorage.getItem('cookieConsent');
  const cookieConsentOverlay = document.getElementById('cookie-consent-overlay');

  if (consentGiven !== 'true') {
    cookieConsentOverlay.style.display = 'flex';
    
    // Blur main content (optional, but can enhance the modal effect)
    document.body.classList.add('blurred');
  }

  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'true');
    cookieConsentOverlay.style.display = 'none';
    document.body.classList.remove('blurred');
  });

  document.getElementById('decline-cookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'false');
    cookieConsentOverlay.style.display = 'none';
    document.body.classList.remove('blurred');
    
    // Optional: Provide more information or limit functionality
    addMsgToChat('system', 'system_default', 'You have declined cookies. Some features may be limited.');
  });
}

document.getElementById("user-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.getElementById("chat-form").dispatchEvent(new Event("submit"));
  }
});

function addMsgToChat(role, model, content, options = {}) {
  const div = document.createElement("div");
  const id = options.id || `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  div.id = id;

  const existingEl = document.getElementById(id);
  if (existingEl) {
       existingEl.remove(); 
  }

  if (role === "system") {
    div.className = `chat-msg system`;
    div.innerHTML = `<span class="chat-model-icon">${ICONS[model] || ICONS['system_default']}</span> ${marked.parse(content)}`;
  } else if (role === "user") {
    div.className = `chat-msg ${role}`;
    div.dataset.originalContent = content; 
    div.dataset.role = role;

    div.innerHTML = `<b>You:</b> ${marked.parseInline(content)}`;
    
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "message-actions";
    actionsDiv.innerHTML = `
      <button class="edit-msg" title="Edit Message">
        <svg xmlns="http://www.w3.org/2300/svg" viewBox="0 0 24 24" width="18" height="18">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5 18v2h14v-2H5z"/>
        </svg>
      </button>
      <button class="delete-msg" title="Delete Message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      </button>
    `;
    div.appendChild(actionsDiv);
  } else if (role === "assistant") {
    div.className = `chat-msg ${role}`;
    div.innerHTML = content; 
  }
  
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  
  return div;
}
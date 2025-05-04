// constants.ts
export const PDF_CO_API_KEY = import.meta.env.VITE_PDF_CO_API_KEY;
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Optional fallback for development
if (!PDF_CO_API_KEY) {
  console.warn('PDF_CO_API_KEY not found in environment variables');
}

if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}
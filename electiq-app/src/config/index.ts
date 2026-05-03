export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  },
  gcp: {
    projectId: import.meta.env.VITE_GCP_PROJECT_ID || 'promptwars-virtual-495106',
  },
  api: {
    baseUrl: '/api/v1',
  }
};

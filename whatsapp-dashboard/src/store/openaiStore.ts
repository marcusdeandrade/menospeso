import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { verifyApiKey, fetchAssistantInfo } from '../services/openai';

interface OpenAIState {
  apiKey: string;
  assistantId: string;
  assistantName: string | null;
  isApiConnected: boolean;
  isAssistantConnected: boolean;
  setApiKey: (key: string) => Promise<void>;
  setAssistantId: (id: string) => Promise<void>;
  setAssistantName: (name: string | null) => void;
  setApiConnected: (connected: boolean) => void;
  setAssistantConnected: (connected: boolean) => void;
}

export const useOpenAIStore = create<OpenAIState>()(
  persist(
    (set, get) => ({
      apiKey: '',
      assistantId: '',
      assistantName: null,
      isApiConnected: false,
      isAssistantConnected: false,
      setApiKey: async (key) => {
        try {
          const isValid = await verifyApiKey(key);
          set({ 
            apiKey: key,
            isApiConnected: isValid,
            // Reset assistant connection if API key changes
            isAssistantConnected: false,
            assistantName: null
          });
        } catch (error) {
          set({ 
            apiKey: key,
            isApiConnected: false,
            isAssistantConnected: false,
            assistantName: null
          });
        }
      },
      setAssistantId: async (id) => {
        const { apiKey } = get();
        try {
          const assistant = await fetchAssistantInfo(apiKey, id);
          set({ 
            assistantId: id,
            assistantName: assistant.name,
            isAssistantConnected: true
          });
        } catch (error) {
          set({ 
            assistantId: id,
            assistantName: null,
            isAssistantConnected: false
          });
        }
      },
      setAssistantName: (name) => set({ assistantName: name }),
      setApiConnected: (connected) => set({ isApiConnected: connected }),
      setAssistantConnected: (connected) => set({ isAssistantConnected: connected }),
    }),
    {
      name: 'openai-storage',
      // Only persist these fields
      partialize: (state) => ({
        apiKey: state.apiKey,
        assistantId: state.assistantId,
        assistantName: state.assistantName,
      }),
    }
  )
);

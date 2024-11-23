import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ConnectionStatus = 'connected' | 'disconnected';

interface WhatsAppState {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
}

export const useWhatsAppStore = create<WhatsAppState>()(
  persist(
    (set) => ({
      status: 'disconnected',
      setStatus: (status) => set({ status }),
    }),
    {
      name: 'whatsapp-storage',
    }
  )
);

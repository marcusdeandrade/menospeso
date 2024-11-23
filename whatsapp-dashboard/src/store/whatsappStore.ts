import { create } from 'zustand'

type Status = 'connected' | 'disconnected' | 'connecting'

interface WhatsAppState {
  status: Status
  qrCode: string | null
  connect: () => void
  disconnect: () => void
}

export const useWhatsAppStore = create<WhatsAppState>((set) => ({
  status: 'disconnected',
  qrCode: null,
  connect: () => {
    set({ status: 'connecting', qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' })
    // Simular conexão após 3 segundos
    setTimeout(() => {
      set({ status: 'connected', qrCode: null })
    }, 3000)
  },
  disconnect: () => {
    set({ status: 'disconnected', qrCode: null })
  }
}))

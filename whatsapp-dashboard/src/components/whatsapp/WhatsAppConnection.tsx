import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';
import { useWhatsAppStore } from '../../store/whatsappStore';
import { Check } from 'lucide-react';

const socket = io('http://localhost:3002');

export function WhatsAppConnection() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { setStatus } = useWhatsAppStore();

  useEffect(() => {
    // Handle QR code
    socket.on('qr', (qr: string) => {
      console.log('Received QR code');
      setQrCode(qr);
      setIsConnected(false);
    });

    // Handle ready state
    socket.on('ready', () => {
      console.log('WhatsApp is ready');
      setQrCode(null);
      setIsConnected(true);
      setStatus('connected');
    });

    // Handle authenticated state
    socket.on('authenticated', () => {
      console.log('WhatsApp is authenticated');
      setQrCode(null);
      setIsConnected(true);
      setStatus('connected');
    });

    // Handle connection state changes
    socket.on('connection-state', (state: 'connected' | 'disconnected') => {
      console.log('Connection state:', state);
      setIsConnected(state === 'connected');
      setStatus(state);
      if (state === 'connected') {
        setQrCode(null);
      }
    });

    return () => {
      socket.off('qr');
      socket.off('ready');
      socket.off('authenticated');
      socket.off('connection-state');
    };
  }, [setStatus]);

  if (isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-center text-green-500 font-medium">
          WhatsApp conectado com sucesso!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <p className="text-center text-muted-foreground mb-4">
        Para conectar seu WhatsApp, escaneie o código QR abaixo com seu celular
      </p>
      {qrCode ? (
        <div className="p-4 bg-white rounded-lg">
          <QRCodeSVG value={qrCode} size={256} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-[256px] h-[256px] bg-muted rounded-lg">
          <p className="text-muted-foreground">Gerando QR Code...</p>
        </div>
      )}
      <p className="text-sm text-muted-foreground text-center">
        Abra o WhatsApp no seu celular, vá em Menu &gt; WhatsApp Web e escaneie o código
      </p>
    </div>
  );
}

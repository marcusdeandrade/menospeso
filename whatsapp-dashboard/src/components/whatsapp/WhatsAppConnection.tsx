import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useWhatsAppStore } from "../../store/whatsappStore";
import { cn } from "../../lib/utils";

export function WhatsAppConnection() {
  const { status, qrCode, connect } = useWhatsAppStore();

  const statusMap = {
    connected: {
      label: "Conectado",
      variant: "default" as const,
    },
    disconnected: {
      label: "Desconectado",
      variant: "destructive" as const,
    },
    connecting: {
      label: "Conectando",
      variant: "secondary" as const,
    },
  };

  const { label, variant } = statusMap[status];

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {status === "disconnected" ? (
        <>
          <p className="text-sm text-muted-foreground">
            Clique em reconectar para estabelecer uma nova conexão com WhatsApp
          </p>
          <Button onClick={connect}>Reconectar</Button>
        </>
      ) : status === "connecting" ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium">
            Aponte seu celular para escanear o QR Code.
          </p>
          {qrCode ? (
            <img src={qrCode} alt="QR Code" className="h-48 w-48" />
          ) : (
            <div className="h-48 w-48 bg-muted animate-pulse" />
          )}
          <p className="text-sm text-muted-foreground">
            Escaneie o QR code com seu aplicativo WhatsApp
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Badge variant={variant}>{label}</Badge>
          <p className="text-sm text-muted-foreground">
            Você já pode enviar e receber mensagens
          </p>
        </div>
      )}
    </div>
  );
}

import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useWhatsAppStore } from "../../store/whatsappStore";
import { cn } from "../../lib/utils";

export function ChatInterface() {
  const { status } = useWhatsAppStore();

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
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex items-center gap-4">
          <MessageSquare className="h-6 w-6" />
          <div className="flex flex-col">
            <CardTitle>Interface de Chat</CardTitle>
            <Badge variant={variant} className="mt-1 w-fit">
              {label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-[300px]">
          {status === "connected" ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium">Pronto para conversar</p>
              <p className="text-xs text-muted-foreground">
                Selecione um contato para começar a conversar
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium">Conecte ao WhatsApp para começar a conversar</p>
              <p className="text-xs text-muted-foreground">
                Clique no botão WhatsApp QR na barra lateral para conectar
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

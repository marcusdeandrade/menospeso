import { MessageSquare, Search, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useWhatsAppStore } from "../../store/whatsappStore";
import { cn } from "../../lib/utils";

export function ChatInterface() {
  const { status } = useWhatsAppStore();

  const statusMap = {
    connected: {
      label: "Conectado",
      variant: "default" as const,
      className: "dark:bg-green-500/20 dark:text-green-400 bg-green-500/10 text-green-500",
    },
    disconnected: {
      label: "Desconectado",
      variant: "destructive" as const,
      className: "dark:bg-red-500/20 dark:text-red-400 bg-red-500/10 text-red-500",
    },
    connecting: {
      label: "Conectando",
      variant: "secondary" as const,
      className: "dark:bg-yellow-500/20 dark:text-yellow-400 bg-yellow-500/10 text-yellow-500",
    },
  };

  const { label, variant, className } = statusMap[status];

  return (
    <Card className="h-full border-none dark:bg-background-dark">
      <CardHeader className="border-b border-border dark:border-sidebar-border-dark px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MessageSquare className="h-6 w-6" />
            <div className="flex flex-col">
              <CardTitle>Interface de Chat</CardTitle>
              <Badge variant={variant} className={cn("mt-1 w-fit", className)}>
                {label}
              </Badge>
            </div>
          </div>
          {status === "connected" && (
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">0 Online</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      {status === "connected" ? (
        <>
          <div className="border-b border-border dark:border-sidebar-border-dark px-6 py-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contatos..."
                className="pl-8 bg-background dark:bg-background-dark"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-13rem)]">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="rounded-lg border border-border dark:border-sidebar-border-dark p-4 text-center">
                  <p className="text-sm font-medium">Nenhuma conversa selecionada</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Selecione um contato para começar a conversar
                  </p>
                </div>
              </div>
            </CardContent>
          </ScrollArea>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <div className="rounded-full bg-muted dark:bg-accent-dark p-4">
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium">Conecte ao WhatsApp</p>
            <p className="text-sm text-muted-foreground mt-1">
              Clique no botão WhatsApp QR na barra lateral para conectar
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

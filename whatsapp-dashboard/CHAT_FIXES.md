# Correções para Interface de Chat

## 1. Melhorias de Layout

### Estrutura Atual
O ChatInterface atual está muito básico e pode ser melhorado para ter uma aparência mais profissional e funcional.

### Correção Proposta
```typescript
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
      className: "bg-green-500/10 text-green-500",
    },
    disconnected: {
      label: "Desconectado",
      variant: "destructive" as const,
      className: "bg-red-500/10 text-red-500",
    },
    connecting: {
      label: "Conectando",
      variant: "secondary" as const,
      className: "bg-yellow-500/10 text-yellow-500",
    },
  };

  const { label, variant, className } = statusMap[status];

  return (
    <Card className="h-full border-none">
      <CardHeader className="border-b px-6 py-4">
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
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">0 Online</span>
          </div>
        </div>
      </CardHeader>
      
      {status === "connected" ? (
        <>
          <div className="border-b px-6 py-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contatos..."
                className="pl-8"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-13rem)]">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="rounded-lg border p-4 text-center">
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
          <div className="rounded-full bg-muted p-4">
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
```

## 2. Estilos Adicionais

### Adicionar ao seu CSS
```css
.chat-interface {
  @apply h-full flex flex-col;
}

.chat-header {
  @apply sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60;
}

.chat-content {
  @apply flex-1 overflow-hidden;
}

.chat-scroll-area {
  @apply h-full pr-4 -mr-4;
}

.chat-status-badge {
  @apply px-2 py-0.5 rounded-full text-xs font-medium;
}
```

## 3. Responsividade

### Ajustes para Mobile
```typescript
// Adicionar ao componente
const { isMobile } = useMobile();

// Ajustar classes condicionalmente
<Card className={cn(
  "h-full border-none",
  isMobile && "rounded-none"
)}>
  <CardHeader className={cn(
    "border-b",
    isMobile ? "px-4 py-3" : "px-6 py-4"
  )}>
    {/* ... */}
  </CardHeader>
</Card>
```

## 4. Animações

### Adicionar Transições Suaves
```css
.chat-transition {
  @apply transition-all duration-200 ease-in-out;
}

.chat-fade-in {
  @apply animate-in fade-in duration-200;
}

.chat-slide-in {
  @apply animate-in slide-in-from-bottom-2 duration-200;
}
```

## 5. Estados de Loading

### Adicionar Skeleton Loading
```typescript
function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-[200px] rounded bg-muted animate-pulse" />
          <div className="h-3 w-[150px] rounded bg-muted animate-pulse" />
        </div>
      </div>
      {/* Adicionar mais elementos skeleton conforme necessário */}
    </div>
  );
}
```

## 6. Melhorias de Performance

### Otimizações Recomendadas
- Implementar virtualização para listas de contatos/mensagens
- Memoizar componentes que não precisam re-renderizar
- Lazy loading para recursos pesados
- Implementar debounce na busca

```typescript
// Exemplo de virtualização
import { VirtualList } from '@virtuoso/react';

function ChatList({ contacts }) {
  return (
    <VirtualList
      data={contacts}
      itemContent={(index, contact) => (
        <ContactItem key={contact.id} contact={contact} />
      )}
      className="h-full"
    />
  );
}
```

## 7. Acessibilidade

### Melhorias Necessárias
```typescript
// Adicionar roles e aria-labels apropriados
<div role="status" aria-live="polite">
  <Badge>{label}</Badge>
</div>

<Input
  aria-label="Buscar contatos"
  role="searchbox"
  // ...
/>

// Adicionar navegação por teclado
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Ação do clique
    }
  }}
>
  {/* Conteúdo clicável */}
</div>

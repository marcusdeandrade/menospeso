# Correções Necessárias para Navegação

## 1. Problemas Identificados no nav-main.tsx

### Estrutura Atual
- Usa uma estrutura simples de `nav` com `div`s aninhadas
- Falta componentes específicos da Sidebar
- Implementação básica de submenus sem animações ou interatividade
- Falta suporte para estados expandidos/colapsados

### Correção Necessária
```typescript
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90 transition-transform">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
```

## 2. Melhorias de Estilização

### Classes CSS Necessárias
```css
/* Adicionar ao seu arquivo de estilos */
.sidebar-menu-item {
  @apply transition-colors;
}

.sidebar-menu-button {
  @apply flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm;
  @apply hover:bg-sidebar-accent hover:text-sidebar-accent-foreground;
  @apply data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground;
}

.sidebar-menu-sub {
  @apply pl-8 mt-1 space-y-1;
}

.sidebar-menu-sub-button {
  @apply flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm;
  @apply text-muted-foreground;
  @apply hover:bg-accent hover:text-accent-foreground;
}
```

## 3. Animações e Interatividade

### Adicionar Animações
```typescript
// Componente CollapsibleContent
<CollapsibleContent
  className={cn(
    "overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
  )}
>
  {/* ... */}
</CollapsibleContent>
```

### Keyframes
```css
@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
}

.animate-slideDown {
  animation: slideDown 0.2s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.2s ease-out;
}
```

## 4. Acessibilidade

### Melhorias Necessárias
- Adicionar `aria-label` aos botões
- Incluir `aria-expanded` nos menus colapsáveis
- Garantir foco visível em todos os elementos interativos
- Adicionar suporte a navegação por teclado

```typescript
// Exemplo de implementação
<SidebarMenuButton
  aria-label={`Menu ${item.title}`}
  aria-expanded={isOpen}
  role="button"
  tabIndex={0}
>
  {/* ... */}
</SidebarMenuButton>
```

## 5. Responsividade

### Ajustes Mobile
```typescript
// Hook de responsividade
const { isMobile } = useMobile();

// Ajuste condicional
<SidebarMenu className={cn(
  "space-y-1",
  isMobile && "px-2"
)}>
  {/* ... */}
</SidebarMenu>
```

## 6. Performance

### Otimizações Recomendadas
- Memoizar componentes que não precisam re-renderizar
- Usar `useCallback` para handlers de eventos
- Implementar virtualização para listas longas
- Lazy loading para submenus grandes

```typescript
// Exemplo de memoização
const MemoizedMenuItem = React.memo(SidebarMenuItem);
const MemoizedMenuButton = React.memo(SidebarMenuButton);

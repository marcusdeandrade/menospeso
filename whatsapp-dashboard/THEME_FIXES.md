# Correções de Tema e Cores

## 1. Configuração do Tema Escuro

### Atualizar tailwind.config.js
```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(0 0% 100%)',
          dark: 'hsl(0 0% 9%)'
        },
        sidebar: {
          DEFAULT: 'hsl(0 0% 98%)',
          dark: 'hsl(0 0% 7%)',
          border: {
            DEFAULT: 'hsl(0 0% 90%)',
            dark: 'hsl(0 0% 15%)'
          }
        },
        accent: {
          DEFAULT: 'hsl(0 0% 93%)',
          dark: 'hsl(0 0% 13%)',
          foreground: {
            DEFAULT: 'hsl(0 0% 9%)',
            dark: 'hsl(0 0% 98%)'
          }
        }
      }
    }
  }
}
```

### Atualizar globals.css
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    
    --sidebar: 0 0% 98%;
    --sidebar-foreground: 0 0% 9%;
    
    --accent: 0 0% 93%;
    --accent-foreground: 0 0% 9%;
  }

  .dark {
    --background: 0 0% 9%;
    --foreground: 0 0% 98%;
    
    --sidebar: 0 0% 7%;
    --sidebar-foreground: 0 0% 98%;
    
    --accent: 0 0% 13%;
    --accent-foreground: 0 0% 98%;
  }
}
```

## 2. Correções nos Componentes

### Sidebar.tsx
```typescript
<div
  ref={ref}
  className={cn(
    "flex h-full flex-col bg-sidebar border-r border-sidebar-border",
    "dark:bg-sidebar-dark dark:border-sidebar-border-dark",
    variant === "inset" && "border-none",
    className
  )}
  {...props}
/>
```

### SidebarMenuButton
```typescript
<Component
  ref={ref}
  className={cn(
    "flex w-full items-center gap-2 rounded-lg px-2",
    "hover:bg-accent hover:text-accent-foreground",
    "dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark",
    "transition-colors duration-200",
    size === "lg" && "h-12",
    size === "default" && "h-10",
    size === "sm" && "h-8",
    className
  )}
  {...props}
/>
```

### ChatInterface.tsx
```typescript
<Card className={cn(
  "h-full border-none bg-background",
  "dark:bg-background-dark"
)}>
  <CardHeader className={cn(
    "border-b border-sidebar-border",
    "dark:border-sidebar-border-dark"
  )}>
    {/* ... */}
  </CardHeader>
</Card>
```

## 3. Cores de Status

### Status Badges
```typescript
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
```

## 4. Elementos de UI

### Inputs e Campos de Texto
```typescript
<Input
  className={cn(
    "bg-background border-sidebar-border",
    "dark:bg-background-dark dark:border-sidebar-border-dark",
    "focus:ring-accent-dark focus:border-accent-dark"
  )}
/>
```

### Botões
```typescript
<Button
  className={cn(
    "bg-accent text-accent-foreground",
    "dark:bg-accent-dark dark:text-accent-foreground-dark",
    "hover:bg-accent/90 dark:hover:bg-accent-dark/90"
  )}
/>
```

## 5. Ícones e Elementos Visuais

### Ajuste de Cores de Ícones
```typescript
<Icon className={cn(
  "text-foreground/60",
  "dark:text-foreground-dark/60"
)} />
```

### Separadores
```typescript
<Separator className={cn(
  "bg-sidebar-border",
  "dark:bg-sidebar-border-dark"
)} />
```

## 6. Implementação

1. Adicionar classe 'dark' ao elemento html:
```typescript
// Em src/App.tsx ou _app.tsx
useEffect(() => {
  document.documentElement.classList.add('dark');
}, []);
```

2. Atualizar todas as referências de cores nos componentes

3. Testar em ambos os temas para garantir consistência

## 7. Considerações de Acessibilidade

- Manter contraste adequado em ambos os temas
- Testar com ferramentas de acessibilidade
- Garantir legibilidade de todos os textos
- Adicionar indicadores visuais claros para estados hover/focus

## 8. Performance

- Usar CSS Variables para transições suaves entre temas
- Minimizar reflows durante mudanças de tema
- Implementar prefers-color-scheme para detecção automática

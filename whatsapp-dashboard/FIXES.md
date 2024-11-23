# Correções Necessárias para Interface

## 1. Componentes da Sidebar

### Adicionar Componentes Faltantes em `src/components/ui/sidebar.tsx`:
```typescript
const SidebarMenuSub = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pl-8 mt-1 space-y-1", className)}
    {...props}
  />
));

const SidebarMenuSubItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2", className)}
      {...props}
    />
  )
);

const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      />
    );
  }
);

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "ml-auto flex h-4 w-4 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
));

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
));
```

## 2. Correções de Estilização

### Em `src/index.css`:
```css
:root {
  --sidebar-primary: hsl(0 0% 9%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(0 0% 13%);
  --sidebar-accent-foreground: hsl(0 0% 98%);
}

.dark {
  --sidebar-primary: hsl(0 0% 98%);
  --sidebar-primary-foreground: hsl(0 0% 9%);
  --sidebar-accent: hsl(0 0% 93%);
  --sidebar-accent-foreground: hsl(0 0% 9%);
}
```

### Atualizar Classes no Sidebar:
```typescript
// Em SidebarMenuButton
className={cn(
  "flex w-full items-center gap-2 rounded-lg px-2 transition-colors",
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
  size === "lg" && "h-12",
  size === "default" && "h-10",
  size === "sm" && "h-8",
  className
)}
```

## 3. Implementação de Navegação

### Criar NavProjects em `src/components/nav/nav-projects.tsx`:
```typescript
export function NavProjects({ projects }: { projects: Project[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.name}>
              <SidebarMenuButton asChild size="sm">
                <a href={project.url}>
                  <project.icon className="h-4 w-4" />
                  <span>{project.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
```

## 4. Ajustes no Layout Principal

### Em `src/App.tsx`:
```typescript
<div className="flex h-screen bg-background">
  <AppSidebar className="w-[300px] border-r" />
  <main className="flex-1 overflow-auto">
    <div className="container mx-auto p-6">
      <ChatInterface />
    </div>
  </main>
</div>
```

## 5. Melhorias de Responsividade

### Em `src/hooks/use-mobile.tsx`:
```typescript
export function useMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile };
}
```

## 6. Próximos Passos

1. Implementar todos os componentes faltantes da sidebar
2. Adicionar as variáveis CSS necessárias
3. Atualizar o sistema de navegação com suporte a submenus
4. Melhorar a responsividade
5. Adicionar animações de transição
6. Implementar estados ativos nos itens de menu

## 7. Considerações de Performance

- Usar React.memo() para componentes que não precisam re-renderizar frequentemente
- Implementar lazy loading para componentes grandes
- Otimizar as transições CSS para melhor performance

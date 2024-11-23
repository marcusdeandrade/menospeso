import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface NavSecondaryProps {
  items: NavItem[];
  className?: string;
}

export function NavSecondary({ items, className }: NavSecondaryProps) {
  return (
    <nav className={cn("grid gap-1", className)}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </a>
      ))}
    </nav>
  );
}

import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  return (
    <nav className="grid gap-1">
      {items.map((item, index) => (
        <div key={index} className="grid gap-1">
          <a
            href={item.url}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              item.isActive && "bg-accent text-accent-foreground"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
          </a>
          {item.items?.length && (
            <div className="grid gap-1 pl-6">
              {item.items.map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href={subItem.url}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <span>{subItem.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

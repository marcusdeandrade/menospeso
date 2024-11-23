import { type LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

interface NavSecondaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavSecondary({ items, className, ...props }: NavSecondaryProps) {
  return (
    <div className="mt-auto pt-4 border-t border-[#2A2A2A]" {...props}>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex-1">
                <item.icon className="size-4 text-[#666666]" />
                <span className="text-[#666666]">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}

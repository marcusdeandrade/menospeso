"use client"

import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { cn } from "../../lib/utils";

interface NavSecondaryProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavSecondary({ items, className, ...props }: NavSecondaryProps) {
  const location = useLocation();

  return (
    <SidebarGroup className={cn("group-data-[collapsible=icon]:hidden", className)} {...props}>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              asChild 
              tooltip={item.title}
              className={cn(
                location.pathname === item.url && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Link to={item.url}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

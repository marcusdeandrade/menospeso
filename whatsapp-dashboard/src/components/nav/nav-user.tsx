import { ChevronRight } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <button className="w-full">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#1C1C1C]">
              <span className="text-sm font-medium text-[#666666]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium truncate text-[#A1A1A1]">{user.name}</div>
              <div className="text-xs truncate text-[#666666]">{user.email}</div>
            </div>
            <SidebarMenuAction className="ml-2">
              <ChevronRight className="size-4" />
            </SidebarMenuAction>
          </button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

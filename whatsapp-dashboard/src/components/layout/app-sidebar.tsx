"use client"

import { Command, MessageSquare, Settings2, LifeBuoy, Send, QrCode, Bot, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { NavMain } from "../nav/nav-main";
import { NavSecondary } from "../nav/nav-secondary";
import { NavUser } from "../nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarGroup,
  SidebarSeparator,
} from "../ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useWhatsAppStore } from "../../store/whatsappStore";
import { cn } from "../../lib/utils";
import { WhatsAppConnection } from "../whatsapp/WhatsAppConnection";

const navData = {
  user: {
    name: "WhatsApp User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard"
        },
        {
          title: "Análise de Mensagens",
          url: "/dashboard/messages"
        },
        {
          title: "Desempenho do Bot",
          url: "/dashboard/bot"
        }
      ]
    },
    {
      title: "Mensagens",
      url: "/chat",
      icon: MessageSquare,
      items: [
        {
          title: "Interface de Chat",
          url: "/chat"
        },
        {
          title: "Histórico",
          url: "/messages/history"
        },
        {
          title: "Favoritas",
          url: "/messages/starred"
        },
        {
          title: "Arquivadas",
          url: "/messages/archived"
        }
      ]
    },
    {
      title: "Bot de Mensagens",
      url: "/bot",
      icon: Bot,
      items: [
        {
          title: "Fluxos",
          url: "/bot/flows"
        },
        {
          title: "Respostas",
          url: "/bot/responses"
        },
        {
          title: "Configurações",
          url: "/bot/settings",
          description: "Configurações da OpenAI API e Assistente"
        }
      ]
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Geral",
          url: "/settings/general"
        },
        {
          title: "Notificações",
          url: "/settings/notifications"
        },
        {
          title: "Privacidade",
          url: "/settings/privacy"
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy
    },
    {
      title: "Enviar Feedback",
      url: "#",
      icon: Send
    }
  ]
};

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { status } = useWhatsAppStore();
  const isConnected = status === "connected";

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className={className} {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-white">WhatsApp Cloud</span>
                    <span className="truncate text-xs text-[#666666]">Dashboard</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-4">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <SidebarMenuButton 
                        size="lg" 
                        className={cn(
                          "border border-[#2A2A2A] rounded-lg",
                          "hover:border-[#404040]",
                          "bg-[#1C1C1C]"
                        )}
                        tooltip="WhatsApp QR"
                      >
                        <QrCode className="size-4" />
                        <span className="flex-1 text-left">WhatsApp QR</span>
                        <div 
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            isConnected 
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          )}
                        >
                          {isConnected ? "Online" : "Offline"}
                        </div>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Código QR do WhatsApp</DialogTitle>
                      </DialogHeader>
                      <WhatsAppConnection />
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            <NavMain items={navData.navMain} />
          </div>
          <NavSecondary items={navData.navSecondary} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={navData.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}

import { QrCode, Command, MessageSquare, Phone, Settings2, LifeBuoy, Send } from "lucide-react";
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
  SidebarGroup,
} from "../ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
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
      title: "Mensagens",
      url: "#",
      icon: MessageSquare,
      isActive: true,
      items: [
        {
          title: "Histórico",
          url: "#"
        },
        {
          title: "Favoritas",
          url: "#"
        },
        {
          title: "Arquivadas",
          url: "#"
        }
      ]
    },
    {
      title: "Chamadas",
      url: "#",
      icon: Phone,
      items: [
        {
          title: "Recentes",
          url: "#"
        },
        {
          title: "Perdidas",
          url: "#"
        }
      ]
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Geral",
          url: "#"
        },
        {
          title: "Notificações",
          url: "#"
        },
        {
          title: "Privacidade",
          url: "#"
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { status } = useWhatsAppStore();
  const isConnected = status === "connected";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-semibold text-white">WhatsApp Cloud</span>
                  <span className="truncate text-xs text-[#666666]">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
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
          <Separator className="my-4 bg-[#2A2A2A]" />
          <div className="flex-1 flex flex-col min-h-0">
            <NavMain items={navData.navMain} />
            <NavSecondary items={navData.navSecondary} />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

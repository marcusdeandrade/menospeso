{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 "use client"\
\
import \{\
  BadgeCheck,\
  Bell,\
  ChevronsUpDown,\
  CreditCard,\
  LogOut,\
  Sparkles,\
\} from "lucide-react"\
\
import \{\
  Avatar,\
  AvatarFallback,\
  AvatarImage,\
\} from "@/components/ui/avatar"\
import \{\
  DropdownMenu,\
  DropdownMenuContent,\
  DropdownMenuGroup,\
  DropdownMenuItem,\
  DropdownMenuLabel,\
  DropdownMenuSeparator,\
  DropdownMenuTrigger,\
\} from "@/components/ui/dropdown-menu"\
import \{\
  SidebarMenu,\
  SidebarMenuButton,\
  SidebarMenuItem,\
  useSidebar,\
\} from "@/components/ui/sidebar"\
\
export function NavUser(\{\
  user,\
\}: \{\
  user: \{\
    name: string\
    email: string\
    avatar: string\
  \}\
\}) \{\
  const \{ isMobile \} = useSidebar()\
\
  return (\
    <SidebarMenu>\
      <SidebarMenuItem>\
        <DropdownMenu>\
          <DropdownMenuTrigger asChild>\
            <SidebarMenuButton\
              size="lg"\
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"\
            >\
              <Avatar className="h-8 w-8 rounded-lg">\
                <AvatarImage src=\{user.avatar\} alt=\{user.name\} />\
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>\
              </Avatar>\
              <div className="grid flex-1 text-left text-sm leading-tight">\
                <span className="truncate font-semibold">\{user.name\}</span>\
                <span className="truncate text-xs">\{user.email\}</span>\
              </div>\
              <ChevronsUpDown className="ml-auto size-4" />\
            </SidebarMenuButton>\
          </DropdownMenuTrigger>\
          <DropdownMenuContent\
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"\
            side=\{isMobile ? "bottom" : "right"\}\
            align="end"\
            sideOffset=\{4\}\
          >\
            <DropdownMenuLabel className="p-0 font-normal">\
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">\
                <Avatar className="h-8 w-8 rounded-lg">\
                  <AvatarImage src=\{user.avatar\} alt=\{user.name\} />\
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>\
                </Avatar>\
                <div className="grid flex-1 text-left text-sm leading-tight">\
                  <span className="truncate font-semibold">\{user.name\}</span>\
                  <span className="truncate text-xs">\{user.email\}</span>\
                </div>\
              </div>\
            </DropdownMenuLabel>\
            <DropdownMenuSeparator />\
            <DropdownMenuGroup>\
              <DropdownMenuItem>\
                <Sparkles />\
                Upgrade to Pro\
              </DropdownMenuItem>\
            </DropdownMenuGroup>\
            <DropdownMenuSeparator />\
            <DropdownMenuGroup>\
              <DropdownMenuItem>\
                <BadgeCheck />\
                Account\
              </DropdownMenuItem>\
              <DropdownMenuItem>\
                <CreditCard />\
                Billing\
              </DropdownMenuItem>\
              <DropdownMenuItem>\
                <Bell />\
                Notifications\
              </DropdownMenuItem>\
            </DropdownMenuGroup>\
            <DropdownMenuSeparator />\
            <DropdownMenuItem>\
              <LogOut />\
              Log out\
            </DropdownMenuItem>\
          </DropdownMenuContent>\
        </DropdownMenu>\
      </SidebarMenuItem>\
    </SidebarMenu>\
  )\
\}\
}
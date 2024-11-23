{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 "use client"\
\
import \{\
  Folder,\
  MoreHorizontal,\
  Share,\
  Trash2,\
  type LucideIcon,\
\} from "lucide-react"\
\
import \{\
  DropdownMenu,\
  DropdownMenuContent,\
  DropdownMenuItem,\
  DropdownMenuSeparator,\
  DropdownMenuTrigger,\
\} from "@/components/ui/dropdown-menu"\
import \{\
  SidebarGroup,\
  SidebarGroupLabel,\
  SidebarMenu,\
  SidebarMenuAction,\
  SidebarMenuButton,\
  SidebarMenuItem,\
  useSidebar,\
\} from "@/components/ui/sidebar"\
\
export function NavProjects(\{\
  projects,\
\}: \{\
  projects: \{\
    name: string\
    url: string\
    icon: LucideIcon\
  \}[]\
\}) \{\
  const \{ isMobile \} = useSidebar()\
\
  return (\
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">\
      <SidebarGroupLabel>Projects</SidebarGroupLabel>\
      <SidebarMenu>\
        \{projects.map((item) => (\
          <SidebarMenuItem key=\{item.name\}>\
            <SidebarMenuButton asChild>\
              <a href=\{item.url\}>\
                <item.icon />\
                <span>\{item.name\}</span>\
              </a>\
            </SidebarMenuButton>\
            <DropdownMenu>\
              <DropdownMenuTrigger asChild>\
                <SidebarMenuAction showOnHover>\
                  <MoreHorizontal />\
                  <span className="sr-only">More</span>\
                </SidebarMenuAction>\
              </DropdownMenuTrigger>\
              <DropdownMenuContent\
                className="w-48"\
                side=\{isMobile ? "bottom" : "right"\}\
                align=\{isMobile ? "end" : "start"\}\
              >\
                <DropdownMenuItem>\
                  <Folder className="text-muted-foreground" />\
                  <span>View Project</span>\
                </DropdownMenuItem>\
                <DropdownMenuItem>\
                  <Share className="text-muted-foreground" />\
                  <span>Share Project</span>\
                </DropdownMenuItem>\
                <DropdownMenuSeparator />\
                <DropdownMenuItem>\
                  <Trash2 className="text-muted-foreground" />\
                  <span>Delete Project</span>\
                </DropdownMenuItem>\
              </DropdownMenuContent>\
            </DropdownMenu>\
          </SidebarMenuItem>\
        ))\}\
        <SidebarMenuItem>\
          <SidebarMenuButton>\
            <MoreHorizontal />\
            <span>More</span>\
          </SidebarMenuButton>\
        </SidebarMenuItem>\
      </SidebarMenu>\
    </SidebarGroup>\
  )\
\}\
}
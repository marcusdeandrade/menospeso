{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 "use client"\
\
import \{ ChevronRight, type LucideIcon \} from "lucide-react"\
\
import \{\
  Collapsible,\
  CollapsibleContent,\
  CollapsibleTrigger,\
\} from "@/components/ui/collapsible"\
import \{\
  SidebarGroup,\
  SidebarGroupLabel,\
  SidebarMenu,\
  SidebarMenuAction,\
  SidebarMenuButton,\
  SidebarMenuItem,\
  SidebarMenuSub,\
  SidebarMenuSubButton,\
  SidebarMenuSubItem,\
\} from "@/components/ui/sidebar"\
\
export function NavMain(\{\
  items,\
\}: \{\
  items: \{\
    title: string\
    url: string\
    icon: LucideIcon\
    isActive?: boolean\
    items?: \{\
      title: string\
      url: string\
    \}[]\
  \}[]\
\}) \{\
  return (\
    <SidebarGroup>\
      <SidebarGroupLabel>Platform</SidebarGroupLabel>\
      <SidebarMenu>\
        \{items.map((item) => (\
          <Collapsible key=\{item.title\} asChild defaultOpen=\{item.isActive\}>\
            <SidebarMenuItem>\
              <SidebarMenuButton asChild tooltip=\{item.title\}>\
                <a href=\{item.url\}>\
                  <item.icon />\
                  <span>\{item.title\}</span>\
                </a>\
              </SidebarMenuButton>\
              \{item.items?.length ? (\
                <>\
                  <CollapsibleTrigger asChild>\
                    <SidebarMenuAction className="data-[state=open]:rotate-90">\
                      <ChevronRight />\
                      <span className="sr-only">Toggle</span>\
                    </SidebarMenuAction>\
                  </CollapsibleTrigger>\
                  <CollapsibleContent>\
                    <SidebarMenuSub>\
                      \{item.items?.map((subItem) => (\
                        <SidebarMenuSubItem key=\{subItem.title\}>\
                          <SidebarMenuSubButton asChild>\
                            <a href=\{subItem.url\}>\
                              <span>\{subItem.title\}</span>\
                            </a>\
                          </SidebarMenuSubButton>\
                        </SidebarMenuSubItem>\
                      ))\}\
                    </SidebarMenuSub>\
                  </CollapsibleContent>\
                </>\
              ) : null\}\
            </SidebarMenuItem>\
          </Collapsible>\
        ))\}\
      </SidebarMenu>\
    </SidebarGroup>\
  )\
\}\
}
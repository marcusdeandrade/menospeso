{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import * as React from "react"\
import \{ type LucideIcon \} from "lucide-react"\
\
import \{\
  SidebarGroup,\
  SidebarGroupContent,\
  SidebarMenu,\
  SidebarMenuButton,\
  SidebarMenuItem,\
\} from "@/components/ui/sidebar"\
\
export function NavSecondary(\{\
  items,\
  ...props\
\}: \{\
  items: \{\
    title: string\
    url: string\
    icon: LucideIcon\
  \}[]\
\} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) \{\
  return (\
    <SidebarGroup \{...props\}>\
      <SidebarGroupContent>\
        <SidebarMenu>\
          \{items.map((item) => (\
            <SidebarMenuItem key=\{item.title\}>\
              <SidebarMenuButton asChild size="sm">\
                <a href=\{item.url\}>\
                  <item.icon />\
                  <span>\{item.title\}</span>\
                </a>\
              </SidebarMenuButton>\
            </SidebarMenuItem>\
          ))\}\
        </SidebarMenu>\
      </SidebarGroupContent>\
    </SidebarGroup>\
  )\
\}\
}
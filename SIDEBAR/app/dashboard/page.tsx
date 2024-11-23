{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ AppSidebar \} from "@/components/app-sidebar"\
import \{\
  Breadcrumb,\
  BreadcrumbItem,\
  BreadcrumbLink,\
  BreadcrumbList,\
  BreadcrumbPage,\
  BreadcrumbSeparator,\
\} from "@/components/ui/breadcrumb"\
import \{ Separator \} from "@/components/ui/separator"\
import \{\
  SidebarInset,\
  SidebarProvider,\
  SidebarTrigger,\
\} from "@/components/ui/sidebar"\
\
export function Page() \{\
  return (\
    <SidebarProvider>\
      <AppSidebar />\
      <SidebarInset>\
        <header className="flex h-16 shrink-0 items-center gap-2">\
          <div className="flex items-center gap-2 px-4">\
            <SidebarTrigger className="-ml-1" />\
            <Separator orientation="vertical" className="mr-2 h-4" />\
            <Breadcrumb>\
              <BreadcrumbList>\
                <BreadcrumbItem className="hidden md:block">\
                  <BreadcrumbLink href="#">\
                    Building Your Application\
                  </BreadcrumbLink>\
                </BreadcrumbItem>\
                <BreadcrumbSeparator className="hidden md:block" />\
                <BreadcrumbItem>\
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>\
                </BreadcrumbItem>\
              </BreadcrumbList>\
            </Breadcrumb>\
          </div>\
        </header>\
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">\
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">\
            <div className="aspect-video rounded-xl bg-muted/50" />\
            <div className="aspect-video rounded-xl bg-muted/50" />\
            <div className="aspect-video rounded-xl bg-muted/50" />\
          </div>\
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />\
        </div>\
      </SidebarInset>\
    </SidebarProvider>\
  )\
\}\
}
"use client"

import { useState } from "react";
import { useOpenAIStore } from "../../../store/openaiStore";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList 
} from "../../../components/ui/breadcrumb";
import { SettingsLayout } from "../../../components/layout/settings-layout";
import { cn } from "../../../lib/utils";

export default function OpenAISettingsPage() {
  const {
    apiKey,
    assistantId,
    assistantName,
    isApiConnected,
    isAssistantConnected,
    setApiKey,
    setAssistantId,
  } = useOpenAIStore();

  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [tempAssistantId, setTempAssistantId] = useState(assistantId);

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey);
  };

  const handleSaveAssistantId = () => {
    setAssistantId(tempAssistantId);
  };

  return (
    <SettingsLayout>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">Configurações</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem current>
            <BreadcrumbLink>OpenAI</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="mt-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">OpenAI</h1>
        <p className="text-[15px] text-muted-foreground">
          Configure as credenciais da OpenAI API e Assistente.
        </p>
      </div>

      {/* Content */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Credenciais da OpenAI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">OpenAI API Key</span>
                <div 
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    isApiConnected 
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  )}
                >
                  {isApiConnected ? "Online" : "Offline"}
                </div>
              </div>
              <div className="flex gap-2">
                <Input 
                  type="password" 
                  className="flex-1"
                  placeholder="sk-..."
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                />
                <Button className="shrink-0" onClick={handleSaveApiKey}>
                  Salvar
                </Button>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">ID do Assistente</span>
                <div 
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    isAssistantConnected 
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  )}
                >
                  {isAssistantConnected ? "Online" : "Offline"}
                </div>
                {assistantName && (
                  <div className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                    {assistantName}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  className="flex-1"
                  placeholder="asst_..."
                  value={tempAssistantId}
                  onChange={(e) => setTempAssistantId(e.target.value)}
                />
                <Button className="shrink-0" onClick={handleSaveAssistantId}>
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SettingsLayout>
  );
}

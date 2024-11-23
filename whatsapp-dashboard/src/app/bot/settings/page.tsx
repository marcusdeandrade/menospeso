"use client"

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface SavedLink {
  id: string;
  url: string;
  description: string;
}

interface StatusBadgeProps {
  isOnline: boolean;
}

const StatusBadge = ({ isOnline }: StatusBadgeProps) => (
  <div className={cn(
    "flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium",
    isOnline 
      ? "bg-green-500/10 text-green-400"
      : "bg-red-500/10 text-red-400"
  )}>
    <div className={cn(
      "size-2 rounded-full animate-pulse",
      isOnline ? "bg-green-500" : "bg-red-500"
    )} />
    {isOnline ? "Online" : "Offline"}
  </div>
);

export default function BotSettingsPage() {
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
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [newLink, setNewLink] = useState({ url: "", description: "" });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addLink = () => {
    if (newLink.url && newLink.description) {
      setLinks(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        ...newLink
      }]);
      setNewLink({ url: "", description: "" });
    }
  };

  // Update local state when store values change
  useEffect(() => {
    setTempApiKey(apiKey);
    setTempAssistantId(assistantId);
  }, [apiKey, assistantId]);

  const handleSaveApiKey = async () => {
    setIsSaving(true);
    try {
      await setApiKey(tempApiKey);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAssistantId = async () => {
    setIsSaving(true);
    try {
      await setAssistantId(tempAssistantId);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/bot">Bot</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem current>
              <BreadcrumbLink>Configurações</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações do Bot</h1>
          <p className="text-[15px] text-muted-foreground">
            Configure as credenciais da OpenAI API e Assistente.
          </p>
        </div>

        {/* OpenAI Credentials */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Credenciais da OpenAI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">OpenAI API Key</span>
                  <StatusBadge isOnline={isApiConnected} />
                </div>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    className="flex-1"
                    placeholder="sk-..."
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                  />
                  <Button 
                    className="shrink-0" 
                    onClick={handleSaveApiKey}
                    disabled={isSaving || !tempApiKey || tempApiKey === apiKey}
                  >
                    {isSaving ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">ID do Assistente</span>
                  <StatusBadge isOnline={isAssistantConnected} />
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
                  <Button 
                    className="shrink-0" 
                    onClick={handleSaveAssistantId}
                    disabled={isSaving || !tempAssistantId || tempAssistantId === assistantId}
                  >
                    {isSaving ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Arquivos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              {...getRootProps()} 
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
              )}
            >
              <input {...getInputProps()} />
              <p className="text-sm text-muted-foreground">
                {isDragActive 
                  ? "Solte os arquivos aqui..."
                  : "Arraste e solte arquivos aqui, ou clique para selecionar"
                }
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Arquivos carregados</h3>
                <div className="divide-y divide-border rounded-lg border">
                  {files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-2.5">
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setFiles(files.filter(f => f.id !== file.id))}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Links Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2.5">
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    placeholder="https://"
                    value={newLink.url}
                    onChange={e => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-medium">Descrição</label>
                  <Input
                    placeholder="Descrição do link"
                    value={newLink.description}
                    onChange={e => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={addLink} className="w-full">
                Adicionar Link
              </Button>
            </div>

            {links.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Links salvos</h3>
                <div className="divide-y divide-border rounded-lg border">
                  {links.map(link => (
                    <div key={link.id} className="p-2.5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline"
                          >
                            {link.url}
                          </a>
                          <p className="text-xs text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setLinks(links.filter(l => l.id !== link.id))}
                          className="shrink-0"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
}

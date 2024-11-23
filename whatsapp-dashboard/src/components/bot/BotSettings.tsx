import { useState } from "react";
import { useOpenAIStore } from "../../store/openaiStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

export function BotSettings() {
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
    <Card>
      <CardHeader>
        <CardTitle>Credenciais da OpenAI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <span>OpenAI API Key</span>
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
            <div className="flex gap-4">
              <Input
                type="password"
                className="flex-1"
                placeholder="sk-..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
              />
              <Button onClick={handleSaveApiKey}>Salvar</Button>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <span>ID do Assistente</span>
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
            <div className="flex gap-4">
              <Input
                type="text"
                className="flex-1"
                placeholder="asst_..."
                value={tempAssistantId}
                onChange={(e) => setTempAssistantId(e.target.value)}
              />
              <Button onClick={handleSaveAssistantId}>Salvar</Button>
            </div>
          </label>
                {assistantName && (
                  <div className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                    {assistantName}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Input
                  type="text"
                  className="flex-1"
                  placeholder="asst_..."
                  value={tempAssistantId}
                  onChange={(e) => setTempAssistantId(e.target.value)}
                />
                <Button onClick={handleSaveAssistantId}>Salvar</Button>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Files Section */}
      <Card>
        <CardHeader>
          <CardTitle>Arquivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
            <p className="text-muted-foreground">
              Arraste e solte arquivos aqui, ou clique para selecionar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

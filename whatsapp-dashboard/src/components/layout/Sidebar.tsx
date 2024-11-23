import { useWhatsAppStore } from '@/store/whatsappStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  PhoneCall,
  Menu
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const { status } = useWhatsAppStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getStatusBadge = () => {
    switch (status) {
      case 'CONNECTED':
        return <Badge variant="success">Connected</Badge>;
      case 'CONNECTING':
        return <Badge variant="warning">Connecting</Badge>;
      case 'DISCONNECTED':
        return <Badge variant="error">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className={cn(
      "relative h-full bg-white shadow-lg transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-[-12px] top-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="p-4 border-b">
        <div className={cn(
          "flex items-center space-x-2",
          isCollapsed && "justify-center"
        )}>
          <PhoneCall className="w-6 h-6" />
          {!isCollapsed && (
            <h1 className="text-xl font-semibold text-gray-800">
              WhatsApp
            </h1>
          )}
        </div>
        {!isCollapsed && (
          <div className="mt-2 flex items-center space-x-2">
            {getStatusBadge()}
          </div>
        )}
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full",
              isCollapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full",
              isCollapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <MessageSquare className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Messages</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full",
              isCollapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="text-sm text-gray-600">
            Version 1.0.0
          </div>
        </div>
      )}
    </div>
  );
};

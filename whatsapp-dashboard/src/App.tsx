import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/layout/app-sidebar";
import { ChatInterface } from "./components/chat/ChatInterface";
import BotSettingsPage from "./app/bot/settings/page";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="flex min-h-screen">
          {/* Fixed width sidebar */}
          <div className="w-64 shrink-0">
            <AppSidebar className="fixed top-0 bottom-0 w-64 border-r border-border" />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 min-w-0 overflow-auto">
            <Routes>
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/bot/settings" element={<BotSettingsPage />} />
              <Route path="/" element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                  <p className="text-muted-foreground">
                    Bem-vindo ao WhatsApp Cloud Dashboard
                  </p>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;

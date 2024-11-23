import { AppSidebar } from "./components/layout/app-sidebar";
import { ChatInterface } from "./components/chat/ChatInterface";

function App() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar className="w-[300px]" />
      <main className="flex-1 p-6 overflow-auto">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;

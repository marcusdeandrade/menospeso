import { AppSidebar } from "./components/layout/app-sidebar";
import { ChatInterface } from "./components/chat/ChatInterface";

function App() {
  return (
    <div className="flex h-screen bg-[#1C1C1C]">
      <AppSidebar className="w-[280px] shrink-0" />
      <main className="flex-1 p-6 overflow-auto">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;

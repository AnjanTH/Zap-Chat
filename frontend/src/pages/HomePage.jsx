import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex items-center justify-center pt-16 px-0 md:pt-20 md:px-4">
        <div className="bg-base-100 w-full md:rounded-lg md:shadow-cl md:max-w-6xl h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)]">
          <div className="flex h-full relative md:rounded-lg overflow-hidden">
            <Sidebar />
            
            <div className="flex-1">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

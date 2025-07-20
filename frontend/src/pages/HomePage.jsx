import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center h-full px-0 md:px-4 py-0 md:py-4">
        <div className="bg-base-100 w-full md:rounded-lg md:shadow-cl md:max-w-6xl h-full md:h-[90vh]">
          <div className="flex h-full md:rounded-lg overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import { MessageSquare, Users } from "lucide-react";
import { useSidebarStore } from "../store/useSidebarStore";

const NoChatSelected = () => {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to ZapChat!</h2>
        <p className="text-base-content/60 mb-8">
          Start a conversation with your contacts
        </p>

        {/* Mobile Contact Button */}
        <button
          onClick={toggleSidebar}
          className="btn btn-primary gap-2 md:hidden"
        >
          <Users className="w-5 h-5" />
          View Contacts
        </button>
      </div>
    </div>
  );
};

export default NoChatSelected;

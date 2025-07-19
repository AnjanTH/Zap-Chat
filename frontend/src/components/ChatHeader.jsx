import { X, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useSidebarStore } from "../store/useSidebarStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="p-3 sm:p-4 border-b border-base-300 bg-base-100/95 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 sm:size-12 rounded-full relative ring-2 ring-primary/10">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="object-cover" 
              />
            </div>
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <h3 className="font-medium text-base sm:text-lg">{selectedUser.fullName}</h3>
            <p className="text-xs sm:text-sm text-base-content/70 flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${
                onlineUsers.includes(selectedUser._id) 
                  ? "bg-success" 
                  : "bg-base-content/20"
              }`} />
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Contacts toggle button - Mobile only */}
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-sm p-1 hover:bg-base-200 rounded-lg md:hidden"
          >
            <Users className="size-5" />
          </button>

          {/* Close button - Mobile only */}
          <button 
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm p-1 hover:bg-base-200 rounded-lg"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;

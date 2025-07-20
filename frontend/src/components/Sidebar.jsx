import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSidebarStore } from "../store/useSidebarStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, X } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { isSidebarVisible, closeSidebar } = useSidebarStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`
        fixed md:relative 
        h-full w-[280px] 
        border-r border-base-300 bg-base-100 
        z-50 md:z-auto
        top-0 md:top-auto left-0 
        transition-transform duration-200
        flex flex-col
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="border-b border-base-300 p-4 bg-base-100/95 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-5" />
            <span className="font-medium text-lg">Contacts</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-base-content/60">
              {onlineUsers.length - 1} online
            </span>
            <button
              onClick={closeSidebar}
              className="btn btn-ghost btn-sm p-1 hover:bg-base-200 rounded-lg md:hidden"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Online toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs sm:checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
        </div>
      </div>

      {/* Scrollable User List with Enhanced Scrolling */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {/* Gradient overlays for scroll indication */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-base-100 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200" id="top-gradient"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-base-100 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200" id="bottom-gradient"></div>
        
        <div 
          className="h-full overflow-y-auto py-2 scroll-smooth scrollbar-thin scrollbar-track-base-200 scrollbar-thumb-base-300 hover:scrollbar-thumb-base-content/20"
          onScroll={(e) => {
            const element = e.target;
            const topGradient = document.getElementById('top-gradient');
            const bottomGradient = document.getElementById('bottom-gradient');
            
            // Show/hide top gradient
            if (topGradient) {
              topGradient.style.opacity = element.scrollTop > 10 ? '1' : '0';
            }
            
            // Show/hide bottom gradient
            if (bottomGradient) {
              const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
              bottomGradient.style.opacity = isAtBottom ? '0' : '1';
            }
          }}
        >
          {filteredUsers.map((user, index) => (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                closeSidebar();
              }}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300/50 active:bg-base-300 
                transition-all duration-200 ease-in-out
                transform hover:scale-[1.02] active:scale-[0.98]
                hover:shadow-sm
                ${selectedUser?._id === user._id 
                  ? "bg-base-300 ring-1 ring-primary/20 shadow-sm" 
                  : ""
                }
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInSlide 0.3s ease-out forwards'
              }}
            >
              <div className="relative mx-auto lg:mx-0">
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full transition-transform duration-200 hover:scale-105"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 animate-pulse" />
                  )}
                </div>
              </div>

              <div className="text-left min-w-0 flex-1">
                <div className="font-medium truncate transition-colors duration-200">
                  {user.fullName}
                </div>
                <div className={`text-sm transition-colors duration-200 ${
                  onlineUsers.includes(user._id) 
                    ? "text-green-600 font-medium" 
                    : "text-base-content/60"
                }`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="w-1 h-8 bg-primary rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-base-content/50 py-8 px-4">
              <Users className="size-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                {showOnlineOnly ? "No online users" : "No users found"}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-track-base-200::-webkit-scrollbar-track {
          background: hsl(var(--b2));
          border-radius: 3px;
        }
        
        .scrollbar-thumb-base-300::-webkit-scrollbar-thumb {
          background: hsl(var(--b3));
          border-radius: 3px;
          transition: background-color 0.2s;
        }
        
        .scrollbar-thumb-base-300::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--bc) / 0.2);
        }

        /* Firefox scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--b3)) hsl(var(--b2));
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
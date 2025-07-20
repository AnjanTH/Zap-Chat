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

      {/* Scrollable User List */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto py-2">
          {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              closeSidebar();
            }}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="text-left min-w-0 flex-1">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-base-content/60">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
                  ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">No online users</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
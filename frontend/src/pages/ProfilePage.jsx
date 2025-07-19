import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-20">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header/Banner */}
          <div className="bg-primary/10 h-32 sm:h-48 relative">
            <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2">
              <div className="relative group">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 sm:size-40 rounded-full object-cover border-4 border-base-100 shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-2 right-2
                    bg-primary hover:bg-primary/90
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200 shadow-md
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-4 h-4 text-primary-content" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-20 sm:pt-24 px-6 pb-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{authUser?.fullName}</h1>
              <p className="text-base-content/60 text-sm mt-1">
                {isUpdatingProfile ? "Uploading..." : "Manage your personal information"}
              </p>
            </div>

            <div className="grid gap-6 max-w-xl mx-auto">
              {/* Personal Information */}
              <div className="bg-base-200/50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content/70">Full Name</label>
                    <div className="px-4 py-3 bg-base-100 rounded-lg border border-base-300">
                      {authUser?.fullName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content/70">Email Address</label>
                    <div className="px-4 py-3 bg-base-100 rounded-lg border border-base-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      {authUser?.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-base-200/50 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Account Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-base-100 border border-base-300">
                    <span className="text-base-content/70">Member Since</span>
                    <span className="font-medium">{new Date(authUser.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-base-100 border border-base-300">
                    <span className="text-base-content/70">Account Status</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-success"></span>
                      <span className="text-success font-medium">Active</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;

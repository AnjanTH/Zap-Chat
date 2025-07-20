import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect, useRef } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  const hasCalledRef = useRef(false); // ✅ prevent infinite loop

  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true;
      checkAuth();
    }
  }, [checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Loading screen component
  const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-screen pt-16 pb-16">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  if (isCheckingAuth && !authUser) {
    return (
      <div className="min-h-screen bg-base-200" data-theme={theme}>
        <Navbar />
        <LoadingScreen />
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200" data-theme={theme}>
      <Navbar />

      {/* Main content area with proper spacing for navbar and footer */}
      <main className="pt-16 pb-16 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Navigate to="/chat" /> : <LandingPage />}
          />

          {/* ✅ PROTECTED ROUTE */}
          <Route
            path="/chat"
            element={
              isCheckingAuth ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : authUser ? (
                <HomePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* ✅ REDIRECT IF LOGGED IN */}
          <Route
            path="/signup"
            element={
              isCheckingAuth ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : !authUser ? (
                <SignUpPage />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          <Route
            path="/login"
            element={
              isCheckingAuth ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : !authUser ? (
                <LoginPage />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />

          {/* ❗Allow open access to settings, or protect it if needed */}
          <Route path="/settings" element={<SettingsPage />} />

          <Route
            path="/profile"
            element={
              isCheckingAuth ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : authUser ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
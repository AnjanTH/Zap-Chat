import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Moon, Sun, User, Menu, X } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-base-100/95 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-md shadow-sm mb-10">
      <div className="container mx-auto px-4 sm:px-6 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all" onClick={closeMenu}>
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/15 transition-colors">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ZapChat
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg" to={authUser ? "/chat" : "/"}>
              Home
            </Link>
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-ghost hover:bg-base-200 rounded-lg"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="size-5 text-base-content/80" />
              ) : (
                <Sun className="size-5 text-base-content/80" />
              )}
            </button>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg">
                  <User className="size-5" />
                  <span>Profile</span>
                </Link>
                <button
                  className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg text-error"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden btn btn-sm btn-ghost hover:bg-base-200 rounded-lg"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-base-100 border-b border-base-300 shadow-lg md:hidden">
              <div className="flex flex-col p-4 space-y-3">
                <Link
                  to={"/"}
                  className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg w-full justify-start"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <button
                  onClick={() => { toggleTheme(); closeMenu(); }}
                  className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg w-full justify-start"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="size-5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="size-5" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>

                {authUser && (
                  <>
                    <Link
                      to={"/profile"}
                      className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg w-full justify-start"
                      onClick={closeMenu}
                    >
                      <User className="size-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 rounded-lg w-full justify-start text-error"
                      onClick={() => { logout(); closeMenu(); }}
                    >
                      <LogOut className="size-5" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;

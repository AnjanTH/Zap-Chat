import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full py-2 md:py-3 bg-base-100/95 backdrop-blur-md border-t border-base-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5 text-xs md:text-sm text-base-content/70">
          <div className="flex items-center gap-1 md:gap-1.5">
            Made with{" "}
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 animate-pulse" fill="currentColor" /> by{" "}
            <span className="font-medium text-primary hover:text-primary/80 transition-colors">
              Anjan
            </span>
          </div>
          <span className="hidden md:inline">•</span>
          <div>© {new Date().getFullYear()} All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100/50 mt-10">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon and 404 */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center animate-pulse">
                <MessageSquare className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>
          <h1 className="mt-8 text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-base-content/60">
            Oops! The page you're looking for seems to have vanished into thin air.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="btn btn-primary gap-2 hover:gap-3 transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Additional Links */}
        <div className="text-sm text-base-content/60">
          <p>
            Need help?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

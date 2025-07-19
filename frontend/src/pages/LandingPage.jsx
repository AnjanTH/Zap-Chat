import { Link } from "react-router-dom";
import { MessageSquare, Zap, Users, Shield, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [typedText, setTypedText] = useState("");
  const texts = ["Real-time Chat", "Online Messaging", "ZapChat"];
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < texts[textIndex].length) {
          setTypedText(prev => texts[textIndex].substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(prev => texts[textIndex].substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  const features = [
    {
      icon: <MessageSquare className="size-6" />,
      title: "Real-time Messaging",
      description: "Instant message delivery with real-time updates and notifications"
    },
    {
      icon: <Users className="size-6" />,
      title: "User Status",
      description: "See who's online and active in real-time"
    },
    {
      icon: <Shield className="size-6" />,
      title: "Secure Chat",
      description: "End-to-end encryption for your private conversations"
    },
    {
      icon: <Globe className="size-6" />,
      title: "Cross-Platform",
      description: "Access your chats from any device, anywhere"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-base-100 overflow-hidden pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                    <span className="block">Welcome to</span>
                    <span className="block text-primary mt-2">
                      <span className="inline-flex gap-2 items-center">
                        <Zap className="size-8 sm:size-12 animate-pulse" />
                        {typedText}
                        <span className="animate-pulse">|</span>
                      </span>
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-base-content/70 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Connect with friends, family, and colleagues in real-time. Experience seamless messaging with our modern chat platform.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                    <Link
                      to="/signup"
                      className="btn btn-primary btn-lg w-full sm:w-auto"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-ghost btn-lg w-full sm:w-auto mt-3 sm:mt-0"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Chat illustration */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:flex items-center justify-center">
          <img
            src="/chat-illustration.svg"
            alt="Chat Illustration"
            className="w-3/4 max-w-xl drop-shadow-lg animate-float"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-base-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Choose ZapChat?
            </h2>
            <p className="mt-4 text-base-content/70">
              Experience the best features designed for seamless communication
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-base-content/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

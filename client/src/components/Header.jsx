import React from "react";
import { assets } from "../assets/assets";

export const Header = () => {
  return (
    <div className="relative flex flex-col items-center text-center my-16 md:my-28 px-4 overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-green-100/40 to-emerald-100/30 blur-3xl rounded-full -z-10 animate-pulse"></div>
      <div className="absolute -top-20 right-20 w-[300px] h-[300px] bg-emerald-200/20 blur-3xl rounded-full -z-10 animate-float"></div>
      <div className="absolute bottom-10 left-20 w-[250px] h-[250px] bg-green-100/30 blur-3xl rounded-full -z-10 animate-float-reverse"></div>

      {/* Badge with hover animation */}
      <div
        className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full border 
        border-green-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 
        hover:border-green-300 group"
      >
        <p className="text-green-700 font-medium text-sm md:text-base">Help gardeners grow</p>
        <img 
          src={assets.starIcon} 
          alt="star" 
          className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" 
        />
      </div>

      {/* Main headline with gradient animation */}
      <div className="mt-12 space-y-2">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight 
          max-w-4xl mx-auto"
        >
          Turn{" "}
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 
          bg-clip-text text-transparent bg-300% animate-gradient">
            Images
          </span>{" "}
          into
        </h1>
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight 
          max-w-4xl mx-auto"
        >
          <span className="relative">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 
            bg-clip-text text-transparent bg-300% animate-gradient">
              Information
            </span>
            <span className="absolute -right-8 -top-2 text-3xl">🚀</span>
          </span>
        </h1>
      </div>

      {/* Subtitle with fade-in animation */}
      <p className="mt-10 text-lg sm:text-xl md:text-2xl text-stone-700/90 max-w-2xl mx-auto 
      leading-relaxed animate-fade-in">
        Cultivate your green thumb with AI-powered plant insights. Transform your space into a 
        lush sanctuary — just scan any plant and unlock expert care guidance instantly 🌿
      </p>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 left-10 w-20 h-20 bg-green-200/20 rounded-full blur-xl animate-bounce-slow"></div>
      <div className="absolute top-1/4 right-15 w-16 h-16 bg-emerald-300/20 rounded-full blur-xl animate-bounce-slow-delayed"></div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: floatReverse 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounceSlow 4s ease-in-out infinite;
        }
        .animate-bounce-slow-delayed {
          animation: bounceSlow 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
};

export default Header;
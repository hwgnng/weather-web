import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-white/20 border-t-white/80 rounded-full animate-spin shadow-lg"></div>

        {/* Inner ring */}
        <div className="absolute inset-3 border-[3px] border-blue-200/30 border-t-blue-200/80 rounded-full animate-spin-slow"></div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center max-w-xs sm:max-w-sm w-full">
        {/* Animated Spinning Circle */}
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600"></div>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Program<span className="text-blue-600">Fit</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Preparing your personalized career assessment...
        </p>
      </div>
    </div>
  );
}

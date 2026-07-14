import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7EBE1] text-[#0D1B2A] px-6 overflow-hidden">
      {/* Safe padding outer container to prevent the hard shadow from being clipped 
        on narrow mobile viewports, matching the structure used in the Home dashboard sections.
      */}
      <div className="p-2 w-full max-w-sm">
        <div className="text-center w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] p-8 md:p-10 shadow-[8px_8px_0px_0px_#1D3557] flex flex-col items-center">
          {/* Neo-brutalist Animated Spinner Wrapper */}
          <div className="relative mb-6">
            {/* Spinning background indicator ring */}
            <div className="absolute inset-0 rounded-xl border-4 border-dashed border-[#2F8CE5] animate-spin duration-1000" />

            {/* Rigid Icon Block with hard shadow matching home view imagery accents */}
            <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-[#2F8CE5] text-[#FFFFFF] font-bold text-2xl border-2 border-[#1D3557] shadow-[4px_4px_0px_0px_#1D3557]">
              PF
            </div>
          </div>

          {/* Title - Matches Home Title weight and branding structure */}
          <h1 className="text-3xl font-bold text-[#000000] tracking-tight">
            Program<span className="text-[#2F8CE5]">Fit</span>
          </h1>

          {/* Subtitle - Uses exact lead-relaxed color settings as the profile descriptions */}
          <p className="mt-4 text-base text-[#0D1B2A] leading-relaxed max-w-xs">
            Preparing your personalized career assessment...
          </p>

          {/* Neo-brutalist styled loading dots matching button action states */}
          <div className="flex items-center gap-2 mt-8">
            <span className="h-3 w-3 rounded-full bg-[#1D3557] border border-[#1D3557] animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-3 w-3 rounded-full bg-[#2F8CE5] border border-[#1D3557] animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-3 w-3 rounded-full bg-[#1D3557] border border-[#1D3557] animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { signInWithGoogle } from "../firebase/auth";

export default function GoogleSignIn() {
  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      {/* Auth Card */}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-slate-100 transition-all">
        {/* Branding & Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white font-bold text-2xl shadow-lg shadow-blue-600/30 mb-4">
            PF
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Program<span className="text-blue-600">Fit</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Discover your ideal path. Let's get your assessment started.
          </p>
        </div>

        {/* Action Section */}
        <div className="mt-8 space-y-4">
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center items-center gap-3 px-4 py-3 border border-slate-200 text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
          >
            {/* Custom Google SVG Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.357 2.673 1.414 6.573l3.852 3.192Z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.275c0-.796-.073-1.564-.205-2.305H12v4.355h6.441a5.504 5.504 0 0 1-2.386 3.614l3.714 2.877c2.173-2.005 3.427-4.955 3.427-8.541Z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235 1.414 17.43A11.947 11.947 0 0 0 12 24c3.045 0 5.823-1.014 7.95-2.755l-3.714-2.877a7.116 7.116 0 0 1-4.236 1.186c-2.918 0-5.423-1.991-6.305-4.664l-.014-.005-.415.35Z"
              />
              <path
                fill="#34A853"
                d="M1.414 6.573A11.946 11.946 0 0 0 0 12c0 1.94.464 3.777 1.286 5.405l4.002-3.11a7.124 7.124 0 0 1-.022-4.53l-3.852-3.192Z"
              />
            </svg>
            <span className="font-semibold text-slate-800">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Secure authentication powered by Firebase.
          </p>
        </div>
      </div>
    </div>
  );
}

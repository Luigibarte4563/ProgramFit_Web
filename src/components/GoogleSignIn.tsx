import React, { useMemo } from "react";
import { signInWithGoogle } from "../firebase/auth";

// Modern SVG Warning Icon Component
function AlertTriangleIcon() {
  return (
    <svg
      className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  );
}

export default function GoogleSignIn() {
  const isInAppBrowser = useMemo(() => {
    const ua = navigator.userAgent || "";

    return (
      ua.includes("FBAN") ||
      ua.includes("FBAV") ||
      ua.includes("Messenger") ||
      ua.includes("Instagram") ||
      ua.includes("Line") ||
      ua.includes("TikTok")
    );
  }, []);

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7EBE1] px-4 sm:px-6 lg:px-8">
      {/* Container features:
        - Background: Pure White (#FFFFFF)
        - Border: Custom Muted Gray (#C5C5C5)
        - Hard Shadow: Custom Dark Blue/Grey (#1D3557) with a structural style 
      */}
      <div className="max-w-md w-full space-y-8 p-8 bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] shadow-[8px_8px_0px_0px_#1D3557] transition-all">
        {/* Branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#2F8CE5] text-[#FFFFFF] font-bold text-2xl shadow-[4px_4px_0px_0px_#1D3557] mb-4">
            PF
          </div>

          <h2 className="text-3xl font-bold text-[#000000] tracking-tight">
            Program<span className="text-[#2F8CE5]">Fit</span>
          </h2>

          <p className="mt-2 text-sm text-[#0D1B2A]">
            Discover your ideal path. Let's get your assessment started.
          </p>
        </div>

        {/* Messenger/Facebook/Instagram Browser Warning */}
        {isInAppBrowser ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
            <div className="flex items-start gap-3.5">
              <AlertTriangleIcon />

              <div>
                <h3 className="font-semibold text-amber-900">
                  Google Sign-In isn't supported in this browser.
                </h3>

                <p className="mt-2 text-sm text-amber-800 leading-relaxed">
                  It looks like you're using the built-in browser from
                  Messenger, Facebook, or another app.
                </p>

                <p className="mt-3 text-sm text-amber-800">To continue:</p>

                <ol className="mt-2 ml-5 list-decimal text-sm text-amber-800 space-y-1">
                  <li>
                    Tap the <strong>⋮</strong> (three-dot) menu or the{" "}
                    <strong>Share</strong> button.
                  </li>
                  <li>
                    Select <strong>Open in Browser</strong>.
                  </li>
                  <li>
                    Open the page in <strong>Chrome</strong>,{" "}
                    <strong>Safari</strong>, or your default browser.
                  </li>
                  <li>Try signing in again.</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center items-center gap-3 px-4 py-3 border border-[#C5C5C5] text-sm font-semibold rounded-xl text-[#0D1B2A] bg-[#FFFFFF] hover:bg-[#F7EBE1] hover:border-[#2F8CE5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F8CE5] transition-all duration-200 shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557]"
            >
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

              <span>Continue with Google</span>
            </button>
          </div>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-[#C5C5C5]">
            Secure authentication powered by Firebase.
          </p>
        </div>
      </div>
    </div>
  );
}

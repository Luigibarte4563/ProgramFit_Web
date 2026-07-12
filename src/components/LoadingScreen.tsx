export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated Spinning Circle */}
        <div className="flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">ProgramFit</h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-500">
          Preparing your personalized career assessment...
        </p>
      </div>
    </div>
  );
}

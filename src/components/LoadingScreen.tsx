
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">加载中...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;

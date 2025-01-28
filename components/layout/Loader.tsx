import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-solid dark:border-teal-400 border-t-4 border-gray-900 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;

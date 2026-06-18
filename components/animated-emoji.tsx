"use client";
import Image from "next/image";
import { useState } from "react";

const AnimatedEmoji = () => {
  const [emoji] = useState<string>("👋");

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <div className="text-8xl animate-bounce">{emoji}</div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Hello there!
      </p>
    </div>
  );
};

export default AnimatedEmoji;

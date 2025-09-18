"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
const roomId = useRef(null);
  const router = useRouter();

  return (
    
    <div className="flex justify-center mt-5 gap-1">
      <input
        type="text"
        placeholder="Enter name"
        className="px-2 border-2"
        ref={roomId}
      />
      <button
        className="bg-red-500 px-1"
        type="submit"
        onClick={() => {
          const id = roomId.current?.value;
          if (id) {
            router.push(`/room/${id}`);
          }
        }}
      >
        Join
      </button>
    </div>
  );
}

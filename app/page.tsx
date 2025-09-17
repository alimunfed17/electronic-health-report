"use client";

import { useUser } from "../context/UserContext";

export default function Home() {
  const { username } = useUser();

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Hey 👋, {username ? username : "Guest"}!
      </h1>
    </div>
  );
}

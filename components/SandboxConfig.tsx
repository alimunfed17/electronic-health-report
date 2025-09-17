"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";

interface SandboxConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SandboxConfig({ isOpen, onClose }: SandboxConfigProps) {
  const [baseUrl, setBaseUrl] = useState("https://stage.ema-api.com/ema-dev/firm");
  const [firmPrefix, setFirmPrefix] = useState("entpmsandbox393");
  const [apiKey, setApiKey] = useState("");
  const [usernameInput, setUsernameInput] = useState("fhir_pmOYS");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const { setUsername } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseUrl, firmPrefix, apiKey, username: usernameInput, password }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ Logged in, tokens stored in cookies.");
      setUsername(usernameInput); 
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3"
        >
          <h2 className="text-xl font-bold">Login</h2>

          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Base URL"
            className="border p-2 rounded"
          />

          <input
            type="text"
            value={firmPrefix}
            onChange={(e) => setFirmPrefix(e.target.value)}
            placeholder="Firm Prefix"
            className="border p-2 rounded"
          />

          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API Key"
            className="border p-2 rounded"
          />

          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Username"
            className="border p-2 rounded"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

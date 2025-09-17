"use client";

import { FC, useState } from "react";
import SandboxConfig from "./SandboxConfig";

const Header: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-white p-4 border-b border-gray-300">
        <h1 className="text-xl font-semibold text-gray-800">
          Electronic Health Records
        </h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
        >
          Sandbox Config
        </button>
      </header>

      <SandboxConfig
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
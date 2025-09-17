"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import {
  Users,
  Calendar,
  Stethoscope,
  CreditCard,
  LogOut,
  Home
} from "lucide-react";
import Image from "next/image";
import logoImage from "../public/vercel.svg";
import { useUser } from '../context/UserContext';

type Item = {
  icon: React.ReactNode;
  title: string;
  path: string;
};

const Sidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUsername } = useUser();

  const items: Item[] = [
    { icon: <Home size={18} />, title: "Home", path: "/" },
    { icon: <Users size={18} />, title: "Patients", path: "/patients" },
    { icon: <Calendar size={18} />, title: "Appointments", path: "/appointments" },
    { icon: <Stethoscope size={18} />, title: "Clinical", path: "/clinical" },
    { icon: <CreditCard size={18} />, title: "Billing", path: "/billing" },
  ];

  const handleLogout = () => {
    setUsername(null);
    router.push("/"); 
  };

  return (
    <aside className="h-screen w-64 flex flex-col bg-white">
      <div className="my-6 mx-6">
        <Image src={logoImage} alt="Logo" className="h-10 w-auto" />
      </div>

      <div className="flex-1 flex flex-col justify-between border-r border-gray-300">
        <nav className="flex flex-col gap-2 mx-4 mt-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.path
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="my-6 mx-6 text-gray-600 text-sm hover:text-red-500 cursor-pointer">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
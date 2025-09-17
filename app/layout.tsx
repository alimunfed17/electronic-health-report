import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Common/Sidebar";
import Header from "../components/Common/Header";
import { UserProvider } from "../context/UserContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electronic Health Records",
  description: "Electronic Health Records App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex ${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col bg-gray-100">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebarOptions = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Gaming",
      link: "/dashboard/gaming",
    },
    {
      name: "Anime",
      link: "/dashboard/anime",
    },
  ];
  return (
    <div className="flex">
      <div className="bg-[#000814] p-8 md:w-[20vw] w-0 rounded-r-2xl h-screen text-white">
        <div className="w-full flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">GuiltTrip</h1>
          <Settings2
            className="w-6 h-6 text-white"
            onClick={() => localStorage.clear()}
          />
        </div>
        {sidebarOptions.map((option, idx) => (
          <div className="flex flex-col gap-4" key={idx}>
            <Link
              href={option.link}
              key={option.name}
              className="bg-neutral-700 p-2 rounded-lg hover:bg-neutral-800 transition-colors my-2"
            >
              {option.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;

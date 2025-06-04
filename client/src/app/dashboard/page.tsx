import React from "react";
import { Gamepad, Frown } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="bg-neutral-950 w-full h-screen text-white flex items-center justify-center p-10">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6 text-6xl text-[#ffd60a]">
          <Frown />
        </div>
        <h1 className="text-3xl font-bold mb-2">No Data Yet</h1>
        <p className="text-lg text-gray-300 mb-6">
          You haven’t connected your gaming or anime accounts yet. Once you do,
          we’ll show you just how much of your life you've *dedicated* to fun.
        </p>
        <button className="bg-[#ffd60a] text-[#001d3d] font-semibold py-2 px-6 rounded-xl hover:bg-yellow-400 transition duration-200">
          Connect Accounts
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

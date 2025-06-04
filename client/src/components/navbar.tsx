import React from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
    return (
        <div className="max-w-6xl mx-auto p-10 z-10 sticky top-0 left-0 flex justify-between items-center">
            <h1 className="text-2xl text-white">GuiltTrip</h1>
            <Button>Sign Up</Button>
        </div>
    );
};

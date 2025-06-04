"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Home() {
    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen bg-[#000814] relative text-white flex items-center justify-center overflow-hidden">
                {/* <div className="w-full h-screen absolute z-0 rounded-xl "> */}
                {/*     <motion.img */}
                {/*         initial={{ opacity: 0 }} */}
                {/*         animate={{ opacity: 1 }} */}
                {/*         transition={{ duration: 0.3 }} */}
                {/*         src="/glass-hero-bg.jpeg" */}
                {/*         alt="hero" */}
                {/*         className="w-full h-screen object-cover  blur-[10px]" */}
                {/*     /> */}
                {/* </div> */}
                <div className="max-w-6xl w-full mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl text-white tracking-tighter">
                            We&apos;ll Show You <strong className="text-[#ffd60a]">The Time</strong> You Can{" "}
                            <strong className="text-[#ffd60a]">Never</strong> Get Back.
                        </h1>
                        {/* <p className="mt-6 text-xl text-gray-400"> */}
                        {/*     View the time you've spent playing games and watching anime. */}
                        {/* </p> */}
                        <Link href="/dashboard">
                            <Button className="mt-8">
                                Give Me the Harsh Truth
                                <IconArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

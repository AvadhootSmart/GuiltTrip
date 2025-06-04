"use client";
import { getSteamDataByURL } from "@/api/steam_data/steamData.service";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSteamDataStore } from "@/store/steamData.store";
import { GAME_DATA } from "@/types/steamData.types";
import { Activity, Play, Tv } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const page = () => {
  const {
    steamData: data,
    setSteamData: setData,
    isSteamConnected,
    setIsSteamConnected,
  } = useSteamDataStore();
  const [steamUrl, setSteamUrl] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSteamConnected(true);
    setSteamUrl("");
    try {
      const response = await getSteamDataByURL(steamUrl);
      setData(response);
    } catch (error) {
      alert(error);
      setData(null);
      setIsSteamConnected(false);
    }
  };

  const calculateTotalPlaytime = (games: GAME_DATA[]) => {
    return games.reduce((acc, game) => acc + game.playtime_forever, 0);
  };

  const mostPlayedGame = data?.games.reduce((acc, game) => {
    if (game.playtime_forever > acc.playtime_forever) {
      return game;
    }
    return acc;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };
  return (
    <div className="min-h-screen text-white bg-neutral-950">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-950 shadow-sm p-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Gaming Dashboard
          </h1>
          <p className="text-gray-400">
            View the time you've spent playing games on Steam
          </p>
        </div>
      </motion.div>

      {data && isSteamConnected && (
        <>
          <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Dashboard Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Games Owned
                    </p>
                    <NumberTicker
                      value={data?.game_count}
                      className="whitespace-pre-wrap text-3xl font-bold tracking-tighter text-black"
                    />{" "}
                    <span>Games</span>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Tv className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Playtime
                    </p>
                    <NumberTicker
                      value={calculateTotalPlaytime(data?.games) / 60}
                      className="whitespace-pre-wrap text-3xl font-bold tracking-tighter text-black"
                    />
                    <motion.span
                      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 2 }}
                      className="ml-2 text-black"
                    >
                      hrs
                    </motion.span>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Most played game
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {mostPlayedGame?.name}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Activity className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {(mostPlayedGame?.playtime_forever! / 60).toFixed(1)} hours
                    total
                  </span>
                </div>
              </motion.div>
            </motion.div>
            <h1>Your Gaming Collection</h1>
            <div className="grid grid-cols-3 gap-4">
              {data?.games.map((game: GAME_DATA, idx: number) => (
                <div key={idx}>
                  <img
                    src={game.game_header_img}
                    alt="game_header"
                    className="rounded-t-xl"
                  />
                  <h2 className="text-xl font-bold">{game.name}</h2>
                  <p>
                    Hours played: {(game.playtime_forever / 60).toFixed(2)}{" "}
                    hours
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {!isSteamConnected && (
        <div className="h-[90vh] flex justify-center items-center px-4">
          <div className="w-full max-w-md bg-[#1A1A1A] border border-purple-500/30 shadow-lg rounded-2xl p-8">
            <div className="mb-6 text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                Connect Your Steam Account
              </h2>
              <p className="text-sm text-gray-400">
                Paste your Steam profile link to unlock your full gaming stats.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="https://steamcommunity.com/profile/123456789"
                value={steamUrl || ""}
                onChange={(e) => setSteamUrl(e.target.value)}
                className="bg-[#2A2A2A] border border-[#3A3A3A] focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 transition-all duration-200 rounded-md"
              >
                Connect Steam
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

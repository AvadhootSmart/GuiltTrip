"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, TrendingUp, X, Activity, Play, Tv } from "lucide-react";
import { ANIME_DATA } from "@/types/animeData.types";
import { searchAnimeByName } from "@/api/anime/anime.service";
import { toast } from "sonner";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useAnimeStore } from "@/store/anime.store";

const page = () => {
  const {
    animeList,
    removeAnime: removeFromList,
    addAnime: addToList,
  } = useAnimeStore();

  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ANIME_DATA[]>([]);
  // const [animeList, setAnimeList] = React.useState<ANIME_DATA[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const dashboardStats = {
    totalAnime: animeList.length,
    totalEpisodes: animeList.reduce(
      (acc, anime) => acc + (anime.episodes || 0),
      0,
    ),
    watchTime: Math.floor(
      animeList.reduce((acc, anime) => acc + (anime.episodes || 0) * 24, 0) /
        60,
    ),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await searchAnimeByName(query);
      setSearchResults(response);
    } catch (error) {
      // console.error("Error in fetching data from jikan", error);
      setSearchResults([]);
      toast.error("Error searching for anime");
    } finally {
      setIsSearching(false);
    }
  };

  // const addToList = (anime: ANIME_DATA) => {
  //   if (!animeList.find((item) => item.mal_id === anime.mal_id)) {
  //     setAnimeList([...animeList, anime]);
  //   }
  // };

  // const removeFromList = (animeId: number) => {
  //   setAnimeList(animeList.filter((anime) => anime.mal_id !== animeId));
  // };

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
    <div className="min-h-screen bg-neutral-950">
      {/* Dashboard Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-950 shadow-sm p-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Anime Dashboard
          </h1>
          <p className="text-gray-400">Track your anime collection</p>
        </div>
      </motion.div>

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
                  Total Anime
                </p>

                <NumberTicker
                  value={dashboardStats.totalAnime}
                  className="whitespace-pre-wrap text-3xl font-bold tracking-tighter text-black"
                />
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
                  Total Episodes
                </p>
                <NumberTicker
                  value={dashboardStats.totalEpisodes}
                  className="whitespace-pre-wrap text-3xl font-bold tracking-tighter text-black"
                />
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
                  Total Hours watched
                </p>
                <NumberTicker
                  value={dashboardStats.watchTime}
                  className="whitespace-pre-wrap text-3xl font-bold tracking-tighter text-black"
                />
                <span className="ml-2">hrs</span>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Search Anime
          </h2>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for anime..."
                value={query || ""}
                onChange={(e) => setQuery(e.target.value)}
                // onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="h-4 w-4" />
                </motion.div>
              ) : (
                "Search"
              )}
            </Button>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Search Results
                </h3>
                <button onClick={() => setSearchResults([])}>
                  <h4>Clear Results</h4>
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex gap-4">
                        <img
                          src={
                            result.images?.jpg?.image_url ||
                            "/api/placeholder/80/120"
                          }
                          alt={result.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {result.title_english}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {result.episodes} episodes
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {result.status}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => addToList(result)}
                        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Collection
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* My Collection */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Collection
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {animeList.length} anime
            </span>
          </div>

          {animeList.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Tv className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No anime in your collection yet</p>
              <p className="text-sm mt-1">
                Search and add some anime to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {animeList.map((anime, idx) => (
                  <AnimeListCard
                    key={idx}
                    anime={anime}
                    removeFromList={removeFromList}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default page;

interface AnimeListCardProps {
  anime: ANIME_DATA;
  removeFromList: (animeId: number) => void;
}
const AnimeListCard = ({ anime, removeFromList }: AnimeListCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
    >
      <div className="flex gap-4">
        <img
          src={anime.images?.jpg?.image_url || "/api/placeholder/80/120"}
          alt={anime.title}
          className="w-16 h-24 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white truncate">
            {anime.title_english}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {anime.episodes} episodes
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {anime.status}
          </p>
        </div>
        <Button
          onClick={() => removeFromList(anime.mal_id)}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

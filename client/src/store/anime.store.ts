import { ANIME_DATA } from "@/types/animeData.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnimeStore {
  animeList: ANIME_DATA[];
  addAnime: (anime: ANIME_DATA) => void;
  removeAnime: (id: number) => void;
}

export const useAnimeStore = create<AnimeStore>()(
  persist(
    (set, get) => ({
      animeList: [],
      addAnime: (anime) =>
        set((state) => ({
          animeList: state.animeList.some((a) => a.mal_id === anime.mal_id)
            ? state.animeList
            : [...state.animeList, anime],
        })),
      removeAnime: (id) =>
        set((state) => ({
          animeList: state.animeList.filter((anime) => anime.mal_id !== id),
        })),
    }),
    {
      name: "anime-storage",
    },
  ),
);

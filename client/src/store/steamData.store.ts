import { STEAM_DATA } from "@/types/steamData.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SteamDataStore {
  steamData: STEAM_DATA | null;
  setSteamData: (data: STEAM_DATA | null) => void;
  isSteamConnected: boolean;
  setIsSteamConnected: (data: boolean) => void;
}

export const useSteamDataStore = create<SteamDataStore>()(
  persist(
    (set, get) => ({
      steamData: null,
      isSteamConnected: false,
      setSteamData: (data) => set({ steamData: data }),
      setIsSteamConnected: (data) => set({ isSteamConnected: data }),
    }),
    {
      name: "steam-data",
    },
  ),
);

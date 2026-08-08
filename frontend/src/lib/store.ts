import { create } from "zustand";

interface MatchStore {
  results: any[];
  setResults: (results: any[]) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  results: [],
  setResults: (results) => set({ results }),
}));

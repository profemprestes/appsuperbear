import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvatarConfig } from '../lib/avatarOptions';

export interface GameState {
  playerName: string;
  coins: number;
  minigamesCompleted: string[];
  avatarConfig: AvatarConfig | null;
  setPlayerName: (name: string) => void;
  addCoins: (amount: number) => void;
  completeMinigame: (minigameId: string) => void;
  setAvatarConfig: (config: AvatarConfig) => void;
  resetGame: () => void;
}

export const useGameState = create<GameState>()(
  persist(
    (set) => ({
      playerName: '',
      coins: 0,
      minigamesCompleted: [],
      avatarConfig: null,
      setPlayerName: (name) => set({ playerName: name }),
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      completeMinigame: (minigameId) =>
        set((state) => ({
          minigamesCompleted: [...new Set([...state.minigamesCompleted, minigameId])],
        })),
      setAvatarConfig: (config) => set({ avatarConfig: config }),
      resetGame: () =>
        set({
          playerName: '',
          coins: 0,
          minigamesCompleted: [],
          avatarConfig: null,
        }),
    }),
    {
      name: 'gran-facu-game-storage',
      // We can create a safe storage for SSR if needed here, but standard local storage is fine for CSR
    }
  )
);

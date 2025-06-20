import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface GuardDetails {
  id: string;
  description: string;
  numberOfPersons: number;
  shiftType: string;
  daysPerMonth: number;
  chargesPerMonth: number;
  overtimeRate: number;
  allowance: number;
}

interface GuardStore {
  guards: GuardDetails[];
  editingGuard: GuardDetails | null;
  addGuard: (guard: GuardDetails) => void;
  updateGuard: (guard: GuardDetails) => void;
  deleteGuard: (id: string) => void;
  setEditingGuard: (guard: GuardDetails | null) => void;
  resetStore: () => void;
}

export const useGuardsStore = create<GuardStore>()(
  persist(
    (set) => ({
      guards: [],
      editingGuard: null,
      addGuard: (guard) =>
        set((state) => ({ guards: [...state.guards, guard] })),
      updateGuard: (updated) =>
        set((state) => ({
          guards: state.guards.map((g) =>
            g.id === updated.id ? updated : g
          ),
          editingGuard: null,
        })),
      deleteGuard: (id) =>
        set((state) => ({
          guards: state.guards.filter((g) => g.id !== id),
        })),
      setEditingGuard: (guard) => set({ editingGuard: guard }),
      resetStore: () => set({ guards: [], editingGuard: null }),
    }),
    {
      name: "guards-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

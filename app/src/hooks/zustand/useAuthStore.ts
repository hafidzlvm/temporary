import { AuthVerifyData } from "@/models/Auth";
import { create } from "zustand";

type State = {
  isAuthenticated: boolean;
  data: AuthVerifyData | null;
};

type Action = {
  authenticate: (data: AuthVerifyData) => void;
  discredit: () => void;
};

export const useAuthStore = create<State & Action>()((set) => ({
  isAuthenticated: false,
  data: null,
  authenticate: (data: AuthVerifyData) => set({ isAuthenticated: true, data }),
  discredit: () => set({ isAuthenticated: false, data: null }),
}));

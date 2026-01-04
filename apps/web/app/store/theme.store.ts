import { create } from "zustand";

export type themeProps = {
  activeTheme: "light" | "dark" | "golden" | "silver";
  setActiveTheme: (theme: themeProps["activeTheme"]) => void;
};
export const useTheme = create<themeProps>((set) => ({
  activeTheme: "light",
  setActiveTheme: (theme) => set({ activeTheme: theme }),
}));

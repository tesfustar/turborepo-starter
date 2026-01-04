"use client";

import { useQueryData } from "@/app/store/query-data.store";
import { themeProps, useTheme } from "@/app/store/theme.store";
import { useEffect } from "react";
// import VConsole from "vconsole";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setActiveTheme } = useTheme();
  const { setUtilityData } = useQueryData();

  // const vConsoleRef = useRef<VConsole | null>(null);

  useEffect(() => {
    //eslint-disable-next-line
    const utility = (window as any)?.cbebanksuperapp?.getUtility();

    if (utility?.utility) {
      setUtilityData(utility);

      if (utility?.active_theme) {
        setActiveTheme(utility?.active_theme);
      }
    }

    // vConsoleRef.current = new VConsole();
    // new VConsole();

    // return () => {
    //   vConsoleRef.current?.destroy();
    //   vConsoleRef.current = null;
    // };
  }, [setActiveTheme, setUtilityData]);

  useEffect(() => {
    //eslint-disable-next-line
    const app = (window as any)?.cbebanksuperapp;

    if (!app?.onThemeChange) return;

    const unsubscribe = app?.onThemeChange(
      (theme: themeProps["activeTheme"]) => {
        if (theme) {
          setActiveTheme(theme);
        }
      }
    );

    return () => {
      unsubscribe?.();
    };
  }, [setActiveTheme]);

  return <div>{children}</div>;
};

export default Layout;

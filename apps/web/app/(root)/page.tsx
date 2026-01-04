"use client";

import Splash from "@/app/components/Splash";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

//addes tsup to UI
const UtilityForm = dynamic(() => import("@/app/features/utility-form"), {
  ssr: false,
});

export default function Home() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setSplash(false), 400);
    return () => clearTimeout(timeout);
  }, []);

  return <>{splash ? <Splash /> : <UtilityForm />}</>;
}

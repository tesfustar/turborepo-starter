"use client";

import dynamic from "next/dynamic";

const BillDetail = dynamic(() => import("@/app/features/bill-detail"), {
  ssr: false,
});

export default function Page() {
  return <BillDetail />;
}

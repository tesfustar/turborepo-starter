"use client";

import { useQueryData } from "@/app/store/query-data.store";
import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import Image from "next/image";
import Text from "./ui/Text";
import { formatMoney } from "@/app/lib/utils/formatters";

const ETBIcon = {
  light: { icon: "/icons/primary.png" },
  dark: { icon: "/icons/primary.png" },
  silver: { icon: "/icons/silver.png" },
  golden: { icon: "/icons/golden.png" },
};
const BillAmount = ({ total_amount }: { total_amount: string }) => {
  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  const { utilityData } = useQueryData((state) => state);
  return (
    <div className="flex items-center gap-4 py-3">
      <Image
        src={ETBIcon[activeTheme].icon}
        alt={utilityData?.utility?.name}
        width={120}
        height={120}
        className="object-contain  w-20 h-20"
        priority
      />

      <div>
        <Text>{utilityData?.utility?.name} Bill Amount</Text>

        <Text
          className="text-4xl font-bold"
          style={{ color: theme.text.themedText }}
        >
          {total_amount ? formatMoney(total_amount, { currency: "ETB" }) : null}
        </Text>
      </div>
    </div>
  );
};

export default BillAmount;

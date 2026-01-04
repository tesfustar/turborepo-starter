"use client";

import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";

interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  const [firstName = "", fatherName = ""] = name.trim().split(" ");

  const initials = `${firstName.charAt(0)}${fatherName.charAt(
    0
  )}`.toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-full">
      <div
        className={`w-20 h-20 flex items-center justify-center rounded-full  font-bold text-2xl`}
        style={{ color: theme.text.primaryText }}
      >
        {initials}
      </div>
    </div>
  );
};

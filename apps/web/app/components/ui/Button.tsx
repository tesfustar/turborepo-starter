"use client";

import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import { Loader2 } from "lucide-react";
import React from "react";

type ButtonProps = {
  as?: "button" | "span";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.HTMLAttributes<HTMLSpanElement>;

const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full text-white text-center font-semibold py-4 rounded-full mb-0"
      style={{
        background: `linear-gradient(180deg, ${theme.gradient.primary})`,
      }}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin mx-auto" /> : children}
    </button>
  );
};

export default Button;

"use client";

import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import React from "react";

type TextProps = {
  as?: "button" | "span";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLParagraphElement>;
} & React.TextareaHTMLAttributes<HTMLParagraphElement> &
  React.HTMLAttributes<HTMLSpanElement>;

const Text = ({ children, ...props }: TextProps) => {
  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  return (
    <p
      style={{
        color: theme.text.primaryText,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;

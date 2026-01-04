import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import { useField } from "formik";
import React from "react";

type Pattern = "alphabet" | "alphabetNumeric" | "number" | "password" | "email";

// Regex definitions
const regexPatterns: Record<Pattern, RegExp> = {
  alphabet: /^[A-Za-z ]+$/,
  alphabetNumeric: /^[A-Za-z0-9 ]+$/,
  number: /^[0-9.]+$/,
  password: /^.*$/,
  email: /^[A-Za-z0-9@.]+$/,
};

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  pattern?: Pattern;
  label?: string;
  id?: string;
  maxLength?: number;
  min?: number;
  as?: string;
  rows?: number;
  hasError?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  pattern,
  label,
  hasError,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (value.startsWith(" ")) return;
    if (value.includes("  ")) return;
    if (value.endsWith(" ")) {
    }

    if (pattern) {
      const regex = regexPatterns[pattern];
      if (value === "" || regex.test(value)) {
        helpers.setValue(value);
      }
    } else {
      helpers.setValue(value);
    }
  };

  return (
    <div className="">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...field}
        {...props}
        value={field.value || ""}
        onChange={handleChange}
        className={`
    ${props.className ?? ""}
       outline-none
       focus:ring-0
       focus:border-inherit
       border-2
      `}
        style={{
          color: theme.text.primaryText,
          borderColor: hasError ? theme.state.error : theme.border.quaternary,
        }}
      />
    </div>
  );
};

export default TextInput;

"use client";
import { createContext, useState, ReactNode } from "react";

// Define the shape of your context
interface ThemeContextType {
  theme: string;
  switchDark: () => void;
  switchLight: () => void;
}

// Create the context with the correct default value type
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const switchLight = () => {
    setTheme("light");
  };

  const switchDark = () => {
    setTheme("dark");
  };

  const className = `${theme === "dark" ? "darkMode" : "lightMode"} anim`;

  return (
    <ThemeContext.Provider value={{ theme, switchDark, switchLight }}>
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

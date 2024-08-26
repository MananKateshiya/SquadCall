"use client";
import React, { createContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {


  const [theme, setTheme] = useState<string>(() => {

    const currentTheme = localStorage.getItem('currentTheme');
    if (!currentTheme) {
      const defaultTheme = 'bg-lime-1';
      localStorage.setItem('currentTheme', defaultTheme);
      return defaultTheme;
    } else {
      return currentTheme;
    }
  });


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

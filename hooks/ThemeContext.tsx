"use client";
import React, { createContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const [theme, setTheme] = useState<string>('bg-lime-1');

  useEffect(() => {
    const currentTheme = localStorage.getItem('currentTheme');
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      localStorage.setItem('currentTheme', 'bg-lime-1');
    }
  }, []);


   return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

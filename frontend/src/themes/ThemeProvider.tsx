import React, { FC, ReactNode, useState } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { themeCreator } from "./base";

interface ThemeProps {
  children?: ReactNode;
}
export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: FC<ThemeProps> = ({ children }) => {
  const curThemeName = localStorage.getItem("appTheme") || "NebulaFighterTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;

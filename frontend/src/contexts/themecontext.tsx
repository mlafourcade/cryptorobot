import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

import { DarkTheme, LightTheme } from "../themes";

interface ThemeProps {
  children?: ReactNode;
}

interface IThemeContextColor {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextColor);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: FC<ThemeProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;
    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box>{children}</Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

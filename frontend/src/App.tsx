import React from "react";
import "./index.css";
import { BodyArea } from "./components/body";
import { AppThemeProvider } from "./contexts";
import { Canvas } from "./components/canvasjschart";

function App() {
  return (
    <AppThemeProvider>
      <BodyArea>Body</BodyArea>
    </AppThemeProvider>
  );
}

export default App;

/*

</AppThemeProvider>*/

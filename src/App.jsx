import React from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { useIsMobile } from "./hooks/useIsMobile";
import { MobileLayout } from "./components/MobileLayout";
import { DesktopContent } from "./components/DesktopContent";

/* アプリケーションのルートコンポーネント */
const App = () => {
  // モバイルデバイスかどうかを判定
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      {isMobile ? <MobileLayout /> : <DesktopContent />}
    </ThemeProvider>
  );
};

export default App;

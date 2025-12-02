import React, { createContext, useContext } from "react";

export const OSContext = createContext(undefined);

/**
 * OSコンテキストを使用するカスタムフック
 */
export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    // Fallback for components rendered outside provider (shouldn't happen in normal flow)
    return {
      openWindow: () => console.warn("OSContext not found"),
      closeWindow: () => {},
      minimizeWindow: () => {},
      activeWindowId: null,
    };
  }
  return context;
};

import React, { useMemo } from "react";
import { APPS } from "../config/apps";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { OSContext } from "./OSContext";
import { useTheme } from "./ThemeContext";
import { useWindowManager } from "../hooks/useWindowManager";

/* デスクトップビューのメインコンポーネン */
export const DesktopContent = () => {
  // テーマ情報を取得
  const { theme } = useTheme();

  // ウィンドウ管理フックから状態と関数を取得
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    handleTaskbarClick,
    handleSystemRestart,
  } = useWindowManager();

  return (
    <OSContext.Provider
      value={{ openWindow, closeWindow, minimizeWindow, activeWindowId }}
    >
      {/* メインデスクトップコンテナ */}
      <div
        className={`h-screen w-screen overflow-hidden relative selection:bg-pink-500/30 transition-[background] duration-500 ${
          theme === "dark"
            ? "bg-linear-to-bl from-indigo-400 via-purple-900 to-slate-900"
            : "bg-linear-to-bl from-blue-200 via-cyan-100 to-white"
        }`}
      >
        {/* デスクトップアイコンのグリッド */}
        <div className="relative z-0 p-6 grid grid-cols-1 gap-6 w-fit h-[calc(100vh-80px)] content-start flex-wrap">
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              title={app.title}
              icon={app.icon}
              onClick={() => openWindow(app.id)}
            />
          ))}
        </div>

        {/* ウィンドウレイヤー */}
        {windows.map((win) => {
          const app = APPS.find((a) => a.id === win.id);
          if (!app) return null;

          return (
            <Window
              key={win.id}
              windowState={win}
              isActive={activeWindowId === win.id}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {app.component}
            </Window>
          );
        })}

        {/* タスクバー */}
        <Taskbar
          windows={windows}
          activeWindowId={activeWindowId}
          onWindowClick={handleTaskbarClick}
          onRestart={handleSystemRestart}
        />
      </div>
    </OSContext.Provider>
  );
};

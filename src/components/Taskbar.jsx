import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";
import { APPS } from "../config/apps";
import { useOS } from "./OSContext";
import { Box, Power, Search, X } from "lucide-react";

/* タスクバーコンポーネント */
export const Taskbar = ({
  windows,
  activeWindowId,
  onWindowClick,
  onRestart,
}) => {
  const { openWindow } = useOS();
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [isRestarting, setIsRestarting] = useState(false);

  const menuRef = useRef(null);
  const startButtonRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 時刻表示
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        startButtonRef.current &&
        !startButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto focus search on open
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset search when closed
      setTimeout(() => setSearchQuery(""), 300);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // メニューの位置再計算 - リサイズ
  useEffect(() => {
    const updatePosition = () => {
      if (startButtonRef.current) {
        const rect = startButtonRef.current.getBoundingClientRect();
        setMenuLeft(rect.left);
      }
    };

    window.addEventListener("resize", updatePosition);
    // Initial calc
    updatePosition();

    return () => window.removeEventListener("resize", updatePosition);
  }, [windows.length, isMenuOpen]);

  // メニュー表示
  const handleToggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      if (startButtonRef.current) {
        const rect = startButtonRef.current.getBoundingClientRect();
        setMenuLeft(rect.left);
      }
      setIsMenuOpen(true);
    }
  };

  // 再起動
  const handleRestart = () => {
    setIsMenuOpen(false);
    setIsRestarting(true);

    setTimeout(() => {
      onRestart();
      setIsRestarting(false);
    }, 1500);
  };

  // アプリ起動ハンドラ
  const handleAppClick = (appId) => {
    openWindow(appId);
    setIsMenuOpen(false);
  };

  // 検索フィルタリング
  const filteredApps = APPS.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Restart Overlay */}
      {isRestarting && (
        <div className="fixed inset-0 z-100000 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
          </div>
          <div className="text-lg font-medium tracking-wide">
            Restarting System...
          </div>
        </div>
      )}

      {/* Start Menu Popup */}
      <div
        ref={menuRef}
        className={`
          fixed bottom-20 w-80 rounded-2xl shadow-2xl backdrop-blur-2xl border z-10001 overflow-hidden flex flex-col
          transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom-left
          ${
            isMenuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-8 pointer-events-none"
          }
          ${
            isDark
              ? "bg-slate-900/90 border-slate-700/50"
              : "bg-white/90 border-white/60"
          }
        `}
        style={{
          left: menuLeft,
          maxHeight: "500px",
        }}
      >
        {/* Search Bar */}
        <div
          className={`p-3 pb-2 ${isDark ? "bg-slate-900/50" : "bg-white/50"}`}
        >
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${
              isDark
                ? "bg-black/20 border-white/10 focus-within:border-blue-500/50 focus-within:bg-black/40"
                : "bg-white border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
            }`}
          >
            <Search
              className={`w-4 h-4 ${
                isDark ? "text-slate-400" : "text-slate-400"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent w-full text-sm outline-none placeholder:text-opacity-50 ${
                isDark
                  ? "text-white placeholder:text-slate-400"
                  : "text-slate-800 placeholder:text-slate-500"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`p-0.5 rounded-full ${
                  isDark
                    ? "hover:bg-white/20 text-slate-400"
                    : "hover:bg-slate-200 text-slate-500"
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* App List - Only rendered if search is active */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin transition-all duration-300">
          {searchQuery &&
            (filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 transition-colors group ${
                    isDark
                      ? "hover:bg-white/10 text-slate-200"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div
                    className={`w-8 h-8 p-1.5 rounded-lg transition-transform group-hover:scale-110 ${
                      isDark
                        ? "bg-white/5"
                        : "bg-white shadow-sm border border-slate-100"
                    }`}
                  >
                    {app.icon}
                  </div>
                  <span className="font-medium text-sm">{app.title}</span>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-500 opacity-60">
                <div className="text-2xl mb-2">
                  <Search />
                </div>
                <div className="text-xs">No apps found</div>
              </div>
            ))}
        </div>

        {/* Footer / User Profile */}
        <div
          className={`p-3 mt-auto border-t ${
            isDark
              ? "border-white/5 bg-black/20"
              : "border-slate-100 bg-slate-50/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-opacity-20 ring-white">
                JH
              </div>
              <div>
                <div
                  className={`font-bold text-sm ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  Jun Hayashi
                </div>
                <div
                  className={`text-[10px] font-medium ${
                    isDark ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  Administrator
                </div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-white/10 text-slate-400 hover:text-red-400"
                  : "hover:bg-white text-slate-500 hover:text-red-500 hover:shadow-sm"
              }`}
              title="Restart System"
            >
              <Power className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Taskbar Dock */}
      <div
        className={`
        fixed bottom-4 left-1/2 -translate-x-1/2 z-10000 flex items-stretch gap-3 p-2 rounded-2xl backdrop-blur-2xl border shadow-2xl transition-all hover:scale-[1.01]
        ${
          isDark
            ? "bg-slate-900/60 border-white/10 hover:bg-slate-900/70"
            : "bg-white/60 border-white/40 hover:bg-white/80 shadow-slate-300/50"
        }
      `}
      >
        {/* Start Button */}
        <button
          ref={startButtonRef}
          onClick={handleToggleMenu}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 
            ${
              isMenuOpen
                ? "bg-blue-500 shadow-lg shadow-blue-500/50 text-white scale-110"
                : isDark
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/5 hover:bg-black/10 text-slate-700"
            }
          `}
        >
          <Box className="w-6 h-6" />
        </button>

        <div
          className={`w-px my-1 mx-1 ${isDark ? "bg-white/10" : "bg-black/5"}`}
        ></div>

        {/* Running Apps */}
        <div className="flex items-center gap-2">
          {windows.map((win) => (
            <button
              key={win.id}
              onClick={() => onWindowClick(win.id)}
              className={`
                relative group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${
                  win.id === activeWindowId && !win.isMinimized
                    ? isDark
                      ? "bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                      : "bg-white shadow-sm text-slate-800"
                    : isDark
                    ? "hover:bg-white/5 text-slate-200"
                    : "hover:bg-white/40 text-slate-600"
                }
              `}
              title={win.title}
            >
              <div
                className={`w-6 h-6 transition-transform duration-300 ${
                  win.id === activeWindowId
                    ? "scale-110"
                    : "group-hover:scale-110"
                }`}
              >
                {win.icon}
              </div>
              {/* Active Indicator */}
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 transition-all duration-300 ${
                  win.id === activeWindowId && !win.isMinimized
                    ? "w-4 opacity-100"
                    : "opacity-0"
                }`}
              />
              {win.isMinimized && (
                <div
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDark ? "bg-gray-500" : "bg-gray-400"
                  }`}
                />
              )}
            </button>
          ))}
          {windows.length === 0 && (
            <div
              className={`px-3 text-xs font-medium flex items-center h-full select-none ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Portfolio OS
            </div>
          )}
        </div>

        <div
          className={`w-px my-1 mx-1 ${isDark ? "bg-white/10" : "bg-black/5"}`}
        ></div>

        {/* Clock */}
        <div
          className={`flex flex-col justify-center px-3 rounded-xl cursor-default transition-colors text-right min-w-[80px] ${
            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
          }`}
        >
          {/* Time */}
          <span
            className={`text-xs font-semibold ${
              isDark ? "text-gray-200" : "text-slate-800"
            }`}
          >
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {/* Date + Weekday */}
          <span
            className={`text-[10px] ${
              isDark ? "text-gray-400" : "text-slate-500"
            }`}
          >
            {time.toLocaleDateString([], {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </>
  );
};

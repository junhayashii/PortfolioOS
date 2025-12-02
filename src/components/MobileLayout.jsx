import React, { useState, useEffect } from "react";
import { APPS } from "../config/apps";
import { DesktopIcon } from "./DesktopIcon";
import { useTheme } from "./ThemeContext";
import { BatteryMedium, Wifi } from "lucide-react";

/* モバイルレイアウトコンポーネント */
export const MobileLayout = () => {
  const [activeAppId, setActiveAppId] = useState(null);
  const [time, setTime] = useState(new Date());
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 時刻表示の更新
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeApp = APPS.find((a) => a.id === activeAppId);

  //　Dock Apps
  const dockApps = APPS.filter((app) =>
    ["contact", "projects", "profile", "settings"].includes(app.id)
  );

  // Home Screen Apps (全アプリ)
  const homeApps = APPS;

  return (
    <div
      className={`h-dvh w-screen overflow-hidden relative flex flex-col ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Wallpaper Background */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-500 bg-linear-to-bl ${
          isDark
            ? "from-indigo-900 via-slate-900 to-black"
            : "from-blue-200 via-purple-100 to-white"
        }`}
      />

      {/* Status Bar */}
      <div className="relative z-50 px-6 py-3 flex justify-between items-center text-xs font-medium select-none mix-blend-difference text-white">
        {/* 時刻 */}
        <span>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        {/* ステータスアイコン */}
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 overflow-hidden">
        {/* Home Screen */}
        <div
          className={`
          absolute inset-0 px-6 pt-8 pb-36 max-w-5xl mx-auto grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-8 gap-x-4 content-start transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
          ${
            activeAppId
              ? "scale-90 opacity-0 pointer-events-none"
              : "scale-100 opacity-100"
          }
        `}
        >
          {homeApps.map((app) => (
            <div key={app.id} className="flex flex-col items-center gap-2">
              <DesktopIcon
                title={app.title}
                icon={app.icon}
                onClick={() => setActiveAppId(app.id)}
                variant="mobile"
              />
            </div>
          ))}
        </div>

        {/* Dock */}
        <div
          className={`
          absolute bottom-6 left-4 right-4 md:left-12 md:right-12 lg:left-1/4 lg:right-1/4 h-24 rounded-[2.5rem] flex items-center justify-around px-4 shadow-2xl backdrop-blur-2xl transition-transform duration-500 delay-100 z-20
          ${
            isDark
              ? "bg-white/10 border border-white/5"
              : "bg-white/40 border border-white/20"
          }
          ${activeAppId ? "translate-y-40" : "translate-y-0"}
        `}
        >
          {dockApps.map((app) => (
            <DesktopIcon
              key={app.id}
              title="" // No title in dock
              icon={app.icon}
              onClick={() => setActiveAppId(app.id)}
              variant="mobile"
            />
          ))}
        </div>

        {/* Active App View */}
        {activeApp && (
          <div
            className={`
            absolute inset-0 z-40 flex flex-col bg-white transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            ${
              activeAppId
                ? "translate-y-0 rounded-none"
                : "translate-y-full rounded-t-3xl"
            }
          `}
          >
            {/* App Content */}
            <div className="flex-1 relative overflow-hidden">
              {activeApp.component}
            </div>

            {/* Home Indicator Bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-8 z-50 flex justify-center items-end pb-2 cursor-pointer`}
              onClick={() => setActiveAppId(null)}
            >
              <div
                className={`w-32 h-1.5 rounded-full ${
                  isDark ? "bg-white/50" : "bg-black/20"
                }`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

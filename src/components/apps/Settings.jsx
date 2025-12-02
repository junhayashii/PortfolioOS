import React from "react";
import { useTheme } from "../ThemeContext";

export const SettingsApp = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`h-full overflow-y-auto p-6 md:p-8 font-sans transition-colors duration-300 ${
        theme === "dark" ? "text-white bg-[#111]" : "text-slate-800 bg-slate-50"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Settings</h2>
        <p
          className={`mb-8 ${
            theme === "dark" ? "text-gray-400" : "text-slate-500"
          }`}
        >
          Customize your OS experience
        </p>

        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4 px-1">
              Display & Appearance
            </h3>

            <div
              className={`p-4 md:p-6 rounded-2xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors ${
                      theme === "dark"
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {theme === "dark" ? "🌙" : "☀️"}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      Theme Preference
                    </div>
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      {theme === "dark"
                        ? "Currently in Dark Mode"
                        : "Currently in Light Mode"}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex w-full md:w-auto p-1.5 rounded-xl backdrop-blur-sm ${
                    theme === "dark" ? "bg-black/40" : "bg-slate-100"
                  }`}
                >
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      theme === "light"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-gray-500 hover:text-gray-400"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-slate-700 text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4 px-1">
              System Information
            </h3>
            <div
              className={`rounded-2xl border overflow-hidden ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div
                className={`px-4 md:px-6 py-4 flex justify-between items-center border-b ${
                  theme === "dark" ? "border-white/5" : "border-slate-100"
                }`}
              >
                <span className="font-medium text-sm md:text-base">
                  OS Version
                </span>
                <span
                  className={`font-mono text-xs md:text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  PortfolioOS v1.0.0
                </span>
              </div>
              <div
                className={`px-4 md:px-6 py-4 flex justify-between items-center border-b ${
                  theme === "dark" ? "border-white/5" : "border-slate-100"
                }`}
              >
                <span className="font-medium text-sm md:text-base">
                  React Version
                </span>
                <span
                  className={`font-mono text-xs md:text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  v19.2.0
                </span>
              </div>
              <div className="px-4 md:px-6 py-4 flex justify-between items-center">
                <span className="font-medium text-sm md:text-base">
                  Developer
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-linear-to-tr from-blue-500 to-purple-500"></div>
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    Jun Hayahi
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

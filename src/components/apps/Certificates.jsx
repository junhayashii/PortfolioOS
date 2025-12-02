import React from "react";
import { useTheme } from "../ThemeContext";
import { CERTIFICATES } from "../../config/data";
import { SquareArrowOutUpRight } from "lucide-react";

export const CertificatesApp = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`h-full flex flex-col font-sans pb-20 md:pb-0 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Header */}
      <div
        className={`p-6 md:p-8 pb-4 border-b ${
          isDark ? "border-white/5" : "border-slate-200/50"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My Certificates</h1>
        <p
          className={`text-base md:text-lg ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Verified credentials and professional achievements.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className={`
                 group relative rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-2xl overflow-hidden
                 ${
                   isDark
                     ? "bg-slate-900 border-slate-800 hover:border-slate-600"
                     : "bg-white border-slate-100 hover:shadow-slate-200/50"
                 }
               `}
            >
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  {/* Logo */}
                  <img src={cert.logo} className="w-12 h-12" />
                  {/* ID */}
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-mono font-medium uppercase tracking-wider opacity-60 border ${
                      isDark
                        ? "bg-black/20 border-white/10"
                        : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    {cert.id}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg md:text-xl font-bold mb-1 leading-tight group-hover:text-blue-500 transition-colors ${
                    isDark ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div
                  className={`text-sm font-medium mb-6 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {cert.issuer}
                </div>

                <div
                  className={`mt-auto pt-4 flex items-center justify-between border-t border-dashed ${
                    isDark ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  {/* Date */}
                  <span className="text-xs opacity-50">{cert.date}</span>
                  {/* Link */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-bold flex items-center gap-1 transition-colors hover:underline ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Verify Credential
                    <SquareArrowOutUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { useTheme } from "../ThemeContext";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Download,
  User,
  Languages,
  Heart,
  Square,
} from "lucide-react";
import CV from "/CV.pdf";

import { PROFILE, INTERESTS, EXPERIENCE, EDUCATION } from "../../config/data";

export const ProfileApp = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgCard = isDark
    ? "bg-slate-900 border-slate-800 text-slate-200"
    : "bg-white border-slate-100 text-slate-700";

  const bgSoft = isDark
    ? "bg-slate-800/50 text-slate-300 border-slate-700"
    : "bg-slate-50 text-slate-600 border-slate-200";

  const textTitle = isDark ? "text-slate-100" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <div
      className={`h-full overflow-y-auto font-sans scroll-smooth ${
        isDark ? "bg-slate-950 text-slate-200" : "bg-gray-50/80 text-slate-800"
      }`}
    >
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Card */}
            <div
              className={`${bgCard} rounded-3xl p-8 shadow-lg relative overflow-hidden group`}
            >
              <div className="relative z-10 text-center">
                <div
                  className={`w-32 h-32 mx-auto rounded-full p-1.5 shadow-xl mb-6 ${
                    isDark ? "bg-slate-800" : "bg-white"
                  }`}
                >
                  <img
                    src={PROFILE.avatar}
                    alt={PROFILE.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <h2 className={`text-2xl font-extrabold mb-1 ${textTitle}`}>
                  {PROFILE.name}
                </h2>

                <p className="text-blue-500 font-semibold mb-6">
                  {PROFILE.role}
                </p>

                {/* Resume Button */}
                <button
                  onClick={() => window.open(CV, "_blank")}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <Download size={18} />
                  CV
                </button>
              </div>
            </div>

            {/* Location */}
            <div className={`${bgCard} p-6 rounded-2xl shadow-sm border`}>
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    isDark
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textMuted} uppercase`}>
                    Location
                  </div>
                  <div className={`pt-1 ${textTitle}`}>{PROFILE.location}</div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className={`${bgCard} p-6 rounded-2xl shadow-sm border`}>
              <div className="flex items-center gap-2 mb-4">
                <Languages
                  size={18}
                  className={isDark ? "text-slate-400" : "text-slate-400"}
                />
                <h3
                  className={`font-bold uppercase text-xs tracking-wider ${textMuted}`}
                >
                  Languages
                </h3>
              </div>

              <div className="space-y-3">
                <p className={`${textMuted} text-sm`}>{PROFILE.languages}</p>
              </div>
            </div>

            {/* Top Skills */}
            <div className={`${bgCard} p-6 rounded-2xl shadow-sm border`}>
              <div className="flex items-center gap-2 mb-4">
                <Square
                  size={18}
                  className={isDark ? "text-slate-400" : "text-slate-400"}
                />
                <h3
                  className={`font-bold uppercase text-xs tracking-wider ${textMuted}`}
                >
                  Top Skills
                </h3>
              </div>

              <div className="space-y-3">
                <p className={`${textMuted} text-sm`}>{PROFILE.skills}</p>
              </div>
            </div>

            {/* Interests */}
            <div className={`${bgCard} p-6 rounded-2xl shadow-sm border`}>
              <div className="flex items-center gap-2 mb-4">
                <Heart
                  size={18}
                  className={isDark ? "text-slate-400" : "text-slate-400"}
                />
                <h3
                  className={`font-bold uppercase text-xs tracking-wider ${textMuted}`}
                >
                  Interests
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl flex flex-col items-center gap-2 cursor-default transition-colors ${
                      isDark
                        ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                        : "bg-blue-50 text-blue-400 hover:bg-blue-100"
                    }`}
                  >
                    <item.icon size={24} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className={`${bgCard} p-6 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-xl ${
                    isDark
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <User size={20} />
                </div>
                <h2 className={`text-lg font-bold ${textTitle}`}>About me</h2>
              </div>

              <p className={`${textMuted} leading-relaxed`}>{PROFILE.bio}</p>
            </div>

            {/* Experience */}
            <div className={`${bgCard} p-6 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-xl ${
                    isDark
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Briefcase size={20} />
                </div>
                <h2 className={`text-lg font-bold ${textTitle}`}>Experience</h2>
              </div>

              <div className="space-y-8 relative pl-2">
                {/* vertical line */}
                <div
                  className={`absolute left-[19px] top-1 bottom-0 w-0.5 ${
                    isDark ? "bg-slate-700" : "bg-gray-100"
                  }`}
                ></div>

                {EXPERIENCE.map((exp, i) => (
                  <div className="relative pl-10 group" key={i}>
                    <div
                      className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full ring-4 shadow-sm ${
                        isDark
                          ? "bg-blue-500 ring-slate-900"
                          : "bg-blue-500 ring-white"
                      }`}
                    ></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h3 className={`font-bold ${textTitle}`}>{exp.role}</h3>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          isDark
                            ? "bg-slate-800 text-slate-300"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <p className={`text-sm ${textMuted} mb-2 font-medium`}>
                      {exp.company}
                    </p>
                    <p className={`text-sm ${textMuted} leading-relaxed`}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className={`${bgCard} p-6 rounded-2xl border`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-xl ${
                    isDark
                      ? "bg-purple-900/30 text-purple-400"
                      : "bg-purple-50 text-purple-600"
                  }`}
                >
                  <GraduationCap size={20} />
                </div>
                <h2 className={`text-lg font-bold ${textTitle}`}>Education</h2>
              </div>

              {EDUCATION.map((edu, i) => (
                <div className="flex gap-4 items-start" key={i}>
                  <div
                    className={`mt-1 min-w-[48px] h-12 rounded-xl flex items-center justify-center ${
                      isDark
                        ? "bg-slate-800 text-slate-400"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${textTitle}`}>{edu.degree}</h3>
                    <p className={`text-sm ${textMuted}`}>{edu.school}</p>
                    <p className={`text-xs ${textMuted} mt-1`}>{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-12 text-center border-t pt-8 pb-4 ${
            isDark ? "border-slate-800" : "border-gray-200/60"
          }`}
        >
          <p className={`text-sm italic ${textMuted}`}>
            "Even in the darkest terminal, I find a spark of curiosity."
          </p>
        </div>
      </div>
    </div>
  );
};

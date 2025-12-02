import React, { useState } from "react";
import { useTheme } from "../ThemeContext";

import { PROJECTS } from "../../config/data";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";

export const ProjectsApp = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  return (
    <div
      className={`h-full ${
        isDark ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-800"
      } relative overflow-hidden flex flex-col font-sans transition-colors duration-300`}
    >
      {/* Detail View Overlay */}
      <div
        className={`
          absolute inset-0 z-20 transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto
          ${isDark ? "bg-slate-900" : "bg-white"}
          ${selectedId ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {selectedProject && (
          <>
            {/* BACK BUTTON - Fixed at top left */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 left-4 md:top-6 md:left-6 z-30 bg-black/20 hover:bg-black/40 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {/* Detail Header with Image */}
            <div className="relative h-56 md:h-64 shrink-0 overflow-hidden">
              {/* Blurry background version */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50"
                style={{ backgroundImage: `url(${selectedProject.image})` }}
              />
              <div
                className={`absolute inset-0 bg-linear-to-t ${
                  isDark
                    ? "from-slate-900 via-slate-900/50"
                    : "from-white via-white/50"
                } to-transparent`}
              />

              {/* Main Content Container */}
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div className="relative z-10 w-full">
                  <div className="flex flex-col md:flex-row md:items-end gap-6">
                    {/* Thumbnail floating */}
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-24 h-16 md:w-32 md:h-24 object-cover rounded-lg shadow-2xl border-2 border-white/20 hidden md:block"
                    />
                    <div className="mb-1">
                      <h1
                        className={`text-3xl md:text-4xl font-bold drop-shadow-sm ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {selectedProject.title}
                      </h1>
                      <div
                        className={`h-1.5 w-24 rounded-full mt-2 bg-linear-to-r from-blue-500 to-cyan-500`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Content */}
            <div className="flex-1 p-6 md:p-8 pb-24 md:pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Main Info Column */}
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3
                      className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                        isDark ? "text-slate-100" : "text-slate-800"
                      }`}
                    >
                      <span
                        className={`w-1 h-6 rounded-full ${
                          isDark ? "bg-blue-400" : "bg-slate-800"
                        }`}
                      ></span>
                      Overview
                    </h3>
                    <p
                      className={`leading-relaxed text-base md:text-lg ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {selectedProject.fullDescription}
                    </p>
                  </section>

                  <section>
                    <h3
                      className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                        isDark ? "text-slate-100" : "text-slate-800"
                      }`}
                    >
                      <span
                        className={`w-1 h-6 rounded-full ${
                          isDark ? "bg-blue-400" : "bg-slate-800"
                        }`}
                      ></span>
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                            isDark
                              ? "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                              : "bg-slate-50 border-slate-100 hover:border-blue-100"
                          }`}
                        >
                          <div className="mt-1 w-5 h-5 rounded-full bg-green-100 text-blue-600 flex items-center justify-center shrink-0">
                            <CircleCheck />
                          </div>
                          <span
                            className={`font-medium text-sm ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1.5 text-sm font-semibold rounded-lg border ${
                            isDark
                              ? "bg-slate-800 text-slate-300 border-slate-700"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Links
                    </h3>
                    <div className="flex flex-col gap-3">
                      <a
                        href={selectedProject.links.demo}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                      >
                        <span>🚀</span> Live Demo
                      </a>
                      <a
                        href={selectedProject.links.code}
                        className={`flex items-center justify-center gap-2 w-full py-3 border rounded-xl font-bold transition-all active:scale-95 ${
                          isDark
                            ? "bg-transparent text-white border-slate-600 hover:bg-white/5"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <span>💻</span> View Code
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Grid View */}
      <div
        className={`flex-1 overflow-y-auto p-4 md:p-8 transition-opacity duration-300 ${
          selectedId ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="max-w-6xl mx-auto pb-20 md:pb-0">
          <div className="mb-6 md:mb-8">
            <h2
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Projects
            </h2>
            <p
              className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              A collection of my recent work and experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 pb-8">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`
                  group rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer flex flex-col overflow-hidden
                  ${
                    isDark
                      ? "bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:shadow-black/40"
                      : "bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
                  }
                `}
              >
                {/* Screenshot Area */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${
                      isDark ? "from-slate-900" : "from-white"
                    } to-transparent opacity-60`}
                  />

                  {/* Gradient accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-cyan-500`}
                  ></div>
                </div>

                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  {/* Title Header */}
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className={`text-xl font-bold transition-colors ${
                        isDark
                          ? "text-slate-100 group-hover:text-blue-400"
                          : "text-slate-800 group-hover:text-blue-600"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`transition-all ${
                        isDark
                          ? "text-slate-600 group-hover:text-blue-400"
                          : "text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-6 flex-1 line-clamp-2 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                          isDark
                            ? "bg-slate-800 text-slate-400 border-slate-700 group-hover:bg-slate-700 group-hover:text-slate-200"
                            : "bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-slate-100 group-hover:text-slate-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                          isDark
                            ? "bg-slate-800 text-slate-500 border-slate-700"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

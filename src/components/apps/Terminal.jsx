import React, { useState, useEffect, useRef } from "react";
import { useOS } from "../OSContext";

const FILES = {
  profile: "profile",
  projects: "projects",
  certificates: "certificates",
  contact: "contact",
  settings: "settings",
};

export const TerminalApp = () => {
  const { openWindow } = useOS();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { id: 0, type: "output", text: "Welcome to Portfolio OS Terminal v1.0.0" },
    { id: 1, type: "output", text: 'Type "help" for a list of commands.' },
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();
    const param = args[1];

    const newHistory = [
      ...history,
      { id: Date.now(), type: "input", text: cmd, path: "~/desktop" },
    ];

    let output = "";

    switch (command) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <div>Available commands:</div>
            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-2">
              <span className="text-green-400">ls</span>
              <span>List directory contents</span>
              <span className="text-green-400">open [app]</span>
              <span>Open an application or file (e.g., open profile)</span>
              <span className="text-green-400">clear</span>
              <span>Clear terminal history</span>
              <span className="text-green-400">whoami</span>
              <span>Display current user</span>
              <span className="text-green-400">date</span>
              <span>Show current date and time</span>
            </div>
          </div>
        );
        break;
      case "ls":
      case "ll":
        output = (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-blue-300">
            {Object.keys(FILES).map((f) => (
              <span
                key={f}
                className={
                  f.includes(".") ? "text-slate-300" : "text-blue-400 font-bold"
                }
              >
                {f}
              </span>
            ))}
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "whoami":
        output = "jun-hayashi@portfolio-os";
        break;
      case "date":
        output = new Date().toString();
        break;
      case "open":
      case "cat":
      case "./":
        if (!param) {
          output = "Usage: open [filename]";
        } else {
          // Fuzzy match
          const foundFile = Object.keys(FILES).find((f) =>
            f.includes(param.toLowerCase())
          );
          if (foundFile) {
            output = `Opening ${foundFile}...`;
            // Small delay for effect
            setTimeout(() => openWindow(FILES[foundFile]), 300);
          } else {
            output = `Error: File or application '${param}' not found.`;
          }
        }
        break;
      case "":
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for commands.`;
    }

    if (output) {
      newHistory.push({ id: Date.now() + 1, type: "output", text: output });
    }
    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="h-full bg-black/90 p-4 font-mono text-xs md:text-sm text-green-400 overflow-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="space-y-2 pb-12">
        {history.map((entry) => (
          <div key={entry.id} className="leading-relaxed wrap-break-words">
            {entry.type === "input" ? (
              <div className="flex flex-wrap gap-2">
                <span className="text-blue-400 font-bold">visitor@os:</span>
                <span className="text-purple-400">{entry.path}</span>
                <span className="text-slate-400">$</span>
                <span className="text-slate-200 break-all">{entry.text}</span>
              </div>
            ) : (
              <div className="ml-0 opacity-90 text-slate-300 whitespace-pre-wrap">
                {entry.text}
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-2">
            <span className="text-blue-400 font-bold">visitor@os:</span>
            <span className="text-purple-400">~/desktop</span>
            <span className="text-slate-400">$</span>
          </div>
          <div className="relative flex-1 min-w-[100px]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none border-none text-slate-200 caret-green-400 p-0 m-0"
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

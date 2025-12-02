import { useRef } from "react";
import { useDrag } from "../hooks/useDrag";
import { useTheme } from "./ThemeContext";

/* ウィンドウコンポーネント */
export const Window = ({
  windowState,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  children,
}) => {
  const windowRef = useRef(null);
  const { theme } = useTheme();

  const { position, handleMouseDown, isDragging } = useDrag(
    windowRef,
    windowState.position,
    true,
    onFocus,
    () => {}
  );

  if (!windowState.isOpen) return null;

  const isDark = theme === "dark";

  return (
    <div
      ref={windowRef}
      className={`
        fixed flex flex-col rounded-xl overflow-hidden transition-all duration-200
        backdrop-blur-2xl 
        ${
          isDark
            ? "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
        }
        ${
          windowState.isMinimized
            ? "opacity-0 pointer-events-none scale-90"
            : "opacity-100 scale-100"
        }
        ${
          isActive
            ? isDark
              ? "ring-1 ring-white/10"
              : "ring-1 ring-black/5"
            : "grayscale-[0.1]"
        }
      `}
      style={{
        width: windowState.size?.width ?? 600,
        height: windowState.size?.height ?? 500,
        zIndex: windowState.zIndex,
        left: position.x,
        top: position.y,
        backgroundColor: isDark
          ? "rgba(30, 41, 59, 0.85)"
          : "rgba(255, 255, 255, 0.75)",
        transition: isDragging
          ? "none"
          : "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: windowState.isMinimized
          ? `translate(${0}px, ${window.innerHeight}px) scale(0.1)`
          : "translate(0, 0) scale(1)",
      }}
      onMouseDown={onFocus}
    >
      {/* ウィンドウヘッダー */}
      <div
        className={`
          h-10 flex items-center justify-between px-4 select-none cursor-default
          ${
            isDark
              ? "bg-linear-to-b from-white/10 to-transparent border-b border-white/5"
              : "bg-linear-to-b from-white/60 to-transparent border-b border-black/5"
          }
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 group">
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 border border-red-600/30 transition-colors shadow-sm"
            aria-label="Close"
          />
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 border border-yellow-600/30 transition-colors shadow-sm"
            aria-label="Minimize"
          />
        </div>
        <div
          className={`text-xs font-medium tracking-wide pointer-events-none font-sans ${
            isDark ? "text-gray-300/80" : "text-gray-600"
          }`}
        >
          {windowState.title}
        </div>
        <div className="w-12" />
      </div>

      {/* ウィンドウコンテンツ */}
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
};

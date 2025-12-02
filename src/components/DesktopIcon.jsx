/* デスクトップアイコンコンポーネント */
export const DesktopIcon = ({ title, icon, onClick, variant = "desktop" }) => {
  const isMobile = variant === "mobile";

  return (
    <button
      onClick={onClick}
      className={`
        group flex flex-col items-center justify-start rounded-lg transition-all focus:outline-none
        ${
          isMobile ? "p-0 w-auto active:scale-90" : "p-2 w-24 hover:bg-white/10"
        }
      `}
    >
      <div
        className={`
        relative flex items-center justify-center transition-transform duration-200
        ${
          isMobile
            ? "w-[60px] h-[60px] rounded-2xl bg-white/10 backdrop-blur-md shadow-lg mb-1 overflow-hidden"
            : "w-14 h-14 mb-2 group-hover:-translate-y-1 group-active:scale-95"
        }
      `}
      >
        {/* ホバー時のバックライト */}
        {!isMobile && (
          <div className="absolute inset-0 bg-white/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* アイコン本体 */}
        <div
          className={`relative drop-shadow-2xl filter ${
            isMobile ? "w-3/5 h-3/5" : "w-full h-full"
          }`}
        >
          {icon}
        </div>
      </div>

      {/* ラベル */}
      {title && (
        <span
          className={`
          text-center leading-tight text-shadow font-medium
          ${
            isMobile
              ? "text-[11px] text-white/90 tracking-tight"
              : "px-2 py-0.5 rounded-md text-white text-xs bg-black/10 group-hover:bg-black/50 group-focus:bg-blue-600/80 shadow-black/80 backdrop-blur-[2px]"
          }
        `}
        >
          {title}
        </span>
      )}
    </button>
  );
};

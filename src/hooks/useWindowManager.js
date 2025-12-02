import { useState, useCallback, useRef } from "react";
import { APPS } from "../config/apps";

/**
 * ウィンドウ管理のカスタムフック
 *
 * OS風ポートフォリオのウィンドウシステムを管理します。
 * ウィンドウの開閉、最小化、フォーカス、z-index管理などの機能を提供します。
 */
export const useWindowManager = () => {
  // 開いているウィンドウのリスト
  const [windows, setWindows] = useState([]);

  // 現在アクティブなウィンドウのID
  const [activeWindowId, setActiveWindowId] = useState(null);

  // 最高z-index値を保持するref（stale closureを防ぐためuseRefを使用）
  const highestZIndexRef = useRef(10);

  /**
   * 次のz-index値を取得する
   * ウィンドウがフォーカスされるたびに、より高いz-indexを割り当てる
   */
  const getNextZIndex = useCallback(() => {
    highestZIndexRef.current += 1;
    return highestZIndexRef.current;
  }, []);

  /**
   * 指定されたウィンドウのz-indexを更新する
   */
  const updateWindowZIndex = useCallback((id, zIndex) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex } : w)));
  }, []);

  /**
   * ウィンドウを開く
   * 既に開いている場合は、最小化状態を解除して最前面に表示する
   * 新規の場合は、APPSから設定を取得して新しいウィンドウを作成する
   */
  const openWindow = useCallback(
    (appId) => {
      setWindows((prev) => {
        const existingWindow = prev.find((w) => w.id === appId);
        if (existingWindow) {
          // 既に開いているウィンドウの場合、最小化を解除して最前面に表示
          const newZIndex = getNextZIndex();
          return prev.map((w) =>
            w.id === appId ? { ...w, isMinimized: false, zIndex: newZIndex } : w
          );
        }

        // 新規ウィンドウを作成
        const app = APPS.find((a) => a.id === appId);
        if (!app) return prev;

        const newZIndex = getNextZIndex();
        const newWindow = {
          id: app.id,
          title: app.title,
          icon: app.icon,
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
          position: app.initialPosition || { x: 50, y: 50 },
          size: app.defaultSize,
        };
        return [...prev, newWindow];
      });

      setActiveWindowId(appId);
    },
    [getNextZIndex]
  );

  /**
   * ウィンドウを閉じる
   * ウィンドウリストから削除し、アクティブなウィンドウの場合はnullに設定
   */
  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  /**
   * ウィンドウを最小化する
   * ウィンドウを非表示にし、アクティブなウィンドウの場合はnullに設定
   */
  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  /**
   * ウィンドウにフォーカスを当てる
   * アクティブウィンドウを設定し、z-indexを更新して最前面に表示
   */
  const focusWindow = useCallback(
    (id) => {
      setActiveWindowId(id);
      const newZIndex = getNextZIndex();
      updateWindowZIndex(id, newZIndex);
    },
    [getNextZIndex, updateWindowZIndex]
  );

  /**
   * 最小化されたウィンドウを復元する
   * 最小化状態を解除し、最前面に表示する
   */
  const restoreWindow = useCallback(
    (id) => {
      const newZIndex = getNextZIndex();
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
        )
      );
      setActiveWindowId(id);
    },
    [getNextZIndex]
  );

  /**
   * タスクバーからのウィンドウクリックを処理
   * ウィンドウの状態に応じて、復元・最小化・フォーカスのいずれかを実行
   */
  const handleTaskbarClick = useCallback(
    (id) => {
      const target = windows.find((w) => w.id === id);
      if (target?.isMinimized) {
        // 最小化されている場合は復元
        restoreWindow(id);
      } else if (activeWindowId === id) {
        // 既にアクティブな場合は最小化
        minimizeWindow(id);
      } else {
        // それ以外の場合はフォーカス
        focusWindow(id);
      }
    },
    [windows, activeWindowId, restoreWindow, minimizeWindow, focusWindow]
  );

  /**
   * システムを再起動（リセット）する
   * すべてのウィンドウを閉じ、状態を初期化する
   */
  const handleSystemRestart = useCallback(() => {
    setWindows([]);
    setActiveWindowId(null);
    highestZIndexRef.current = 10;
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    handleTaskbarClick,
    handleSystemRestart,
  };
};

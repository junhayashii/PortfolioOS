import React, { useState, useEffect, useCallback } from 'react';

/**
 * ドラッグ機能を提供するカスタムフック
 */
export const useDrag = (
  ref,
  initialPosition,
  isActive,
  onDragStart,
  onDragEnd
) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    // Only drag if the target is the header (assumed to be the element with this handler or specific class)
    if (!ref.current) return;
    
    // Prevent dragging if clicking minimize/close buttons
    if (e.target.tagName === 'BUTTON') return;

    onDragStart();
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position, onDragStart, ref]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      
      // Simple boundary constraints (optional)
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      
      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      });
    }
  }, [isDragging, offset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(position);
    }
  }, [isDragging, onDragEnd, position]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return { position, handleMouseDown, isDragging };
};


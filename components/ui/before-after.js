"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components/common/icon";
import { ArrowLeftRight } from "lucide-react";

export function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Support for both mouse and touch events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchMove = (e) => {
    handleMove(e);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden cursor-ew-resize select-none touch-none group"
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={afterImage} 
          alt={afterLabel} 
          fill
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1440px"
          priority
        />
        <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-caption uppercase tracking-widest">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-screen max-w-none" style={{ width: containerRef.current?.offsetWidth || '100vw' }}>
          <Image 
            src={beforeImage} 
            alt={beforeLabel} 
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority
          />
        </div>
        <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-caption uppercase tracking-widest">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <Icon icon={ArrowLeftRight} size="sm" className="text-foreground" />
        </div>
      </div>
    </div>
  );
}

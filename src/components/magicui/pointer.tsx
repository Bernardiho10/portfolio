"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface PointerContextType {
  setPointer: (pointer: React.ReactNode) => void;
  setDefaultPointer: () => void;
  setHeartPointer: () => void;
  setLoadingPointer: () => void;
}

const PointerContext = createContext<PointerContextType | undefined>(undefined);

export function usePointer() {
  const context = useContext(PointerContext);
  if (!context) {
    throw new Error("usePointer must be used within PointerProvider");
  }
  return context;
}

interface PointerProviderProps {
  children: React.ReactNode;
  defaultPointer?: React.ReactNode;
}

export function PointerProvider({
  children,
  defaultPointer,
}: PointerProviderProps) {
  const [pointer, setPointerState] = useState<React.ReactNode>(
    defaultPointer || <DefaultPointer />
  );
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Only show pointer on desktop devices
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      );
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isDesktop]);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const setPointer = (newPointer: React.ReactNode) => {
    setPointerState(newPointer);
  };

  const setDefaultPointer = () => {
    setPointerState(defaultPointer || <DefaultPointer />);
  };

  const setHeartPointer = () => {
    setPointerState(<HeartPointer />);
  };

  const setLoadingPointer = () => {
    setPointerState(<LoadingPointer />);
  };

  return (
    <PointerContext.Provider
      value={{ setPointer, setDefaultPointer, setHeartPointer, setLoadingPointer }}
    >
      {children}
      {isDesktop && isVisible && (
        <motion.div
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {pointer}
        </motion.div>
      )}
    </PointerContext.Provider>
  );
}

function DefaultPointer() {
  return (
    <div className="relative">
      <div className="w-5 h-5 rounded-full bg-blue-500/90 border-2 border-white shadow-xl backdrop-blur-sm" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
    </div>
  );
}

function HeartPointer() {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.3, repeat: Infinity }}
      className="text-2xl"
    >
      ❤️
    </motion.div>
  );
}

function LoadingPointer() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-6 h-6"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="purple"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="purple"
        />
      </svg>
    </motion.div>
  );
}

// Hook for interactive elements
export function usePointerInteraction() {
  const { setHeartPointer, setDefaultPointer } = usePointer();

  return {
    onMouseEnter: () => setHeartPointer(),
    onMouseLeave: () => setDefaultPointer(),
  };
}


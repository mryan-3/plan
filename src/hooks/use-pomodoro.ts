"use client";

import { useState, useEffect } from "react";

export function usePomodoro() {
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoMode, setPomoMode] = useState<"work" | "edit">("work");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomoActive && pomoTime > 0) {
      interval = setInterval(() => setPomoTime((t) => t - 1), 1000);
    } else if (pomoTime === 0) {
      setPomoActive(false);
      new Audio('/notification.mp3').play().catch(() => {});
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const setCustomTime = (minutes: number) => {
    setPomoTime(minutes * 60);
    setPomoMode("work");
  };

  return {
    pomoTime,
    pomoActive,
    pomoMode,
    setPomoActive,
    setPomoMode,
    setCustomTime,
    formatTime,
  };
}

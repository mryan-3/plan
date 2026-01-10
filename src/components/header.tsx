import { Unit } from "@/types";
import { Warning, MagicWand, SquaresFour, CalendarBlank } from "@phosphor-icons/react";
import { differenceInDays, parseISO } from "date-fns";
import { PomodoroWidget } from "./pomodoro-widget";
import { useState, useEffect } from "react";

const PROMPTS = [
  "What is the simplest thing that could possibly work?",
  "Make it ugly, then make it work.",
  "Don't break the chain.",
  "Visualize the finish line.",
  "Just 5 minutes.",
  "Honor thy error as a hidden intention.",
];

interface HeaderProps {
  units: Unit[];
  view: "grid" | "calendar";
  setView: (v: "grid" | "calendar") => void;
}

export function Header({ units, view, setView }: HeaderProps) {
  const [quote, setQuote] = useState(PROMPTS[0]);
  
  useEffect(() => {
     setQuote(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  const daysUntilExams = differenceInDays(parseISO("2026-02-02"), new Date());
  const completedTasks = units.reduce((acc, u) => acc + u.tasks.filter(t => t.completed).length, 0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#37464a] pb-6">
      <div>
        <p className="text-[#ff8154] font-mono text-sm mb-1 tracking-wider uppercase">{getGreeting()}, Captain.</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          PLAN <span className="text-[#ff8154]">2026</span>
        </h1>
        <div className="flex items-center gap-4 text-sm font-mono text-gray-400 mt-2">
          <span className="flex items-center gap-2">
            <Warning className="text-[#ff8154]" /> EXAMS IN {daysUntilExams} DAYS
          </span>
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          <span>{completedTasks} TASKS DONE</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button 
          onClick={() => setQuote(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])}
          className="hidden md:flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
        >
          <MagicWand size={16}/> "{quote}"
        </button>

        <PomodoroWidget />

        <div className="flex bg-[#1e272b] rounded-lg p-1 border border-[#37464a]">
          <button onClick={() => setView("grid")} className={`p-2 rounded ${view === "grid" ? "bg-[#ff8154] text-[#253034]" : "text-gray-400 hover:text-white"}`}>
            <SquaresFour size={20} weight="bold"/>
          </button>
          <button onClick={() => setView("calendar")} className={`p-2 rounded ${view === "calendar" ? "bg-[#ff8154] text-[#253034]" : "text-gray-400 hover:text-white"}`}>
            <CalendarBlank size={20} weight="bold"/>
          </button>
        </div>
      </div>
    </header>
  );
}
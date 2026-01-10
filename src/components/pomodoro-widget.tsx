import { Clock } from "@phosphor-icons/react";
import { useState } from "react";
import { usePomodoro } from "@/hooks/use-pomodoro";

export function PomodoroWidget() {
  const { 
    pomoTime, pomoActive, pomoMode, 
    setPomoActive, setPomoMode, setCustomTime, formatTime 
  } = usePomodoro();
  
  const [customPomoMinutes, setCustomPomoMinutes] = useState(25);

  return (
    <div className="flex items-center gap-3 bg-[#1e272b] px-4 py-2 rounded-lg border border-[#37464a]">
      {pomoMode === 'work' ? (
        <>
          <button onClick={() => setPomoMode('edit')} title="Edit Duration">
            <Clock className={pomoActive ? "text-[#ff8154] animate-pulse" : "text-gray-500"} weight="fill" />
          </button>
          <span className="font-mono text-xl font-bold w-16 text-center">{formatTime(pomoTime)}</span>
          <button 
            onClick={() => setPomoActive(!pomoActive)}
            className="text-xs uppercase font-bold tracking-wider hover:text-[#ff8154] transition-colors"
          >
            {pomoActive ? "Pause" : "Start"}
          </button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            className="w-12 bg-[#2d3a3f] text-white text-center rounded border border-[#37464a] outline-none focus:border-[#ff8154]"
            value={customPomoMinutes}
            onChange={(e) => setCustomPomoMinutes(Number(e.target.value))}
          />
          <span className="text-xs text-gray-500">min</span>
          <button 
            onClick={() => setCustomTime(customPomoMinutes)} 
            className="text-[#ff8154] font-bold text-xs"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
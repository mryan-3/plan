"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { UnitGrid } from "@/components/unit-grid";
import { CalendarView } from "@/components/calendar-view";
import { usePlannerData } from "@/hooks/use-planner-data";

export default function Plan() {
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const { 
    units, events, isLoaded, 
    toggleTask, addTask, deleteTask, editUnitTitle, reorderUnits,
    addEvent, removeEvent, addUnit, deleteUnit
  } = usePlannerData();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#253034] flex items-center justify-center text-[#ff8154]">
        Initializing...
      </div>
    );
  }

  const handleAddTask = (unitId: string) => {
    const title = prompt("New Task Name:");
    if (title) addTask(unitId, title);
  };

  return (
    <main className="min-h-screen p-4 md:p-10 max-w-7xl mx-auto">
      <Header units={units} view={view} setView={setView} />

      {view === "grid" ? (
        <UnitGrid 
          units={units}
          onReorder={reorderUnits}
          onToggleTask={toggleTask}
          onAddTask={handleAddTask}
          onDeleteTask={deleteTask}
          onEditTitle={editUnitTitle}
          onAddUnit={addUnit}
          onDeleteUnit={deleteUnit}
        />
      ) : (
        <CalendarView 
          events={events}
          onAddEvent={addEvent}
          onDeleteEvent={removeEvent}
        />
      )}
    </main>
  );
}
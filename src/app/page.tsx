"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { UnitGrid } from "@/components/unit-grid";
import { CalendarView } from "@/components/calendar-view";
import { usePlannerData } from "@/hooks/use-planner-data";
import { UnitEditorModal } from "@/components/unit-editor-modal";
import { TaskEditorModal } from "@/components/task-editor-modal";
import { Unit } from "@/types";

export default function Plan() {
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const { 
    units, events, isLoaded, 
    toggleTask, addTask, deleteTask, updateUnit, createUnit, reorderUnits,
    addEvent, removeEvent, deleteUnit
  } = usePlannerData();

  // Modal State
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [targetUnitId, setTargetUnitId] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#253034] flex items-center justify-center text-[#ff8154]">
        Initializing...
      </div>
    );
  }

  // --- Task Handlers ---
  const handleAddTaskClick = (unitId: string) => {
    setTargetUnitId(unitId);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (title: string) => {
    if (targetUnitId) {
      addTask(targetUnitId, title);
    }
  };

  // --- Unit Handlers ---
  const handleEditUnit = (unitId: string) => {
    setEditingUnitId(unitId);
    setIsUnitModalOpen(true);
  };

  const handleAddUnitClick = () => {
    setEditingUnitId(null);
    setIsUnitModalOpen(true);
  };

  const handleSaveUnit = (title: string, type: Unit["type"]) => {
    if (editingUnitId) {
      updateUnit(editingUnitId, { title, type });
    } else {
      createUnit(title, type);
    }
  };

  const getEditingUnitData = () => {
    if (!editingUnitId) return undefined;
    const unit = units.find(u => u.id === editingUnitId);
    return unit ? { title: unit.title, type: unit.type } : undefined;
  };

  return (
    <main className="min-h-screen p-4 md:p-10 max-w-7xl mx-auto">
      <Header units={units} view={view} setView={setView} />

      {view === "grid" ? (
        <UnitGrid 
          units={units}
          onReorder={reorderUnits}
          onToggleTask={toggleTask}
          onAddTask={handleAddTaskClick}
          onDeleteTask={deleteTask}
          onEditUnit={handleEditUnit}
          onAddUnitClick={handleAddUnitClick}
          onDeleteUnit={deleteUnit}
        />
      ) : (
        <CalendarView 
          events={events}
          onAddEvent={addEvent}
          onDeleteEvent={removeEvent}
        />
      )}

      {/* Unit Modal */}
      <UnitEditorModal 
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        onSave={handleSaveUnit}
        initialData={getEditingUnitData()}
      />

      {/* Task Modal */}
      <TaskEditorModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
      />
    </main>
  );
}
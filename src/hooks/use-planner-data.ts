"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Unit, CalendarEvent } from "@/types";

const INITIAL_UNITS: Unit[] = [];
const INITIAL_EVENTS: CalendarEvent[] = [];

export function usePlannerData() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUnits = localStorage.getItem("cmd_units");
    const savedEvents = localStorage.getItem("cmd_events");
    setUnits(savedUnits ? JSON.parse(savedUnits) : INITIAL_UNITS);
    setEvents(savedEvents ? JSON.parse(savedEvents) : INITIAL_EVENTS);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cmd_units", JSON.stringify(units));
      localStorage.setItem("cmd_events", JSON.stringify(events));
    }
  }, [units, events, isLoaded]);

  // CRUD Operations
  const toggleTask = (unitId: string, taskId: string) => {
    setUnits(prev => prev.map(u => {
      if (u.id !== unitId) return u;
      return {
        ...u,
        tasks: u.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  const addTask = (unitId: string, title: string) => {
    setUnits(prev => prev.map(u => {
      if (u.id !== unitId) return u;
      return { ...u, tasks: [...u.tasks, { id: uuidv4(), title, completed: false }] };
    }));
  };

  const deleteTask = (unitId: string, taskId: string) => {
    setUnits(prev => prev.map(u => {
      if (u.id !== unitId) return u;
      return { ...u, tasks: u.tasks.filter(t => t.id !== taskId) };
    }));
  };

  const updateUnit = (unitId: string, updates: Partial<Pick<Unit, "title" | "type">>) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, ...updates } : u));
  };

  const createUnit = (title: string, type: Unit["type"]) => {
    setUnits(prev => [
      ...prev, 
      { id: uuidv4(), title, type, tasks: [] }
    ]);
  };

  const deleteUnit = (unitId: string) => {
    setUnits(prev => prev.filter(u => u.id !== unitId));
  };

  const reorderUnits = (startIndex: number, endIndex: number) => {
    const items = Array.from(units);
    const [reorderedItem] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, reorderedItem);
    setUnits(items);
  };
  
  const addEvent = (title: string, date: string) => {
      setEvents(prev => [...prev, { id: uuidv4(), title, date, type: "event" }]);
  };

  const removeEvent = (id: string) => {
      setEvents(prev => prev.filter(e => e.id !== id));
  };

  return { 
      units, events, isLoaded, 
      toggleTask, addTask, deleteTask, updateUnit, createUnit, deleteUnit, reorderUnits,
      addEvent, removeEvent
  };
}
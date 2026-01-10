import { CalendarEvent } from "@/types";
import { EventCard } from "./event-card";
import { Plus } from "@phosphor-icons/react";

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (title: string, date: string) => void;
  onDeleteEvent: (id: string) => void;
}

export function CalendarView({ events, onAddEvent, onDeleteEvent }: CalendarViewProps) {
  
  const handleAdd = () => {
    const title = prompt("Event Title:");
    const date = prompt("Date (YYYY-MM-DD):");
    if (title && date) onAddEvent(title, date);
  };

  const sortedEvents = [...events].sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {sortedEvents.map(event => (
        <EventCard key={event.id} event={event} onDelete={onDeleteEvent} />
      ))}
      
      <button 
        onClick={handleAdd}
        className="bg-[#1e272b] p-6 rounded-xl border-2 border-dashed border-[#37464a] flex flex-col items-center justify-center text-gray-500 hover:text-[#ff8154] hover:border-[#ff8154] transition-all group min-h-[200px]"
      >
        <Plus size={40} className="mb-2 group-hover:scale-110 transition-transform"/>
        <span className="font-bold uppercase tracking-wider">Add Event</span>
      </button>
    </div>
  );
}
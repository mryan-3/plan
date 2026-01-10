import { CalendarEvent } from "@/types";
import { format, differenceInDays, parseISO } from "date-fns";
import { Clock, Trash } from "@phosphor-icons/react";

interface EventCardProps {
  event: CalendarEvent;
  onDelete: (id: string) => void;
}

export function EventCard({ event, onDelete }: EventCardProps) {
  const daysLeft = differenceInDays(parseISO(event.date), new Date());

  return (
    <div className="bg-[#2d3a3f] p-6 rounded-xl relative overflow-hidden group hover:bg-[#324046] transition-colors">
       <div className="absolute top-0 left-0 w-1 h-full bg-[#ff8154]"></div>
       <div className="text-5xl font-black text-[#37464a] mb-2 group-hover:text-[#46585e] transition-colors">
         {format(parseISO(event.date), "dd")}
       </div>
       <div className="text-xl font-bold text-white mb-1">{event.title}</div>
       <div className="text-xs font-mono text-[#ff8154] uppercase tracking-widest mb-4">
         {format(parseISO(event.date), "MMMM yyyy")}
       </div>
       <div className="text-xs text-gray-400 flex items-center gap-2">
          <Clock size={14}/>
          {daysLeft} days left
       </div>
       <button 
          onClick={() => { if(confirm("Remove this event?")) onDelete(event.id); }}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
       >
          <Trash size={16}/>
       </button>
    </div>
  );
}

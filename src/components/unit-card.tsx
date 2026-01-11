import { Unit } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { Check, Trash, Plus, PencilSimple, X } from "@phosphor-icons/react";

interface UnitCardProps {
  unit: Unit;
  index: number;
  onToggleTask: (unitId: string, taskId: string) => void;
  onAddTask: (unitId: string) => void;
  onDeleteTask: (unitId: string, taskId: string) => void;
  onEditTitle: () => void;
  onDeleteUnit: (unitId: string) => void;
}

export function UnitCard({ unit, index, onToggleTask, onAddTask, onDeleteTask, onEditTitle, onDeleteUnit }: UnitCardProps) {
  const calculateProgress = () => {
    if (unit.tasks.length === 0) return 0;
    return Math.round((unit.tasks.filter(t => t.completed).length / unit.tasks.length) * 100);
  };
  const progress = calculateProgress();

  return (
    <Draggable draggableId={unit.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group relative flex flex-col bg-[#2d3a3f] rounded-xl p-6 transition-all h-full 
            ${snapshot.isDragging ? "shadow-2xl scale-[1.02] ring-2 ring-[#ff8154] z-50" : "hover:bg-[#324046]"}`}
          style={provided.draggableProps.style}
        >
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => { if(confirm("Delete this unit?")) onDeleteUnit(unit.id) }}
                className="text-gray-600 hover:text-red-500 p-1"
                title="Delete Unit"
              >
                  <X size={16} />
              </button>
          </div>

          <div className="flex justify-between items-start mb-6" {...provided.dragHandleProps}>
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${
                   unit.type === 'academic' ? 'text-blue-400' :
                   unit.type === 'portfolio' ? 'text-[#ff8154]' : 'text-green-400'
                }`}>
                  {unit.type}
                </span>
                <button 
                  onClick={onEditTitle}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white transition-opacity"
                >
                  <PencilSimple size={12}/>
                </button>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">{unit.title}</h2>
            </div>
            
            <div className="relative w-10 h-10 shrink-0 mt-2">
               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#1e272b]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <path className="text-[#ff8154]" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
               </svg>
               <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-300">{progress}%</div>
            </div>
          </div>

          <div className="space-y-3 flex-grow">
            {unit.tasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 group/task">
                <button 
                  onClick={() => onToggleTask(unit.id, task.id)}
                  className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center transition-all shrink-0 
                    ${task.completed ? "bg-[#ff8154] border-[#ff8154]" : "border-gray-500 hover:border-white"}`}
                >
                  {task.completed && <Check weight="bold" className="text-[#253034] text-[10px]"/>}
                </button>
                <span className={`text-sm leading-snug ${task.completed ? "text-gray-500 line-through" : "text-gray-300 group-hover/task:text-white transition-colors"}`}>
                  {task.title}
                </span>
                <button onClick={() => onDeleteTask(unit.id, task.id)} className="ml-auto opacity-0 group-hover/task:opacity-100 text-gray-600 hover:text-red-500"><Trash size={14}/></button>
              </div>
            ))}
            {unit.tasks.length === 0 && <p className="text-sm text-gray-600 italic">No missions active.</p>}
          </div>

          <div className="mt-6 pt-4 border-t border-[#37464a]">
            <button onClick={() => onAddTask(unit.id)} className="w-full py-2 rounded border border-dashed border-[#37464a] text-xs font-bold text-gray-500 hover:text-[#ff8154] hover:border-[#ff8154] transition-all flex items-center justify-center gap-2">
              <Plus weight="bold"/> ADD TASK
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

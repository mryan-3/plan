import { Unit } from "@/types";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { UnitCard } from "./unit-card";
import { Plus } from "@phosphor-icons/react";

interface UnitGridProps {
  units: Unit[];
  onReorder: (start: number, end: number) => void;
  onToggleTask: (unitId: string, taskId: string) => void;
  onAddTask: (unitId: string) => void;
  onDeleteTask: (unitId: string, taskId: string) => void;
  onEditTitle: (unitId: string, currentTitle: string) => void;
  onAddUnit: () => void;
  onDeleteUnit: (unitId: string) => void;
}

export function UnitGrid({ units, onReorder, onToggleTask, onAddTask, onDeleteTask, onEditTitle, onAddUnit, onDeleteUnit }: UnitGridProps) {
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="units" direction="horizontal">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {units.map((unit, index) => (
              <UnitCard 
                key={unit.id} 
                unit={unit} 
                index={index}
                onToggleTask={onToggleTask}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
                onEditTitle={onEditTitle}
                onDeleteUnit={onDeleteUnit}
              />
            ))}
            {provided.placeholder}

            {/* Add Unit Button */}
            <button 
                onClick={onAddUnit}
                className="bg-[#1e272b] p-6 rounded-xl border-2 border-dashed border-[#37464a] flex flex-col items-center justify-center text-gray-500 hover:text-[#ff8154] hover:border-[#ff8154] transition-all group min-h-[300px]"
             >
                <Plus size={40} className="mb-2 group-hover:scale-110 transition-transform"/>
                <span className="font-bold uppercase tracking-wider">Add Unit</span>
             </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

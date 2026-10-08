import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Hurdle } from "@/types";
import { HurdleCard } from "./HurdleCard";

interface HurdleSortableProps {
  hurdle: Hurdle;
  index: number;
  count: number;
  locked: boolean;
}

export function HurdleSortable({ hurdle, index, count, locked }: HurdleSortableProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: hurdle.id,
    disabled: locked,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? "relative z-10 opacity-80" : undefined}
    >
      <HurdleCard
        hurdle={hurdle}
        index={index}
        count={count}
        locked={locked}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  );
}

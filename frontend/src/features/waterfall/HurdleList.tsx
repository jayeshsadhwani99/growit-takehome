import { useMemo, useRef } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { EmptyState } from "@/components";
import { placeHurdle } from "@/store/features/hurdles";
import { useAppDispatch } from "@/store/hooks";
import type { Hurdle } from "@/types";
import { HurdleSortable } from "./HurdleSortable";
import { OverflowArrow } from "./OverflowArrow";
import { restrictHurdleDrag } from "./restrictHurdleDrag";
import { UndistributedBox } from "./UndistributedBox";
import { verticalKeyboardCoordinates } from "./verticalKeyboardCoordinates";

export function HurdleList({ hurdles, locked }: { hurdles: Hurdle[]; locked: boolean }) {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);
  const modifiers = useMemo(() => [restrictHurdleDrag(listRef)], []);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: verticalKeyboardCoordinates }),
  );

  function onDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const to = hurdles.findIndex((item) => item.id === over.id);
    if (to >= 0) dispatch(placeHurdle(String(active.id), to));
  }

  if (hurdles.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <EmptyState
          title="No hurdles yet"
          description="Add a preferred return or a return of capital. You can add the same kind more than once."
        />
        <UndistributedBox />
      </div>
    );
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        modifiers={modifiers}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={hurdles.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div ref={listRef}>
            {hurdles.map((hurdle, index) => (
              <div key={hurdle.id}>
                <HurdleSortable hurdle={hurdle} index={index} count={hurdles.length} locked={locked} />
                {index < hurdles.length - 1 ? <OverflowArrow /> : null}
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <UndistributedBox />
    </div>
  );
}

import type { Modifier } from "@dnd-kit/core";

type DragTransform = Parameters<Modifier>[0]["transform"];
type DragRect = Parameters<Modifier>[0]["draggingNodeRect"];

/** Stay on the vertical axis, and stay inside the hurdle list. */
export function restrictHurdleDrag(
  transform: DragTransform,
  draggingNodeRect: DragRect,
  list: HTMLElement | null,
): DragTransform {
  const next = { ...transform, x: 0 };
  if (!list || !draggingNodeRect) return next;
  const bounds = list.getBoundingClientRect();
  const minY = bounds.top - draggingNodeRect.top;
  const maxY = bounds.bottom - draggingNodeRect.bottom;
  next.y = Math.min(Math.max(transform.y, minY), maxY);
  return next;
}

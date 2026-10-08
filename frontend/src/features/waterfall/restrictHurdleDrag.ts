import type { Modifier } from "@dnd-kit/core";
import type { RefObject } from "react";

/** Stay on the vertical axis, and stay inside the hurdle list. */
export function restrictHurdleDrag(listRef: RefObject<HTMLElement | null>): Modifier {
  return ({ transform, draggingNodeRect }) => {
    const next = { ...transform, x: 0 };
    const list = listRef.current;
    if (!list || !draggingNodeRect) return next;
    const bounds = list.getBoundingClientRect();
    const minY = bounds.top - draggingNodeRect.top;
    const maxY = bounds.bottom - draggingNodeRect.bottom;
    next.y = Math.min(Math.max(transform.y, minY), maxY);
    return next;
  };
}

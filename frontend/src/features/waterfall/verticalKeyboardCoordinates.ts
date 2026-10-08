import type { KeyboardCoordinateGetter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/** Up and down only. Left and right do not start a sideways move. */
export const verticalKeyboardCoordinates: KeyboardCoordinateGetter = (event, args) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") return undefined;
  return sortableKeyboardCoordinates(event, args);
};

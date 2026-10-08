import type { AppThunk } from "@/store/hooks";
import { hurdleMoved } from "../hurdlesSlice";
import { selectHurdlesLocked } from "../selectors/selectHurdlesLocked";

export const moveHurdle =
  (id: string, direction: "up" | "down"): AppThunk =>
  (dispatch, getState) => {
    if (selectHurdlesLocked(getState())) return;
    dispatch(hurdleMoved({ id, direction }));
  };

import type { AppThunk } from "@/store/hooks";
import { hurdleRemoved } from "../hurdlesSlice";
import { selectHurdlesLocked } from "../selectors/selectHurdlesLocked";

export const removeHurdle =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    if (selectHurdlesLocked(getState())) return;
    dispatch(hurdleRemoved(id));
  };

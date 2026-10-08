import type { AppThunk } from "@/store/hooks";
import { hurdlePlaced } from "../hurdlesSlice";
import { selectHurdlesLocked } from "../selectors/selectHurdlesLocked";

export const placeHurdle =
  (id: string, to: number): AppThunk =>
  (dispatch, getState) => {
    if (selectHurdlesLocked(getState())) return;
    dispatch(hurdlePlaced({ id, to }));
  };

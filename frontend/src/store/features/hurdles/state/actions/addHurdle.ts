import type { Hurdle } from "@/types";
import type { AppThunk } from "@/store/hooks";
import { hurdleAdded } from "../hurdlesSlice";
import { selectHurdlesLocked } from "../selectors/selectHurdlesLocked";

export const addHurdle =
  (hurdle: Hurdle): AppThunk =>
  (dispatch, getState) => {
    if (selectHurdlesLocked(getState())) return;
    dispatch(hurdleAdded(hurdle));
  };

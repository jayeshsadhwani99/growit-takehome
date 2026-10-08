import type { AppThunk } from "@/store/hooks";
import { prefRateSet } from "../hurdlesSlice";
import { selectHurdlesLocked } from "../selectors/selectHurdlesLocked";

export const setPrefRate =
  (id: string, rate: number): AppThunk =>
  (dispatch, getState) => {
    if (selectHurdlesLocked(getState())) return;
    dispatch(prefRateSet({ id, rate }));
  };

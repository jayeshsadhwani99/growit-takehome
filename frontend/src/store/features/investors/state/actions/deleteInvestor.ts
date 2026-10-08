import type { AppThunk } from "@/store/hooks";
import { investorHasPayouts } from "@/utils/investorHasPayouts";
import { investorRemoved } from "../investorsSlice";

/** Past payouts name this investor. Deleting the row would orphan that history. */
export const deleteInvestor =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    if (investorHasPayouts(getState().runs.items, id)) return;
    dispatch(investorRemoved(id));
  };

import type { Investor } from "@/types";
import type { AppThunk } from "@/store/hooks";
import { investorHasPayouts } from "@/utils";
import { investorUpdated } from "../investorsSlice";

/** Same lock as delete: a paid investor's name, amount, and date stay put. */
export const saveInvestor =
  (investor: Investor): AppThunk =>
  (dispatch, getState) => {
    if (investorHasPayouts(getState().runs.items, investor.id)) return;
    dispatch(investorUpdated(investor));
  };

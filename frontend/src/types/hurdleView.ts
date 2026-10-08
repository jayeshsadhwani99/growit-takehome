/** How a saved run looks against one hurdle. Owed is null when the run didn't store it. */
export type HurdleStatus = "filled" | "partial" | "not-reached";

export interface InvestorShare {
  investorId: string;
  owed: number;
  paid: number;
}

export interface HurdleView {
  hurdleId: string;
  paid: number;
  owed: number | null;
  status: HurdleStatus;
  /** 0–100. Null when we would be guessing the unpaid portion. */
  progress: number | null;
  shares: InvestorShare[];
}

/**
 * One step in the deal's single waterfall.
 * `rate` is an annual percent: 8 means 8%, not 0.08.
 */
export type Hurdle =
  | { id: string; type: "pref"; rate: number }
  | { id: string; type: "roc" };

export type HurdleType = Hurdle["type"];

import { describe, expect, it } from "vitest";
import { hurdleAdded, hurdleMoved, hurdlePlaced, hurdlesReducer } from "./hurdlesSlice";

describe("hurdlesReducer", () => {
  it("moves a hurdle up without dropping the others", () => {
    const start = hurdlesReducer(undefined, { type: "unknown" });
    const withTwo = [hurdleAdded({ id: "a", type: "roc" }), hurdleAdded({ id: "b", type: "pref", rate: 8 })].reduce(
      hurdlesReducer,
      start,
    );
    const moved = hurdlesReducer(withTwo, hurdleMoved({ id: "b", direction: "up" }));
    expect(moved.map((hurdle) => hurdle.id)).toEqual(["b", "a"]);
  });

  it("places a hurdle at an index", () => {
    const start = hurdlesReducer(undefined, { type: "unknown" });
    const withThree = [
      hurdleAdded({ id: "a", type: "roc" }),
      hurdleAdded({ id: "b", type: "pref", rate: 8 }),
      hurdleAdded({ id: "c", type: "roc" }),
    ].reduce(hurdlesReducer, start);
    const placed = hurdlesReducer(withThree, hurdlePlaced({ id: "a", to: 2 }));
    expect(placed.map((hurdle) => hurdle.id)).toEqual(["b", "c", "a"]);
  });
});

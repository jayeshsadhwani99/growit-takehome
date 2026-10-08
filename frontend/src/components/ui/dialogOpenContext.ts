import { createContext } from "react";

/** Controlled open flag, so the panel can finish its exit before unmounting. */
export const DialogOpenContext = createContext(false);

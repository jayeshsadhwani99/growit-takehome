import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { PERSIST_KEY } from "@/constants";
import { browserStorage } from "./browserStorage";
import { hurdlesReducer } from "./features/hurdles";
import { investorsReducer } from "./features/investors";
import { runsReducer } from "./features/runs";

const dealReducer = combineReducers({
  investors: investorsReducer,
  hurdles: hurdlesReducer,
  runs: runsReducer,
});

const persistedReducer = persistReducer({ key: PERSIST_KEY, storage: browserStorage }, dealReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

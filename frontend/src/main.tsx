import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App";
import { persistor, store } from "./store";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element missing");

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p className="p-6 text-sm text-muted">Loading saved deal…</p>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);

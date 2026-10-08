/**
 * redux-persist's bundled localStorage engine breaks under Vite's import
 * interop (`getItem is not a function`), which leaves the app blank.
 */
export const browserStorage = {
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem(key: string, value: string): Promise<void> {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem(key: string): Promise<void> {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

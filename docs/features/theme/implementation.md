# Theme — how

| Piece | File |
| --- | --- |
| Slice | `src/store/features/theme/state/themeSlice.ts` |
| Selector | `state/selectors/selectTheme.ts` |
| Class on `html` | `src/components/ThemeSync/ThemeSync.tsx` |
| Choice | `src/components/ThemeToggle/ThemeToggle.tsx` |
| Phone bar | `src/components/PhoneBar/PhoneBar.tsx` |
| Tokens | `src/index.css`, `src/styles/dark.css` |

`theme` is `"system"`, `"light"`, or `"dark"` on the root reducer, so
redux-persist writes it with the deal. A short script in `index.html` reads
that entry before paint. System uses `prefers-color-scheme`.

`ThemeSync` repeats the class after rehydration, after a choice, and when the
system setting changes while System is selected.
Portals (dialogs, the date menu) sit outside the app shell, so the class has
to be on `html`, not on a wrapper.

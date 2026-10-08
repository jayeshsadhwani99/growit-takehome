# Folder structure

One function or component per file. Max 100 lines. Every folder has an
`index.ts` barrel.

```
frontend/src
  main.tsx              providers only
  App.tsx               routes only
  types/                one domain type per file
  constants/            one constant per file
  utils/                one pure function per file, plus its test
  engine/               pure functions, no React
  store/
    index.ts            store + redux-persist
    hooks.ts            typed dispatch, selector, thunk
    features/<feature>/
      state/
        initialState.ts
        <feature>Slice.ts
        selectors/      one selector per file
        actions/        one thunk per file, when a reducer is not enough
      index.ts
  components/           shared chrome and controls
    ui/                 button, input, select, card
    <Component>/        component file + index.ts
  features/<feature>/   one screen, split into the pieces that screen owns
```

## Rules of thumb

1. Pages compose. Validation, money, and hurdle status live in `utils/`.
2. A slice reducer changes state. A thunk is only there to refuse an edit the
   reducer cannot see (a paid investor, a locked waterfall).
3. Import from `@/components`, `@/store/features/investors`, `@/utils`,
   `@/types`. Inside a folder, import the sibling file, not the barrel.
4. If a file crosses 100 lines, pull out a component or a function.

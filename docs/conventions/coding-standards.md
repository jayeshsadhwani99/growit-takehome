# Coding standards

## Files

- One function, component, selector, or thunk per file. Max 100 lines.
- `camelCase.ts` for functions, `PascalCase.tsx` for components, `kebab-case`
  for docs.
- Barrels are `index.ts`. Outside code imports the barrel.

## Comments

Write why a rule exists. Skip comments that restate the next line.

```ts
// BAD: filter out the investor
// GOOD: a paid investor is part of history — deleting the row orphans payouts
```

## TypeScript

- `strict` is on. No `any`.
- Dates crossing a function boundary are `YYYY-MM-DD`.
- Import types with `import type` (`verbatimModuleSyntax` is on).

## UI

- Real `label`, `button`, `table`, `progress`. Native `select` and `input`.
- Tailwind only. Tokens are in `frontend/src/index.css` (`bg-surface`,
  `text-accent`, `bg-background`).
- Money goes through `formatMoney`. Tables right-align the cell and render
  `Money`.
- Buttons and inputs use `min-h-11` (44px).

## Tests

Pure functions and reducers have Vitest tests next to the file. The engine
case in `runDistribution.test.ts` stays skipped until the function exists.
No network and no `localStorage` in tests.

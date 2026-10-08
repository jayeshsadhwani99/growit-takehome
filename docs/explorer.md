# Documentation explorer

1. [`../CLAUDE.md`](../CLAUDE.md) — rules for any agent working here
2. [`architecture/assumptions.md`](./architecture/assumptions.md) — choices a reviewer will ask about
3. [`architecture/state.md`](./architecture/state.md) — what is stored, and what is locked

## Architecture

| File | Contents |
| --- | --- |
| [`architecture/folder-structure.md`](./architecture/folder-structure.md) | Where a new file goes |
| [`architecture/state.md`](./architecture/state.md) | Redux shape, persistence, edit locks |
| [`architecture/assumptions.md`](./architecture/assumptions.md) | Money, dates, rate, owed |

## Conventions

| File | Contents |
| --- | --- |
| [`conventions/coding-standards.md`](./conventions/coding-standards.md) | File size, barrels, comments |

## Features

Each feature has `feature.md` (why) and `implementation.md` (where the code is).

| Feature | Status |
| --- | --- |
| [`features/investors/`](./features/investors) | UI done |
| [`features/waterfall/`](./features/waterfall) | UI done |
| [`features/distribution/`](./features/distribution) | UI done, engine stubbed |
| [`features/theme/`](./features/theme) | System, light, or dark, stored with the deal |
| [`features/motion/`](./features/motion) | Page, dialog, and theme motion |
| [`features/engine/`](./features/engine) | `yearFraction` done, `runDistribution` not started |

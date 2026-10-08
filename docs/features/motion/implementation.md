# Motion — how

| Piece | File |
| --- | --- |
| Page fade | `src/components/PageTransition/PageTransition.tsx` |
| Dialog | `src/components/ui/DialogContent.tsx` |
| Theme fade | `src/components/ThemeTransition/ThemeTransition.tsx` |
| Color ease | `src/styles/dark.css` |

Each screen is its own chunk. `*PageSuspense.tsx` loads it with `React.lazy`
and renders `*PageSkeleton.tsx` as the Suspense fallback. The skeleton is its
own file so the fallback is on screen before that chunk arrives.

`PageTransition` owns the route table's location. The leaving page has to stay
mounted until the fade ends, which is why the routes render inside it.

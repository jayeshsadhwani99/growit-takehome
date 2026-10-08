# Theme — why

The deal is the same data in either theme. The choice is which is easier to
read, and it should still be that way after a reload.

## Rules

- The choices are System, Light, and Dark. System is the default, and it
  follows the operating system. Light and Dark stay put when the system changes.
- Tokens flip with that class. Surfaces stay `bg-surface`, the page stays
  `bg-background`, hovers stay `bg-wash`.
- Each choice shows an icon beside the label, in the closed control and in
  the menu.
- The control sits at the bottom of the sidebar. On a phone the sidebar is
  gone, so the same control is on the top bar.
- The choice is part of the persisted store, so it shares the deal's
  `localStorage` entry.

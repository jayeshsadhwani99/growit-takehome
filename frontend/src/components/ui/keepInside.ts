type DismissEvent = { target: EventTarget | null; preventDefault: () => void };

/** The calendar and its menus are portaled, so using them must not dismiss the dialog. */
export function keepInside(selector: string): (event: DismissEvent) => void {
  return (event) => {
    if (event.target instanceof Element && event.target.closest(selector)) event.preventDefault();
  };
}

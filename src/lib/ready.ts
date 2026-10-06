// Tiny signal fired once the preloader has finished, so intro
// animations start when the page is actually visible.
let ready = false;
const listeners = new Set<() => void>();

export function setReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onReady(fn: () => void) {
  if (ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

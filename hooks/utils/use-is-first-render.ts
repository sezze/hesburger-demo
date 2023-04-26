import { useRef } from "react";
import { useForceRerender } from "./use-force-rerender";

export function useIsFirstRender(rerenderOnFirst: boolean) {
  const forceRerender = useForceRerender();
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    if (rerenderOnFirst) {
      setTimeout(() => {
        forceRerender();
      }, 1);
    }
    return true;
  }

  return false;
}

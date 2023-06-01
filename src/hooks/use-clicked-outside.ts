import { RefObject, useEffect } from "react";

function assertIsNode(event: EventTarget | null): asserts event is Node {
  if (!event || !("nodeType" in event)) {
    throw new Error("Node expected");
  }
}

/**
 * Registers a "mousedown" event listener and calls the provided callback
 * function when a click occurs outside of the provided ref element.
 *
 * @param ref - The DOM element that needs to watch for outside clicks.
 * @param callback - Called following a click outside of the ref element.
 * @param willReg - When truthy, the event listener will be registered.
 */
export default function useClickedOutside(
  ref: RefObject<HTMLDivElement> | null,
  callback: CallableFunction,
  willReg: any = true
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      assertIsNode(event.target);
      if (ref?.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    if (willReg !== undefined && willReg !== null && willReg != false) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, willReg]);
}

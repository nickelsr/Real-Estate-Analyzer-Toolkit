import { RefObject, useEffect } from "react";

function assertIsNode(event: EventTarget | null): asserts event is Node {
  if (!event || !("nodeType" in event)) {
    throw new Error("Node expected");
  }
}

export default function useClickedOutside(
  ref: RefObject<HTMLDivElement> | null,
  dependency: any,
  callback: CallableFunction
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      assertIsNode(event.target);
      if (ref?.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    if (
      dependency !== undefined &&
      dependency !== null &&
      dependency != false
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dependency]);
}

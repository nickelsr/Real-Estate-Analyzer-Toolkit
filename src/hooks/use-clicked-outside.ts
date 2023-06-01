import { RefObject, useEffect } from "react";

function assertIsNode(event: EventTarget | null): asserts event is Node {
  if (!event || !("nodeType" in event)) {
    throw new Error("Node expected");
  }
}

interface useClickedOutsideProps {
  /**
   * A ref to the DOM element that the click event target will be tested
   * against.
   */
  ref: RefObject<HTMLDivElement> | null;

  /**
   * When truthy, signals the hook to add the event listener.
   * Defaults to true (adds the event listener immediately).
   */
  dependency?: any;

  /**
   * Called when the event listener is active and the "Escape" key is pressed.
   */
  callback: CallableFunction;
}

export default function useClickedOutside({
  ref,
  dependency = true,
  callback,
}: useClickedOutsideProps) {
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

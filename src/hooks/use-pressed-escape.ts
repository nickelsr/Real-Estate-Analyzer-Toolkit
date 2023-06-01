import { useEffect } from "react";

/**
 * Registers a "keyup" event listener and calls the provided callback function
 * in reponse to an "Escape" key stroke.
 *
 * @param callback - A function, called following an "Escape" key stroke.
 * @param willMount  When truthy, signals the hook to register the event listener
 */
export default function usePressedEscape(
  callback: CallableFunction,
  willMount: any = true
) {
  useEffect(() => {
    function handlePressedKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }

    if (willMount !== undefined && willMount !== null && willMount != false) {
      document.addEventListener("keyup", handlePressedKey);
    }

    return () => {
      document.removeEventListener("keyup", handlePressedKey);
    };
  }, [willMount]);
}

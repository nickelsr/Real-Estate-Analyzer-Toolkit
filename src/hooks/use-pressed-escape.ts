import { useEffect } from "react";

interface usePressedEscapeProps {
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

export default function usePressedEscape({
  dependency = true,
  callback,
}: usePressedEscapeProps) {
  useEffect(() => {
    function handlePressedKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }

    if (
      dependency !== undefined &&
      dependency !== null &&
      dependency != false
    ) {
      document.addEventListener("keyup", handlePressedKey);
    }

    return () => {
      document.removeEventListener("keyup", handlePressedKey);
    };
  }, [dependency]);
}

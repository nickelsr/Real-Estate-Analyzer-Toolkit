import { useEffect } from "react";

export default function usePressedEscape(
  dependency: any,
  callback: CallableFunction
) {
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

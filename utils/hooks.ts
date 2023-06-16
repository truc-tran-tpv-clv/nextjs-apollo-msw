import { useEffect, useState } from "react";

/**
 * Custom useDebounce hook
 * @param value any
 * @param timeout in ms
 */
export function useDebounce<T = unknown>(value: T, timeout = 300) {
  const [debounceValue, setDebounceValue] = useState<T>();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebounceValue(value);
    }, timeout);

    return () => clearTimeout(debounceTimeout);
  }, [value, timeout]);

  return debounceValue;
}

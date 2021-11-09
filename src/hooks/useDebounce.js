import { useState, useEffect } from "react"
export const useDebounceValue = function<T>(defaultValue: T, delay: number): T  {
  const [value, setValue] = useState(defaultValue);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(defaultValue);
    }, delay);
  
    return () => {
      clearTimeout(handler);
    }
  }, [defaultValue, delay]);
  
  return value;
}

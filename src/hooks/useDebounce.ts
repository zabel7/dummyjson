import { useCallback, useRef } from 'react';

/**
 * Custom hook to debounce a callback function.
 * @param {function} callback - Callback function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {Array} deps - Dependencies to watch for
 * @returns {function} - Debounced callback function
 */
const useDebounce = <T extends (...args: unknown[]) => void>(callback: T, delay = 500): T => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay],
    );



    return debounced as T;
};

export default useDebounce;
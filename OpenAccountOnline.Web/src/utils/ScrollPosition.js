/**
 * React hook that returns the browser viewpoint X and Y scroll position
 * Slimed version of Reference
 * Reference: https://github.com/n8tb1t/use-scroll-position
 */

/* --- Imports --- */
import { useRef, useLayoutEffect } from 'react';

// Check for browser
const isBrowser = typeof window !== `undefined`;

/**
 * Gets the scroll position of the current window
 */
function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 };

  const position = document.body.getBoundingClientRect();

  return { x: position.left, y: position.top };
}

/**
 * Creates react hook for scroll position
 * @param {function} callback function used for as callback
 */
export default function useScrollPosition(callback) {
  const position = useRef(getScrollPosition());

  const handleScroll = () => {
    const currPos = getScrollPosition();
    callback({ prevPos: position.current, currPos });
  };

  useLayoutEffect(() => {
    if (!isBrowser) {
      return;
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
}

"use client";
import { useEffect } from "react";

/**
 * Mounts on the home page only.
 * Adds overflow:hidden to <body> so users can't scroll past the
 * fixed snap-container and see the footer.
 * Cleans up on unmount (when navigating away) so other pages work normally.
 */
export default function BodyScrollLock() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return null; // renders nothing
}

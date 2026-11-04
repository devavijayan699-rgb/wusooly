"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./TransitionProvider";

export default function TransitionLink({
  href,
  children,
  onClick,
  target,
  rel,
  ...props
}) {
  const { navigate, isTransitioning } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e) => {
    // Call custom onClick if provided
    if (typeof onClick === "function") {
      onClick(e);
    }

    // Ignore if already transitioning
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    // Ignore modified clicks (Ctrl+click, Cmd+click, middle click) or external targets
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      target === "_blank"
    ) {
      return;
    }

    // Handle pure anchor links or hash jumps on current page
    if (typeof href === "string") {
      const isSamePage =
        href.startsWith("#") ||
        (href.startsWith("/#") && pathname === "/") ||
        (href.includes("#") && href.split("#")[0] === pathname);

      if (isSamePage) {
        e.preventDefault();
        const hash = href.split("#")[1];
        if (hash) {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${hash}`);
          }
        }
        return;
      }

      if (href === pathname) {
        e.preventDefault();
        return;
      }
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} target={target} rel={rel} {...props}>
      {children}
    </Link>
  );
}


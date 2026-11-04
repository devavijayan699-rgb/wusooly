"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "./SmoothScroll";

export default function TransitionLink({
  href,
  children,
  onClick,
  target,
  rel,
  ...props
}) {
  const pathname = usePathname();
  const { lenis } = useSmoothScroll();

  const handleClick = (e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }

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

    // Intercept same-page hash jumps to scroll smoothly via Lenis
    if (typeof href === "string") {
      const isSamePageHash =
        href.startsWith("#") ||
        (href.startsWith("/#") && pathname === "/") ||
        (href.includes("#") && href.split("#")[0] === pathname);

      if (isSamePageHash) {
        e.preventDefault();
        const hash = href.split("#")[1];
        if (hash) {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            if (lenis) {
              lenis.scrollTo(targetEl, { offset: -60, duration: 1.1 });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
            window.history.pushState(null, "", `#${hash}`);
          }
        }
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick} target={target} rel={rel} {...props}>
      {children}
    </Link>
  );
}

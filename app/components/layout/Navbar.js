"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ShoppingBag, Coffee } from "lucide-react";
import TransitionLink from "./TransitionLink";
import Magnetic from "../ui/Magnetic";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import styles from "./Navbar.module.css";

const SOLUTIONS_ITEMS = [
  {
    href: "/solutions#retail",
    title: "Shops & Supermarkets",
    desc: "High-speed barcode checkout & inventory",
    Icon: ShoppingBag,
  },
  {
    href: "/solutions#cafe",
    title: "Cafes & Restaurants",
    desc: "Kitchen printing, table & shift billing",
    Icon: Coffee,
  },
];

const NAV_LINKS = [
  { href: "/pricing", label: "Pricing", mobileLabel: "Pricing", matchPath: true },
  { href: "/#download", label: "Download", mobileLabel: "Download App", matchPath: false },
  { href: "/about", label: "About", mobileLabel: "About", matchPath: true },
  { href: "/contact", label: "Contact", mobileLabel: "Contact", matchPath: true },
];

export default function Navbar({ onGetDemo, variant, initialOpen = false }) {
  const [solutionsOpen, setSolutionsOpen] = useState(initialOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavState, setMobileNavState] = useState("top"); // "top" | "floating-hidden" | "floating-visible"
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const mobileMenuOpenRef = useRef(mobileMenuOpen);
  mobileMenuOpenRef.current = mobileMenuOpen;
  const pathname = usePathname();
  const isSolidNavbar =
    variant === "contact" ||
    variant === "solutions" ||
    variant === "about" ||
    variant === "pricing" ||
    (Boolean(pathname) && pathname !== "/");

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setMobileNavState("top");
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSolutionsOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSolutionsOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Smart Nav Show/Hide on Scroll Direction (Desktop + Mobile Scroll-Up Pill)
  useEffect(() => {
    if (typeof window === "undefined" || !navRef.current) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMq = window.matchMedia("(max-width: 768px)");

    let st;
    let showAnim;
    if (isFinePointer && !isReduced && !mobileMq.matches) {
      showAnim = gsap
        .from(navRef.current, {
          yPercent: -120,
          paused: true,
          duration: 0.35,
          ease: "power2.out",
        })
        .progress(1);

      st = ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play();
          } else if (self.scroll() > 140) {
            showAnim.reverse();
          }
        },
      });
    }

    // Mobile touch scroll-up reveal controller with cumulative direction hysteresis
    let lastY = window.scrollY;
    let accumDelta = 0;
    let rafId = null;

    const updateMobileDock = () => {
      rafId = null;
      if (!mobileMq.matches) {
        setMobileNavState("top");
        lastY = window.scrollY;
        accumDelta = 0;
        return;
      }

      const y = Math.max(0, window.scrollY);
      const step = y - lastY;
      lastY = y;

      if (y <= 24) {
        accumDelta = 0;
        setMobileNavState("top");
        return;
      }

      if (mobileMenuOpenRef.current) {
        accumDelta = 0;
        setMobileNavState((prev) => (prev === "top" && y <= 110 ? "top" : "floating-visible"));
        return;
      }

      if ((step > 0 && accumDelta < 0) || (step < 0 && accumDelta > 0)) {
        accumDelta = step;
      } else {
        accumDelta += step;
      }

      const doc = document.documentElement;
      const nearBottom = y + window.innerHeight >= doc.scrollHeight - 24;

      setMobileNavState((prev) => {
        if (y <= 110) {
          return prev === "floating-visible" ? "floating-visible" : "top";
        }
        if (accumDelta <= -10 && !nearBottom) {
          accumDelta = 0;
          return "floating-visible";
        }
        if (accumDelta >= 12 || prev === "top") {
          accumDelta = 0;
          return "floating-hidden";
        }
        return prev;
      });
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateMobileDock);
      }
    };

    const onMediaChange = () => {
      if (!mobileMq.matches) {
        setMobileNavState("top");
      } else {
        lastY = window.scrollY;
        updateMobileDock();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mobileMq.addEventListener("change", onMediaChange);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      mobileMq.removeEventListener("change", onMediaChange);
      st?.kill();
      showAnim?.kill();
    };
  }, []);

  const handleLinkClick = () => {
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    handleLinkClick();
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    window.scrollTo(0, 0);
    window.location.assign("/");
  };

  const dockClass = [
    styles.navDock,
    mobileNavState !== "top" ? styles.navDockFloating : "",
    mobileNavState === "floating-hidden" ? styles.navDockHidden : "",
    mobileNavState === "floating-visible" ? styles.navDockVisible : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={styles.navbarWrapper} ref={navRef}>
      <div className={dockClass}>
        <nav
          className={`${styles.navbar} ${isSolidNavbar ? styles.navbarSolid : ""}`}
          aria-label="Main Navigation"
        >
        {/* Left: Brand Logo */}
        <a href="/" className={styles.brandLogo} aria-label="Wusooly POS Home" onClick={handleLogoClick}>
          <Image
            src="/brand/wusooly-logo-light.png"
            alt="Wusooly POS"
            width={116}
            height={26}
            priority
            className={styles.brandLogoImg}
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className={styles.navLinks}>
          {/* Solutions with Dropdown */}
          <div
            className={styles.dropdownContainer}
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <TransitionLink
              href="/solutions"
              className={`${styles.navItem} ${styles.dropdownTrigger} ${
                pathname === "/solutions" || solutionsOpen
                  ? styles.dropdownTriggerActive
                  : ""
              }`}
              onClick={handleLinkClick}
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`${styles.chevronIcon} ${solutionsOpen ? styles.chevronRotated : ""}`}
                size={14}
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </TransitionLink>

            {solutionsOpen && (
              <div
                className={`${styles.dropdownMenu} ${isSolidNavbar ? styles.dropdownSolid : ""}`}
                role="menu"
              >
                {SOLUTIONS_ITEMS.map(({ href, title, desc, Icon }) => (
                  <TransitionLink
                    key={href}
                    href={href}
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <div className={styles.dropdownItemContent}>
                      <div className={styles.dropdownIconBox}>
                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div className={styles.dropdownItemText}>
                        <span className={styles.dropdownItemTitle}>{title}</span>
                        <span className={styles.dropdownItemDesc}>{desc}</span>
                      </div>
                    </div>
                  </TransitionLink>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map(({ href, label, matchPath }) => (
            <TransitionLink
              key={href}
              href={href}
              className={`${styles.navItem} ${
                matchPath && pathname === href ? styles.dropdownTriggerActive : ""
              }`}
              onClick={handleLinkClick}
            >
              {label}
            </TransitionLink>
          ))}
        </div>

        {/* Right: Get a Demo Button & Mobile Menu Toggle */}
        <div className={styles.rightActions}>
          <Magnetic>
            <TransitionLink
              href="/contact"
              className={styles.getDemoBtn}
              onClick={(e) => {
                if (onGetDemo) {
                  e.preventDefault();
                  onGetDemo();
                }
                handleLinkClick();
              }}
            >
              Get a Demo
            </TransitionLink>
          </Magnetic>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barTopOpen : ""}`} />
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barMidOpen : ""}`} />
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barBotOpen : ""}`} />
          </button>
        </div>
      </nav>

      {/* Responsive Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${isSolidNavbar ? styles.mobileMenuSolid : ""}`} role="dialog" aria-modal="true">
          <div className={styles.mobileLinks}>
            {SOLUTIONS_ITEMS.map(({ href, title }) => (
              <a key={href} href={href} className={styles.mobileItem} onClick={handleLinkClick}>
                {title}
              </a>
            ))}
            <div className={styles.mobileDivider} />
            {NAV_LINKS.map(({ href, mobileLabel }) =>
              href.startsWith("/#") ? (
                <TransitionLink key={href} href={href} className={styles.mobileItem} onClick={handleLinkClick}>
                  {mobileLabel}
                </TransitionLink>
              ) : (
                <a key={href} href={href} className={styles.mobileItem} onClick={handleLinkClick}>
                  {mobileLabel}
                </a>
              )
            )}
            <div className={styles.mobileActionContainer}>
              <a
                href="/contact"
                className={styles.mobileDemoBtn}
                onClick={(e) => {
                  if (onGetDemo) {
                    e.preventDefault();
                    onGetDemo();
                  }
                  handleLinkClick();
                }}
              >
                Get a Demo
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}

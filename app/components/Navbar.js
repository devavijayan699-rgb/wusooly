"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./Navbar.module.css";

export default function Navbar({ onGetDemo, theme = "dark", variant, initialOpen = false }) {
  const [solutionsOpen, setSolutionsOpen] = useState(initialOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const pathname = usePathname();
  const isSageLiquid =
    variant === "contact" ||
    variant === "solutions" ||
    variant === "about" ||
    variant === "pricing" ||
    pathname === "/contact" ||
    pathname === "/solutions" ||
    pathname === "/about" ||
    pathname === "/pricing";

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

  // Smart Nav Show/Hide on Scroll Direction (Desktop only)
  useEffect(() => {
    if (typeof window === "undefined" || !navRef.current) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || isReduced) return;

    const showAnim = gsap
      .from(navRef.current, {
        yPercent: -120,
        paused: true,
        duration: 0.35,
        ease: "power2.out",
      })
      .progress(1);

    const st = ScrollTrigger.create({
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

    return () => {
      st.kill();
      showAnim.kill();
    };
  }, []);

  const handleLinkClick = () => {
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.navbarWrapper} ${theme === "light" ? styles.wrapperLight : ""}`} ref={navRef}>
      <nav
        className={`${styles.navbar} ${theme === "light" ? styles.navbarLight : ""} ${isSageLiquid ? styles.navbarContact : ""}`}
        aria-label="Main Navigation"
      >
        {/* Left: Brand Logo */}
        <TransitionLink href="/" className={styles.brandLogo} aria-label="Wusooly POS Home" onClick={handleLinkClick}>
          <Image
            src={theme === "light" ? "/assets/wusooly-brand-logo-dark.png" : "/assets/wusooly-brand-logo.png"}
            alt="Wusooly POS"
            width={116}
            height={26}
            priority
            className={styles.brandLogoImg}
          />
        </TransitionLink>

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
              <svg
                className={`${styles.chevronIcon} ${solutionsOpen ? styles.chevronRotated : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </TransitionLink>

            {solutionsOpen && (
              <div
                className={`${styles.dropdownMenu} ${isSageLiquid ? styles.dropdownContact : ""}`}
                role="menu"
              >
                <TransitionLink
                  href="/solutions#retail"
                  className={styles.dropdownItem}
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  <div className={styles.dropdownItemContent}>
                    <div className={styles.dropdownIconBox}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>
                    <div className={styles.dropdownItemText}>
                      <span className={styles.dropdownItemTitle}>Shops &amp; Supermarkets</span>
                      <span className={styles.dropdownItemDesc}>High-speed barcode checkout &amp; inventory</span>
                    </div>
                  </div>
                </TransitionLink>

                <TransitionLink
                  href="/solutions#cafe"
                  className={styles.dropdownItem}
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  <div className={styles.dropdownItemContent}>
                    <div className={styles.dropdownIconBox}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                        <line x1="6" y1="1" x2="6" y2="4" />
                        <line x1="10" y1="1" x2="10" y2="4" />
                        <line x1="14" y1="1" x2="14" y2="4" />
                      </svg>
                    </div>
                    <div className={styles.dropdownItemText}>
                      <span className={styles.dropdownItemTitle}>Cafés &amp; Restaurants</span>
                      <span className={styles.dropdownItemDesc}>Kitchen printing, table &amp; shift billing</span>
                    </div>
                  </div>
                </TransitionLink>
              </div>
            )}
          </div>

          <TransitionLink
            href="/pricing"
            className={`${styles.navItem} ${pathname === "/pricing" ? styles.dropdownTriggerActive : ""}`}
            onClick={handleLinkClick}
          >
            Pricing
          </TransitionLink>
          <TransitionLink href="/#download" className={styles.navItem} onClick={handleLinkClick}>
            Download
          </TransitionLink>
          <TransitionLink
            href="/about"
            className={`${styles.navItem} ${pathname === "/about" ? styles.dropdownTriggerActive : ""}`}
            onClick={handleLinkClick}
          >
            About
          </TransitionLink>
          <TransitionLink
            href="/contact"
            className={`${styles.navItem} ${pathname === "/contact" ? styles.dropdownTriggerActive : ""}`}
            onClick={handleLinkClick}
          >
            Contact
          </TransitionLink>
        </div>

        {/* Right: Get a Demo Button & Mobile Menu Toggle */}
        <div className={styles.rightActions}>
          <Magnetic strength={0.35} maxDisplacement={10}>
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
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <div className={styles.mobileLinks}>
            <a
              href="/solutions"
              className={styles.mobileCategoryTitle}
              onClick={handleLinkClick}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}
            >
              <span>Solutions</span>
              <span style={{ fontSize: "0.82rem", opacity: 0.75 }}>View all &rarr;</span>
            </a>
            <a href="/solutions#retail" className={styles.mobileItem} onClick={handleLinkClick}>
              Shops & Supermarkets
            </a>
            <a href="/solutions#cafe" className={styles.mobileItem} onClick={handleLinkClick}>
              Cafés & Restaurants
            </a>
            <div className={styles.mobileDivider} />
            <a href="/pricing" className={styles.mobileItem} onClick={handleLinkClick}>
              Pricing
            </a>
            <TransitionLink href="/#download" className={styles.mobileItem} onClick={handleLinkClick}>
              Download App
            </TransitionLink>
            <a href="/about" className={styles.mobileItem} onClick={handleLinkClick}>
              About
            </a>
            <a href="/contact" className={styles.mobileItem} onClick={handleLinkClick}>
              Contact
            </a>
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
    </header>
  );
}

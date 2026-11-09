"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ShoppingBag, Coffee, ArrowRight } from "lucide-react";
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
              <ChevronDown
                className={`${styles.chevronIcon} ${solutionsOpen ? styles.chevronRotated : ""}`}
                size={14}
                strokeWidth={2.5}
                aria-hidden="true"
              />
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
                      <ShoppingBag size={18} strokeWidth={2} aria-hidden="true" />
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
                      <Coffee size={18} strokeWidth={2} aria-hidden="true" />
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
              <span style={{ fontSize: "0.82rem", opacity: 0.75, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                View all
                <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" />
              </span>
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

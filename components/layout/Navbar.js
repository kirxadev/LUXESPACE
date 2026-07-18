"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const mobileTl = useRef(null);

  // Only use light (white) text on pages that have a dark hero image behind the navbar
  const darkHeroPages = ["/about", "/services", "/portfolio", "/contact", "/projects"];
  const hasDarkHero = darkHeroPages.includes(pathname);
  const useLightText = hasDarkHero && !isScrolled;

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check immediately on mount and route change
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Mobile Menu GSAP Animation
  const openMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    
    requestAnimationFrame(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.fromTo(mobileMenuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" }
      )
      .fromTo(mobileLinksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
        "-=0.3"
      );

      mobileTl.current = tl;
    });
  }, []);

  const closeMenu = useCallback(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: () => setIsMobileMenuOpen(false)
    });

    tl.to(mobileLinksRef.current, {
      y: -30, opacity: 0, duration: 0.3, stagger: 0.03
    })
    .to(mobileMenuRef.current, {
      clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut"
    }, "-=0.15");
  }, []);

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <>
      {/* ─── Floating Navigation ─── */}
      <header
        role="banner"
        aria-label="Main Navigation"
        className={`
          fixed top-0 left-0 z-50
          ${pathname === "/" && !isScrolled ? "right-auto w-full md:w-[50%]" : "right-0 w-full"}
          ${isScrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/50"
            : "bg-transparent border-b border-transparent"
          }
        `}
        style={{ transitionProperty: 'background-color, border-color, backdrop-filter', transitionDuration: '500ms', transitionTimingFunction: 'ease-out' }}
      >
        <div className={`
          max-w-[1440px] mx-auto w-full h-[88px] flex items-center justify-between relative
          ${pathname === "/" && !isScrolled ? "px-6 md:px-10 lg:pl-32 xl:pl-40 lg:pr-16" : "px-6 md:px-12 lg:px-20"}
        `}>
          
          {/* ─── Logo (Left) ─── */}
          <div className="flex shrink-0">
            <Link
              href="/"
              aria-label="LuxeSpace Interiors – Home"
              className="group relative z-50 flex items-center"
            >
              <span className={`font-serif uppercase tracking-[0.2em] text-xl transition-colors duration-300 ${useLightText ? "text-white" : "text-heading"}`}>
                LUXESPACE
              </span>
            </Link>
          </div>

          {/* ─── Navigation Links (Center) ─── */}
          <nav
            role="navigation"
            aria-label="Primary"
            className="hidden lg:flex items-center gap-16 lg:gap-24 xl:gap-32 absolute left-1/2 -translate-x-1/2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative font-sans text-[15px] font-medium tracking-wide
                    transition-colors duration-300 py-2
                    group
                    ${isActive
                      ? (useLightText ? "text-white" : "text-heading")
                      : (useLightText ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-heading")
                    }
                  `}
                >
                  {link.label}
                  
                  {/* Elegant Thin Underline (Active & Hover) */}
                  <span className={`
                    absolute bottom-0 left-0 h-[1px] 
                    transition-all duration-500 ease-out origin-left
                    ${isActive
                      ? (useLightText ? "w-full bg-white" : "w-full bg-heading")
                      : (useLightText ? "w-0 bg-white/50 group-hover:w-full" : "w-0 bg-heading/50 group-hover:w-full")
                    }
                  `} />
                </Link>
              );
            })}
          </nav>

          {/* ─── Mobile Hamburger (Right aligned on mobile) ─── */}
          <div className="flex lg:hidden justify-end ml-auto">
            <button
              onClick={toggleMenu}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMobileMenuOpen}
              className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            >
              <span className={`
                block h-[1.5px] w-6 rounded-full transition-all duration-500 origin-center
                ${isMobileMenuOpen
                  ? "rotate-45 translate-y-[3.75px] bg-background"
                  : (useLightText ? "bg-white" : "bg-heading")
                }
              `} />
              <span className={`
                block h-[1.5px] w-6 rounded-full transition-all duration-500 origin-center
                ${isMobileMenuOpen
                  ? "-rotate-45 -translate-y-[3.75px] bg-background"
                  : (useLightText ? "bg-white" : "bg-heading")
                }
              `} />
            </button>
          </div>

        </div>
      </header>

      {/* ─── Full-Screen Mobile Overlay ─── */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-primary flex flex-col"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          {/* Mobile Menu Content */}
          <div className="flex-1 flex flex-col justify-center px-10 md:px-16">
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    ref={(el) => (mobileLinksRef.current[i] = el)}
                    onClick={closeMenu}
                    className={`
                      block font-serif text-3xl md:text-4xl tracking-widest uppercase
                      transition-colors duration-300
                      ${isActive ? "text-accent" : "text-primary-foreground/70 hover:text-primary-foreground"}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

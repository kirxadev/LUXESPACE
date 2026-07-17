"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { LuxuryImage } from "@/components/common/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  // Content refs for staggered reveal
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const btnsRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const scrollCueRef = useRef(null);
  const scrollCueLineRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images/hero-bg.png",
    "/images/hero-bg-2.png",
    "/images/hero-bg-3.png",
    "/images/hero-bg-4.png",
    "/images/hero-bg-5.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  useGSAP(
    () => {
      // 1. Initial Timeline (Entrance Animations)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Ensure elements are initially hidden or positioned correctly before animation
      gsap.set(
        [
          headlineRef.current,
          copyRef.current,
          ctaRef.current,
          btnsRef.current,
          stat1Ref.current,
          stat2Ref.current,
          stat3Ref.current,
        ],
        {
          y: 30,
          opacity: 0,
        },
      );

      gsap.set(imageWrapperRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(imageRef.current, { scale: 1.15 });

      // --- Sequence Starts ---

      // A. Image Reveal (Smooth wipe from left to right)
      tl.to(imageWrapperRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.8,
        ease: "power4.inOut",
      })

        // B. Image Slow Scale (Subtle Ken burns starting after wipe)
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
          },
          "-=1.5",
        )

        // C. Headline & Content Stagger
        .to(
          [
            headlineRef.current,
            copyRef.current,
            ctaRef.current,
            btnsRef.current,
          ],
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=1.8",
        )

        // D. Statistics Reveal
        .to(
          [stat1Ref.current, stat2Ref.current, stat3Ref.current],
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1.4",
        )

        // E. Scroll Indicator Reveal
        .fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=1.0",
        );

      // 2. Scroll Indicator Looping Animation
      gsap.to(scrollCueLineRef.current, {
        yPercent: 100,
        duration: 1.5,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      });

      // 3. Parallax Effect on Scroll
      // The image moves slightly slower than the scroll speed to create depth
      gsap.to(imageRef.current, {
        yPercent: 20, // Move image down as we scroll down
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, // Smooth scrubbing
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col md:flex-row overflow-hidden bg-background"
    >
      {/* Left Column (Content) */}
      <div className="w-full md:w-[50%] flex flex-col justify-center px-container pt-[120px] pb-8 lg:pl-32 xl:pl-40 lg:pr-16 z-10 relative">
        {/* Main Text Content */}
        <div className="flex flex-col gap-6 max-w-xl relative z-10">
          {/* Decorative Tagline */}
          <div
            ref={headlineRef}
            className="flex items-center gap-3 mb-2 mt-[90px] opacity-0"
          >
            <span className="flex gap-1 text-white md:text-accent font-bold text-lg leading-none">
              |||
            </span>
            <span className="text-caption text-white md:text-accent uppercase tracking-widest font-medium">
              Where Luxury Meets Lifestyle
            </span>
          </div>

          <h1
            ref={copyRef}
            className="text-[3rem] sm:text-[4rem] md:text-display-xl text-white md:text-heading font-serif leading-[1.15] md:leading-tight mt-[30px] opacity-0"
          >
            Transform Your Living Space with Timeless Elegance
          </h1>

          <p
            ref={ctaRef}
            className="text-white/90 md:text-[#14352F]/80 text-[20px] leading-relaxed font-sans font-light mt-[90px] opacity-0"
          >
            At LuxeSpace Interiors, we create exquisite interiors that blend
            sophistication with comfort, tailored to reflect your unique
            personality and style. Our experienced designers and craftsmen
            ensure your living space is both beautiful and functional.
          </p>

          <div
            ref={btnsRef}
            className="flex flex-col sm:flex-row gap-6 mt-[65px] items-center opacity-0"
          >
            <Button
              size="lg"
              className="bg-[#E8E2D9] text-[#14352F] hover:bg-[#DDD8CF] border border-[#DDD8CF] font-semibold tracking-wide uppercase text-[12px] rounded-sm px-6 group transition-colors"
            >
              Explore Our Designs
              <span className="ml-3 inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#14352F] group-hover:bg-[#14352F] group-hover:text-[#E8E2D9] transition-all">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Button>
          </div>
        </div>

        {/* Trust Indicators (Bottom Aligned Cards) */}
        <div className="hidden md:flex flex-row justify-between w-full mt-auto pt-10 pb-0 gap-6">
          {/* Card 1 */}
          <div
            ref={stat1Ref}
            className="flex flex-col items-center justify-center text-center gap-3 flex-1 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] transition-transform hover:-translate-y-1 duration-500 opacity-0"
          >
            <div className="text-[2.5rem] xl:text-[3rem] font-serif text-heading leading-none font-light tracking-tight">
              20<span className="text-primary/70 font-medium">+</span>
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium leading-relaxed">
              Years of
              <br />
              Experience
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={stat2Ref}
            className="flex flex-col items-center justify-center text-center gap-3 flex-1 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] transition-transform hover:-translate-y-1 duration-500"
          >
            <div className="text-[2.5rem] xl:text-[3rem] font-serif text-heading leading-none font-light tracking-tight">
              500<span className="text-primary/70 font-medium">+</span>
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium leading-relaxed">
              Completed
              <br />
              Projects
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={stat3Ref}
            className="flex flex-col items-center justify-center text-center gap-3 flex-1 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] transition-transform hover:-translate-y-1 duration-500"
          >
            <div className="text-[2.5rem] xl:text-[3rem] font-serif text-heading leading-none font-light tracking-tight">
              98<span className="text-primary/70 font-medium">%</span>
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium leading-relaxed">
              Client
              <br />
              Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Image Background / Bleed) */}
      <div className="absolute inset-0 md:relative md:inset-auto md:w-[50%] w-full overflow-hidden">
        {/* Mobile Dark Overlay for White Text */}
        <div className="absolute inset-0 bg-black/50 md:hidden z-0" />

        <div
          ref={imageWrapperRef}
          className="w-full h-full will-change-transform relative"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <div
            ref={imageRef}
            className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
            style={{ transform: "scale(1.15)" }}
          >
            {images.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                <LuxuryImage
                  src={src}
                  alt="Minimalist luxury interior space"
                  aspectRatio="auto"
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover object-center absolute"
                  hoverEffect="none"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-8 md:left-16 flex flex-col items-center gap-4 z-20 opacity-0"
      >
        <span className="text-caption text-muted-foreground tracking-widest uppercase origin-bottom-left -rotate-90 translate-y-full whitespace-nowrap mb-24 md:mb-16">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <div
            ref={scrollCueLineRef}
            className="absolute -top-full left-0 w-full h-full bg-foreground"
          />
        </div>
      </div>
    </section>
  );
}

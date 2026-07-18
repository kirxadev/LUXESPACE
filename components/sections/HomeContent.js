"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuxuryImage } from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/icon";
import { ArrowRight, Leaf, Clock, User, Hammer, Home, Building2, Wine, Star, Plus, Minus } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const testimonials = [
  { name: "Eleanor Vance", location: "London, UK", type: "Luxury Villa", text: "The team transformed our historic villa into a modern sanctuary. Their respect for the original architecture while introducing contemporary luxury was masterful." },
  { name: "Julian Thorne", location: "New York, USA", type: "Penthouse", text: "Exceptional vision and flawless execution. They understood exactly what we wanted before we even had the words for it. Truly a seamless experience." },
  { name: "Sophie Laurent", location: "Paris, France", type: "Boutique Hotel", text: "Our guests constantly ask who designed our lobby and suites. The quiet luxury they achieved has become a core part of our brand identity." },
  { name: "Marcus Chen", location: "Singapore", type: "Modern Apartment", text: "The attention to detail is staggering. Every material, every shadow, and every line feels intentional. It's not just a home, it's a masterpiece of living." },
  { name: "Victoria Sterling", location: "Aspen, USA", type: "Holiday Home", text: "They created a space that feels incredibly grand yet deeply intimate. The custom furniture pieces they sourced are breathtaking works of art." },
  { name: "David Althaus", location: "Berlin, Germany", type: "Executive Office", text: "A workspace that inspires creativity and commands respect. The bespoke cabinetry and lighting design completely redefined how we experience our daily work." },
  { name: "Isabella Rossi", location: "Milan, Italy", type: "Showroom", text: "Sophisticated, minimal, and dramatic. The spatial flow they designed allows our products to shine while creating an unforgettable atmosphere for our clients." },
  { name: "Arthur Pendelton", location: "Kyoto, Japan", type: "Private Residence", text: "An exercise in perfect restraint. The way they manipulated natural light and integrated organic materials brought an incredible sense of calm to our home." },
  { name: "Elena Rostova", location: "Dubai, UAE", type: "Vacation Villa", text: "Uncompromising quality and visionary design. They handled every single detail with absolute perfection, delivering a turnkey sanctuary that exceeded all expectations." },
  { name: "James Caldwell", location: "Sydney, Australia", type: "Restaurant", text: "The ambiance they created is magnetic. We've won design awards solely based on their interior architecture. A truly visionary studio." }
];

const faqs = [
  { question: "How does the design process work?", answer: "Our process begins with a comprehensive consultation to understand your vision, lifestyle, and requirements. We then move into conceptual design, followed by detailed architectural planning, material selection, and finally, flawless execution and styling." },
  { question: "What types of projects do you specialize in?", answer: "We specialize in high-end residential estates, luxury boutique hotels, exclusive commercial spaces, and bespoke executive offices. Our portfolio is defined by uncompromising quality and timeless aesthetics." },
  { question: "Do you work internationally?", answer: "Yes. While our primary studio is based locally, we frequently commission projects worldwide. Our global network of premium artisans and logistics partners ensures seamless execution regardless of location." },
  { question: "Can you handle complete turnkey projects?", answer: "Absolutely. We offer comprehensive full-service design, managing everything from the initial architectural sketches to the final placement of curated art and bespoke furnishings, delivering a fully realized sanctuary." },
  { question: "How long does a typical project take?", answer: "Timelines vary significantly based on project scale and complexity. A luxury penthouse may take 8-12 months, while ground-up estates can take 18-36 months. We establish a clear, realistic schedule during our initial proposal phase." },
  { question: "Do you offer consultation before starting?", answer: "Yes, every engagement begins with an exclusive, in-depth consultation. This allows us to ensure our design philosophies align and that we fully comprehend the unique demands and aspirations of your project." },
  { question: "Can you work with my existing architect?", answer: "Certainly. We frequently collaborate with world-renowned architects, seamlessly integrating our interior architecture and bespoke styling with their structural vision to create a unified masterpiece." },
  { question: "How is project pricing determined?", answer: "Pricing is highly customized and reflects the bespoke nature of our work. Following our initial consultation, we provide a detailed, transparent proposal outlining design fees, estimated material costs, and project management." },
  { question: "Will I receive 3D visualizations?", answer: "Yes. We utilize state-of-the-art rendering technology to provide photorealistic 3D visualizations and immersive walkthroughs, ensuring you have absolute clarity on the final design before any construction begins." },
  { question: "How do we get started?", answer: "To begin, simply reach out via our contact page to request a consultation. Our team will promptly arrange a private meeting to discuss your vision, timeline, and how our studio can bring your project to life." }
];

export default function HomeContent() {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useGSAP(() => {
    // Reveal all elements with .gsap-reveal class
    const revealElements = gsap.utils.toArray('.gsap-reveal');
    
    // Immediately hide all reveal elements (before first paint)
    gsap.set(revealElements, { y: 50, opacity: 0 });

    revealElements.forEach((el) => {
      gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Philosophy Section Animation
    const philTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".phil-trigger",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });
    
    philTl.fromTo(".gsap-phil-heading", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".gsap-phil-text", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.15 },
      "-=0.7"
    )
    .fromTo(".gsap-phil-cta",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(".gsap-phil-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.5"
    );

    // Parallax elements
    const parallaxElements = gsap.utils.toArray('.gsap-parallax');
    parallaxElements.forEach((el) => {
      gsap.to(el, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Testimonial Marquees
    const marquee1 = gsap.utils.toArray('.marquee-1')[0];
    
    if (marquee1) {
      const tl1 = gsap.to(marquee1, {
        xPercent: -50,
        repeat: -1,
        duration: 35,
        ease: "none",
      });

      const cards = marquee1.querySelectorAll('.testimonial-card');
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(tl1, { timeScale: 0, duration: 0.6, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(tl1, { timeScale: 1, duration: 0.6, ease: "power2.in" });
        });
      });
    }

    // FAQ Stagger
    const faqItems = gsap.utils.toArray('.gsap-faq-item');
    if (faqItems.length > 0) {
      gsap.fromTo(faqItems,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqItems[0].parentElement,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-background relative z-20">
      
      {/* 1. Our Philosophy */}
      <section className="py-[120px] px-container bg-background">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center phil-trigger">
          <span className="text-lg md:text-xl font-semibold text-primary uppercase tracking-widest mb-6 block gsap-phil-heading">OUR PHILOSOPHY</span>
          
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-serif leading-tight text-heading mb-10 gsap-phil-heading">
            Designing spaces that inspire timeless living.
          </h2>
          
          <div className="flex flex-col gap-6 mb-12">
            <p className="text-body-lg text-muted-foreground font-sans font-light leading-relaxed gsap-phil-text">
              We believe that true luxury is found in the meticulous attention to detail and a profound respect for materials. Our approach centers on creating environments that feel effortless, balancing quiet sophistication with enduring comfort.
            </p>
            <p className="text-body-lg text-muted-foreground font-sans font-light leading-relaxed gsap-phil-text">
              Every project is a deeply collaborative journey, resulting in bespoke sanctuaries that resonate with your personal vision while maintaining our signature standard of unparalleled craftsmanship.
            </p>
          </div>

          <div className="mb-20 gsap-phil-cta">
            <Link href="/about" className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-widest uppercase text-heading transition-colors relative pb-1">
              Discover Our Studio
              <Icon icon={ArrowRight} size="sm" className="transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-heading transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Brand Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 w-full">
            {[
              { icon: Leaf, title: "Natural Materials", desc: "Sourcing only the finest organic elements." },
              { icon: Clock, title: "Timeless Design", desc: "Aesthetics that transcend seasonal trends." },
              { icon: User, title: "Personalized Spaces", desc: "Tailored entirely to your unique lifestyle." },
              { icon: Hammer, title: "Premium Craftsmanship", desc: "Flawless execution in every detail." }
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 gsap-phil-item">
                <div className="w-[48px] h-[48px] rounded-full bg-surface flex items-center justify-center text-primary mb-2">
                  <Icon icon={value.icon} size="md" />
                </div>
                <h3 className="text-h6 font-serif text-heading">{value.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Selected Works */}
      <section className="py-section px-container bg-surface">
        <div className="container-base mx-auto">
          
          <div className="flex flex-col items-center text-center mb-16 w-full gsap-reveal">
            <span className="text-lg md:text-xl font-semibold text-primary uppercase tracking-widest mb-6 block">PORTFOLIO</span>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-serif leading-tight text-heading">
              Selected Works
            </h2>
          </div>

          <div className="flex flex-col gap-24">
            
            {/* Project 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group">
              <div className="lg:col-span-7 relative h-[60svh] w-full overflow-hidden rounded-xl cursor-pointer gsap-reveal">
                 <Link href="/projects/fifth-avenue-penthouse">
                   <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                     <LuxuryImage 
                        src="/images/portfolio-hero.png" // Reusing AI image
                        alt="Fifth Avenue Penthouse"
                        className="w-full h-full object-cover absolute inset-0 gsap-parallax transition-transform duration-1000 group-hover:scale-105"
                        wrapperClassName="w-full h-full"
                        hoverEffect="none"
                      />
                   </div>
                 </Link>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6 gsap-reveal">
                <div>
                  <span className="text-caption text-primary uppercase tracking-widest block mb-2">Residential</span>
                  <h3 className="text-h3 font-serif group-hover:text-primary transition-colors">
                    <Link href="/projects/fifth-avenue-penthouse">Fifth Avenue Penthouse</Link>
                  </h3>
                </div>
                <p className="text-body text-muted-foreground">
                  A sanctuary of absolute calm perched above the Manhattan skyline, featuring custom travertine floors and hand-carved wood paneling.
                </p>
                <Link href="/projects/fifth-avenue-penthouse" className="inline-flex items-center gap-2 text-button text-foreground hover:text-primary transition-colors mt-2">
                  Explore Case Study
                  <Icon icon={ArrowRight} size="sm" className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Project 2 (Alternating) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group">
              <div className="lg:col-span-7 lg:order-2 relative h-[60svh] w-full overflow-hidden rounded-xl cursor-pointer gsap-reveal">
                 <Link href="/projects/the-aspen-chalet">
                   <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                     <LuxuryImage 
                        src="/images/portfolio-res-2.png" // Reusing AI image
                        alt="The Aspen Chalet"
                        className="w-full h-full object-cover absolute inset-0 gsap-parallax transition-transform duration-1000 group-hover:scale-105"
                        wrapperClassName="w-full h-full"
                        hoverEffect="none"
                      />
                   </div>
                 </Link>
              </div>
              <div className="lg:col-span-5 lg:order-1 flex flex-col gap-6 gsap-reveal">
                <div>
                  <span className="text-caption text-primary uppercase tracking-widest block mb-2">Hospitality</span>
                  <h3 className="text-h3 font-serif group-hover:text-primary transition-colors">
                    <Link href="/projects/the-aspen-chalet">Aman Tokyo Lobby</Link>
                  </h3>
                </div>
                <p className="text-body text-muted-foreground">
                  An exploration of monolithic materials and soft light, creating an intimate entry sequence for a world-class luxury hotel.
                </p>
                <Link href="/projects/the-aspen-chalet" className="inline-flex items-center gap-2 text-button text-foreground hover:text-primary transition-colors mt-2">
                  Explore Case Study
                  <Icon icon={ArrowRight} size="sm" className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
          
          <div className="mt-16 flex justify-center w-full gsap-reveal">
            <Link href="/portfolio">
              <Button size="lg" className="bg-heading text-background hover:bg-heading/90 font-semibold tracking-wide uppercase text-[12px] rounded-sm px-8 group transition-colors">
                Explore Projects
                <span className="ml-3 inline-flex items-center justify-center w-6 h-6 rounded-full border border-background group-hover:bg-background group-hover:text-heading transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Our Expertise */}
      <section className="py-[120px] px-container bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface/40 via-background to-background relative z-10">
        <div className="container-base mx-auto">
          
          <div className="flex flex-col items-center text-center mb-14 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-6 block">EXPERTISE</span>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif leading-tight text-heading mb-8">
              Comprehensive Design
            </h2>
            <p className="text-body-lg text-muted-foreground font-sans font-light leading-relaxed max-w-[700px]">
              We offer full-service interior architecture and design, managing every detail from conceptual sketches to the final curated installation. Our holistic approach ensures a seamless, luxurious experience at every scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {[
              { icon: Home, title: "Residential", desc: "Bespoke private homes and luxury estates tailored entirely to your lifestyle and personal aesthetic." },
              { icon: Building2, title: "Commercial", desc: "Flagship retail spaces, boutique corporate environments, and exclusive executive offices." },
              { icon: Wine, title: "Hospitality", desc: "World-class boutique hotels, destination restaurants, and private members clubs." }
            ].map((service, i) => (
              <div key={i} className="group flex flex-col items-center text-center p-10 bg-background border border-border/30 rounded-2xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-primary/20 transition-all duration-500 ease-out hover:-translate-y-2 gsap-reveal">
                
                <div className="w-[56px] h-[56px] rounded-full bg-surface/60 flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110">
                  <Icon icon={service.icon} size="md" />
                </div>
                
                <h3 className="text-[1.5rem] font-serif text-heading mb-5">{service.title}</h3>
                
                <div className="w-12 h-[1px] bg-border/60 mb-5 transition-colors duration-500 group-hover:bg-primary/30"></div>
                
                <p className="text-[15px] text-muted-foreground font-light leading-relaxed">{service.desc}</p>
                
              </div>
            ))}
          </div>
          
          <div className="text-center gsap-reveal">
            <Link href="/services" className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-widest uppercase text-heading transition-colors relative pb-1">
              View Full Services
              <Icon icon={ArrowRight} size="sm" className="transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-heading transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
        </div>
      </section>

      {/* 4. Client Experiences */}
      <section className="py-[120px] bg-surface overflow-hidden testimonial-section relative z-10">
        <div className="container-base mx-auto px-container mb-16 text-center gsap-reveal">
          <span className="text-caption text-primary uppercase tracking-widest mb-6 block">TESTIMONIALS</span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif leading-tight text-heading">
            Client Experiences
          </h2>
        </div>

        <div className="flex flex-col gap-8 w-full relative gsap-reveal">
          
          {/* Single Row: Right to Left */}
          <div className="flex w-max marquee-1 items-stretch">
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div key={`t-${i}`} className="testimonial-card w-[320px] sm:w-[400px] md:w-[450px] shrink-0 mx-4 p-8 md:p-10 bg-background border border-border/30 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 ease-out group cursor-default flex flex-col">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-[48px] h-[48px] rounded-full bg-surface overflow-hidden shrink-0 border border-border/50">
                     <div className="w-full h-full bg-border/30"></div>
                  </div>
                  <div>
                    <div className="font-serif text-heading text-[1.125rem]">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{testimonial.location}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5 text-primary">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon key={star} icon={Star} size="default" className="fill-primary" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground">
                    {testimonial.type}
                  </span>
                </div>

                <p className="text-[15px] text-muted-foreground font-light leading-relaxed flex-grow">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-[120px] px-container bg-background">
        <div className="container-base mx-auto max-w-[900px]">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-6 block">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif leading-tight text-heading mb-6">
              Everything You Need to Know
            </h2>
            <p className="text-body-lg text-muted-foreground font-sans font-light leading-relaxed max-w-[700px]">
              Every project is a deeply personal journey, tailored meticulously to your vision and requirements. We have curated answers to our most common inquiries below.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-4 mb-16">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className={`gsap-faq-item group border border-border/40 rounded-2xl p-6 md:p-8 bg-background transition-all duration-500 ease-out cursor-pointer ${
                    isOpen ? 'border-primary/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] -translate-y-1' : 'hover:border-primary/20 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1'
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center gap-6">
                    <h3 className={`text-[1.125rem] md:text-[1.25rem] font-serif transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-heading group-hover:text-primary'}`}>
                      {faq.question}
                    </h3>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                      <Icon icon={isOpen ? Minus : Plus} size="sm" />
                    </div>
                  </div>
                  
                  {/* CSS Grid Animation for smooth expand/collapse */}
                  <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-[15px] text-muted-foreground font-light leading-relaxed pr-10">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary CTA */}
          <div className="text-center gsap-reveal">
            <p className="text-muted-foreground font-light mb-4 text-[15px]">Still have questions?</p>
            <Link href="/contact" className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-widest uppercase text-heading transition-colors relative pb-1">
              Contact our team for a personalized consultation
              <Icon icon={ArrowRight} size="sm" className="transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-heading transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Consultation CTA */}
      <section className="py-[120px] px-container bg-foreground text-background text-center">
        <div className="container-content mx-auto gsap-reveal">
          <span className="text-caption text-white/50 uppercase tracking-widest mb-6 block">Ready to Begin?</span>
          <h2 className="text-display-md font-serif mb-6">Commission a Project</h2>
          <p className="text-body-lg text-white/70 mb-12 max-w-xl mx-auto">
            Our waitlist is currently open for full-scale residential and commercial commissions for the upcoming year.
          </p>
          <Button asChild variant="primary" size="lg" className="bg-primary text-primary-foreground hover:bg-white hover:text-foreground">
            <Link href="/contact">
              Inquire Now
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}

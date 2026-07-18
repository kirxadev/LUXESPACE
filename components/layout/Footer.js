import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background text-foreground selection:bg-heading selection:text-background border-t border-border/30">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20">
        
        {/* ─── Newsletter Section ─── */}
        <div className="flex flex-col items-center text-center pt-[120px] pb-24">
          <h2 className="font-serif text-5xl md:text-6xl text-heading mb-6 tracking-wide">
            Stay Inspired
          </h2>
          <p className="max-w-md text-muted-foreground text-[15px] font-sans font-light leading-relaxed mb-10">
            Subscribe to our newsletter for curated interior design inspiration, exclusive studio updates, and expert insights.
          </p>
          
          <form className="w-full max-w-lg relative group">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="w-full bg-transparent border-b border-border/50 py-4 pl-0 pr-12 text-heading placeholder:text-muted-foreground focus:outline-none focus:border-heading transition-colors font-sans text-sm tracking-wide"
            />
            <button 
              type="submit"
              aria-label="Subscribe"
              className="absolute right-0 bottom-3 w-10 h-10 flex items-center justify-center text-muted-foreground group-hover:text-heading transition-colors"
            >
              <ArrowRight className="w-5 h-5 font-light" />
            </button>
          </form>
        </div>

        {/* Soft Divider */}
        <div className="w-full h-px bg-border/40"></div>

        {/* ─── Main Footer ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-20">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <span className="font-serif text-3xl tracking-[0.15em] text-heading mb-6">
              LUXESPACE
            </span>
            <p className="text-muted-foreground text-[15px] font-sans font-light leading-relaxed max-w-xs">
              We create bespoke interiors that blend timeless design, refined craftsmanship, and thoughtful functionality, transforming residential and commercial spaces into elegant, enduring environments.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-serif text-lg text-heading mb-6 tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Projects', 'Contact'].map((link) => (
                <Link 
                  key={link} 
                  href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="w-fit text-[15px] font-sans font-light text-muted-foreground hover:text-heading transition-colors relative group"
                >
                  {link}
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Studio */}
          <div className="flex flex-col">
            <h4 className="font-serif text-lg text-heading mb-6 tracking-wide">Studio</h4>
            <ul className="flex flex-col gap-4 text-[15px] font-sans font-light text-muted-foreground">
              <li>
                <a href="mailto:hello@luxespace.com" className="hover:text-heading transition-colors">hello@luxespace.com</a>
              </li>
              <li>
                <a href="tel:+10000000000" className="hover:text-heading transition-colors">+1 (000) 000-0000</a>
              </li>
              <li className="leading-relaxed">
                123 Dummy Street, Suite 000<br />
                Placeholder City, ST 00000
              </li>
              <li className="mt-2 opacity-70">
                Mon - Fri: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col">
            <h4 className="font-serif text-lg text-heading mb-6 tracking-wide">Follow Us</h4>
            <nav className="flex flex-col gap-4">
              {['Instagram', 'Pinterest', 'LinkedIn', 'Behance'].map((platform) => (
                <span 
                  key={platform} 
                  className="w-fit text-[15px] font-sans font-light text-muted-foreground hover:text-heading hover:-translate-y-0.5 transition-all cursor-default"
                >
                  {platform}
                </span>
              ))}
            </nav>
          </div>

        </div>

        {/* Soft Divider */}
        <div className="w-full h-px bg-border/40"></div>

        {/* ─── Bottom Footer ─── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 pb-[60px] text-[13px] font-sans font-light text-muted-foreground">
          <p>© {new Date().getFullYear()} LuxeSpace Interiors. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-heading transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-heading transition-colors">Terms & Conditions</Link>
            <button className="hover:text-heading transition-colors">Cookies</button>
          </div>
        </div>

      </div>
    </footer>
  );
}

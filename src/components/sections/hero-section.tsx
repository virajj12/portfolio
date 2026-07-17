"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowRight, Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ResumeViewer } from "@/components/resume-viewer";

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const roles = PORTFOLIO_DATA.hero.roles;

  // Typewriter / Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);
  
  // GSAP Initial load animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
      )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        socialRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        photoRef.current,
        { scale: 0.9, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1 },
        "-=0.6"
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Orbs with Framer Motion for buttery smooth loops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-lg max-h-lg bg-primary/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-md max-h-md bg-blue-500/20 rounded-full blur-[100px]" 
        />
      </div>

      {/* Massive Bottom-Right Photo */}
      <div ref={photoRef} className="absolute bottom-0 right-0 w-full md:w-[50vw] h-[60vh] md:h-[85vh] z-0 pointer-events-none opacity-0">
        <div 
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to left, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to left, black 80%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect"
          }}
        >
          <Image 
            src="/viraj.png" 
            alt="Viraj Jain" 
            fill 
            className="object-cover object-top lg:object-center opacity-80 mix-blend-screen"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left pt-20 pb-32">
            <div className="hero-badge mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </div>
          
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter mb-4 text-balance"
          >
            {PORTFOLIO_DATA.hero.greeting} <span className="text-primary">{PORTFOLIO_DATA.name}</span>
          </h1>
          
          <div ref={subtitleRef} className="h-[40px] md:h-[60px] flex items-center justify-center lg:justify-start mb-6 overflow-hidden w-full">
            <motion.p 
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-heading text-muted-foreground"
            >
              {roles[roleIndex]}
            </motion.p>
          </div>
          
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance mb-10"
          >
            {PORTFOLIO_DATA.hero.valueProp}
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 w-full sm:w-auto">
            <MagneticButton 
              onClick={() => scrollToSection("projects")}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(132,204,22,0.4)] cursor-none"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>
            
            <ResumeViewer>
              <MagneticButton 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-foreground font-semibold text-lg transition-all hover:border-primary/50 cursor-none"
              >
                <FileText size={20} />
                View Resume
              </MagneticButton>
            </ResumeViewer>

            <MagneticButton 
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-foreground font-semibold text-lg transition-all hover:border-primary/50 cursor-none"
            >
              Get in Touch
            </MagneticButton>
          </div>

          <div ref={socialRef} className="flex items-center justify-center lg:justify-start gap-6">
            <a href={PORTFOLIO_DATA.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform cursor-none">
              <FaGithub size={24} />
            </a>
            <a href={PORTFOLIO_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform cursor-none">
              <FaLinkedin size={24} />
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform cursor-none">
              <Mail size={24} />
            </a>
          </div>
          
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 cursor-none">
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
      </div>
    </section>
  );
}

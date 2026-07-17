"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GraduationCap, Briefcase, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 flex items-center gap-3">
            <User className="text-primary" size={40} />
            About Me
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl text-center text-balance">
            {PORTFOLIO_DATA.about.bio}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold">Education</h3>
            </div>
            
            <div className="relative border-l border-white/10 ml-6 space-y-12 pb-8">
              {PORTFOLIO_DATA.about.education.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <span className="text-primary font-mono text-sm mb-2 block">{edu.year}</span>
                      <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
                      <p className="text-muted-foreground mb-3">{edu.institution}</p>
                      <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                        {edu.score}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold">Experience</h3>
            </div>
            
            <div className="relative border-l border-white/10 ml-6 space-y-12 pb-8">
              {PORTFOLIO_DATA.experience.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                      <p className="text-primary font-medium mb-4">{exp.organization}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

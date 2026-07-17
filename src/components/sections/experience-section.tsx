"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Experience & <span className="text-primary">Extracurriculars</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                      {exp.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-primary font-medium mt-1">
                    <Briefcase size={16} className="mr-2" />
                    {exp.organization}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

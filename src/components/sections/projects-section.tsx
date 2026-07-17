"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ROTATION_RANGE = 12;
const HALF_ROTATION_RANGE = 12 / 2;

function TiltCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className="h-full"
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-md flex flex-col hover:border-primary/50 transition-colors shadow-xl group">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <FolderGit2 size={36} className="text-primary group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-4">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all cursor-none"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all cursor-none"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground text-balance">
              {project.description}
            </p>
          </CardContent>
          <CardFooter>
            <ul className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tech: string) => (
                <li 
                  key={tech} 
                  className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-1 rounded-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Selected Works
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl text-center text-balance">
            A showcase of my recent projects, featuring real-world applications and full-stack solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <TiltCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

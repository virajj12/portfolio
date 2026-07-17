"use client";

import { motion, Variants } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FaJava, FaReact, FaPython, FaHtml5, FaCss3Alt, FaNodeJs 
} from "react-icons/fa";
import { 
  SiJavascript, SiC, SiMongodb, SiSqlite, SiFirebase, SiVercel, 
  SiFastapi, SiStreamlit, SiPandas, SiNumpy 
} from "react-icons/si";
import { Code2, Database, Globe, Award } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Core Technologies": <Code2 className="text-primary" size={24} />,
  "Databases & Cloud": <Database className="text-primary" size={24} />,
  "Web, Integration & Data Engineering": <Globe className="text-primary" size={24} />,
  "Certifications": <Award className="text-primary" size={24} />
};

const techIcons: Record<string, React.ReactNode> = {
  "Java": <FaJava className="text-[#007396]" />,
  "React.js": <FaReact className="text-[#61DAFB]" />,
  "JavaScript": <SiJavascript className="text-[#F7DF1E]" />,
  "Python": <FaPython className="text-[#3776AB]" />,
  "C": <SiC className="text-[#A8B9CC]" />,
  "HTML5": <FaHtml5 className="text-[#E34F26]" />,
  "CSS3": <FaCss3Alt className="text-[#1572B6]" />,
  "SQL": <Database className="text-slate-400" />,
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "SQLite": <SiSqlite className="text-[#003B57]" />,
  "Firebase": <SiFirebase className="text-[#FFCA28]" />,
  "Vercel": <SiVercel className="text-white" />,
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  "FastAPI": <SiFastapi className="text-[#009688]" />,
  "Streamlit": <SiStreamlit className="text-[#FF4B4B]" />,
  "Pandas": <SiPandas className="text-[#150458]" />,
  "NumPy": <SiNumpy className="text-[#013243]" />,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 flex items-center gap-3">
            <Code2 className="text-primary" size={40} />
            Technical Arsenal
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl text-center text-balance">
            A comprehensive overview of my technical skills, tools, and platforms I use to build scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="h-full"
            >
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-15px_rgba(132,204,22,0.3)]">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      {categoryIcons[skillGroup.category]}
                    </div>
                    <CardTitle className="text-lg font-heading">{skillGroup.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {skillGroup.items.map((skill) => (
                      <motion.li 
                        key={skill}
                        variants={itemVariants}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-colors cursor-default"
                      >
                        {techIcons[skill] && (
                          <span className="text-base">{techIcons[skill]}</span>
                        )}
                        {skill}
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

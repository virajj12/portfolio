"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

interface ResumeViewerProps {
  children: React.ReactNode;
}

export function ResumeViewer({ children }: ResumeViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block">
        {children}
      </div>

      {isMounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-[95vw] md:w-[85vw] lg:w-[75vw] max-w-none h-[90vh] bg-background border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 text-foreground font-heading font-semibold">
                    <FileText className="text-primary" size={20} />
                    Resume
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/resume.pdf"
                      download="Viraj_Jain_Resume.pdf"
                      className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium text-sm"
                    >
                      <Download size={16} />
                      Download
                    </a>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 w-full bg-white/5 relative">
                  <object
                    data="/resume.pdf#toolbar=0"
                    type="application/pdf"
                    className="w-full h-full rounded-b-2xl"
                  >
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <p className="mb-4">It appears your browser doesn't support embedded PDFs.</p>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-transform"
                      >
                        Click here to download it instead
                      </a>
                    </div>
                  </object>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { toast } from "sonner";
import { SiGmail } from "react-icons/si";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConnectEmailMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function ConnectEmailMenu({ children, className }: ConnectEmailMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const email = PORTFOLIO_DATA.email;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email address copied to clipboard!");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuOptions = [
    {
      label: "Open in Gmail",
      icon: <SiGmail className="w-4 h-4 text-red-500" />,
      action: () => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, "_blank"),
    },
    {
      label: "Open in Outlook",
      icon: <PiMicrosoftOutlookLogoFill className="w-4 h-4 text-blue-500" />,
      action: () => window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${email}`, "_blank"),
    },
    {
      label: "Open Default App",
      icon: <MdEmail className="w-4 h-4 text-gray-300" />,
      action: () => { window.location.href = `mailto:${email}`; setIsOpen(false); },
    },
    {
      label: "Copy Email Address",
      icon: <MdContentCopy className="w-4 h-4 text-gray-300" />,
      action: handleCopy,
    },
  ];

  return (
    <div className={cn("relative inline-block", className)} ref={menuRef}>
      <div onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
        {children}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 rounded-xl p-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-50 flex flex-col gap-1"
            data-no-custom-cursor="true"
          >
            {menuOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={option.action}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-white/90 text-left group cursor-pointer"
              >
                <div className="flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  {option.icon}
                </div>
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

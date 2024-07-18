"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BlurIn({ children, className, variant, duration = 1 }) {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn("transition-opacity", className)}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  external?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  fullWidth = false,
  external = false,
}: ButtonProps) {
  const baseStyles = clsx(
    "btn-luxury relative inline-flex items-center justify-center gap-2 rounded-full font-montserrat font-medium tracking-luxury transition-all duration-400 cursor-pointer select-none",
    {
      "w-full": fullWidth,
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  const sizeStyles = {
    sm: "px-6 py-2.5 text-xs",
    md: "px-8 py-3.5 text-xs",
    lg: "px-10 py-4 text-sm",
  };

  const variantStyles = {
    primary:
      "bg-[#810B38] text-white shadow-burgundy hover:bg-[#5c0828] hover:shadow-burgundy-glow hover:-translate-y-0.5",
    secondary:
      "bg-white text-[#810B38] border border-[#810B38] hover:bg-[#810B38] hover:text-white hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-[#1A1A1A] hover:text-[#810B38] hover:bg-burgundy-muted",
    outline:
      "bg-transparent text-white border border-white hover:bg-white hover:text-[#810B38] hover:-translate-y-0.5",
  };

  const combinedStyles = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <motion.span
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={combinedStyles}
      onClick={!href ? onClick : undefined}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

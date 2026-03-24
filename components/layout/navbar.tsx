"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when Route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ease-out ${
        isScrolled
          ? "h-16 bg-background/80 backdrop-blur-md border-b border-border/50"
          : "h-20 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-heading font-bold tracking-tight z-50">
          OJO<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-widest relative group transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-1/2 -ml-0.5 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Section (Theme Toggle + CTA) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/contact" className={buttonVariants({ className: "rounded-full px-6" })}>
            Let's Talk <span className="ml-2 text-lg leading-none">👋</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center space-x-4 z-50">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-12"
          >
            <nav className="flex flex-col space-y-6 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-heading font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="mt-auto">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={buttonVariants({ size: "lg", className: "w-full rounded-xl mb-8" })}>
                Let's Talk 👋
              </Link>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground text-sm uppercase tracking-widest"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

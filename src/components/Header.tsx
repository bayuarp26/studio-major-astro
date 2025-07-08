"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  dictionary: any;
  lang: 'en' | 'id';
  name?: string;
  className?: string;
}

export default function Header({ dictionary, lang, name = "Studio Major", className }: HeaderProps) {
  const [showNameInHeader, setShowNameInHeader] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: dictionary.nav.profile, href: `/${lang}#hero` },
    { name: dictionary.nav.about, href: `/${lang}#about` },
    { name: dictionary.nav.skills, href: `/${lang}#skills` },
    { name: dictionary.nav.services, href: `/${lang}#services` },
    { name: dictionary.nav.projects, href: `/${lang}#projects` },
    { name: dictionary.nav.certificates, href: `/${lang}#certificates` },
  ];

  useEffect(() => {
    const heroNameElement = document.getElementById('hero-name');
    if (!heroNameElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNameInHeader(!entry.isIntersecting);
      },
      {
        rootMargin: '-64px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(heroNameElement);

    return () => {
      observer.unobserve(heroNameElement);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <a href={`/${lang}#hero`} className="mr-6 flex items-center space-x-2">
          <span
            className={cn(
              "text-2xl font-bold text-primary transition-opacity duration-300",
              showNameInHeader ? "opacity-100" : "opacity-0"
            )}
          >
            {name}
          </span>
        </a>
        
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
          {navLinks.map((link) => {
            const isActive = link.href === `/${lang}#${activeSection}`;
            
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/60"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex">
            <a href={`/${lang}#contact`}>{dictionary.nav.contactMe}</a>
          </Button>
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
          <MobileNav navLinks={navLinks} name={name} dictionary={dictionary} lang={lang} />
        </div>
      </div>
    </header>
  );
}

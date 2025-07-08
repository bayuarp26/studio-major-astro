"use client"

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

interface MobileNavProps {
  navLinks: { name: string; href: string }[];
  name: string;
  dictionary: any;
  lang: 'en' | 'id';
}

export function MobileNav({ navLinks, name, dictionary, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-[300px] bg-background shadow-lg">
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between border-b pb-4">
                <a href={`/${lang}#hero`} className="flex items-center" onClick={() => setOpen(false)}>
                  <span className="font-headline text-2xl font-bold text-primary">
                    {name}
                  </span>
                </a>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5"/>
                </Button>
              </div>
              <div className="mt-6 flex flex-1 flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Button asChild>
                  <a href={`/${lang}#contact`} onClick={() => setOpen(false)}>{dictionary.nav.contactMe}</a>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

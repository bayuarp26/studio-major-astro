"use client"

import { Button } from './Button';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'id';
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex space-x-1">
        <Button
          variant={currentLang === 'en' ? 'default' : 'ghost'}
          size="sm"
          asChild
        >
          <a href="/en">EN</a>
        </Button>
        <Button
          variant={currentLang === 'id' ? 'default' : 'ghost'}
          size="sm"
          asChild
        >
          <a href="/id">ID</a>
        </Button>
      </div>
    </div>
  );
}

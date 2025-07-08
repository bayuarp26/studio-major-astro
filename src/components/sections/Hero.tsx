import { Button } from "../Button";
import { Send } from "lucide-react";
import type { MultilingualString, Locale, PortfolioData } from "../../lib/types";

interface HeroProps {
  data: PortfolioData;
  dictionary: any;
  lang: Locale;
}

const getText = (field: MultilingualString | string | undefined, lang: Locale, fallback: string = ''): string => {
  if (typeof field === 'string') {
    return field;
  }
  if (field && typeof field === 'object' && !Array.isArray(field)) {
    return field[lang] || field.id || fallback;
  }
  return fallback;
}

export default function Hero({ data, dictionary, lang }: HeroProps) {
  return (
    <section id="hero" className="bg-background">
      <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 id="hero-name" className="font-headline text-5xl font-bold tracking-tight text-primary md:text-7xl">
            {data.name}
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-foreground/80 md:text-xl">
            {getText(data.title, lang)}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <a href={data.cvUrl} download={`CV-${data.name}.pdf`}>
                {dictionary.hero.downloadCV}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact" className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                {dictionary.nav.contactMe}
              </a>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto h-80 w-80 flex-shrink-0 order-first lg:order-last">
          <img
            src={data.profilePictureUrl}
            alt={`Foto profil ${data.name}`}
            className="rounded-full object-cover shadow-2xl w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

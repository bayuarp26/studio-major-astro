import type { MultilingualString, Locale } from '../../lib/types';

interface AboutProps {
  about: string;
  dictionary: any;
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

export default function About({ about, dictionary }: AboutProps) {
  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-1">
          <div className="lg:col-span-1">
            <h2 className="font-headline text-center text-4xl font-semibold text-primary sm:text-5xl lg:text-left">
              {dictionary.about.title}
            </h2>
            <p className="mt-6 text-center text-lg leading-relaxed text-foreground/70 lg:text-left">
              {about}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

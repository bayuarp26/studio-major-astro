import { Card, CardContent } from '../ui/card';
import type { Certificate, MultilingualString } from '../../lib/types';

interface CertificatesProps {
  certificates: Certificate[];
  dictionary: any;
  lang: 'en' | 'id';
}

const getText = (field: MultilingualString | string | undefined, lang: 'en' | 'id', fallback: string = ''): string => {
  if (typeof field === 'string') {
    return field;
  }
  if (field && typeof field === 'object' && !Array.isArray(field)) {
    return field[lang] || field.id || fallback;
  }
  return fallback;
}

export default function Certificates({ certificates, dictionary, lang }: CertificatesProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="bg-secondary py-24 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-semibold text-primary sm:text-5xl">
            {dictionary.certificates.title}
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => {
            const certName = getText(cert.name, lang, 'Untitled Certificate');
            const certDescription = getText(cert.description, lang);
            
            return (
              <Card key={cert._id || index} className="group overflow-hidden rounded-xl bg-card shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={cert.imageUrl || 'https://placehold.co/600x400.png'}
                    alt={certName}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={cert.imageHint || 'certificate document'}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary">{certName}</h3>
                  <p className="mt-2 text-sm text-foreground/80">{certDescription}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{cert.issuer}</span>
                    <span className="text-sm text-foreground/60">{cert.date}</span>
                  </div>
                  {cert.url && (
                    <div className="mt-4">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {dictionary.certificates.viewCertificate || 'View Certificate'}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

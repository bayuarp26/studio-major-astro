import { Button } from "../Button";
import { Mail, Linkedin } from "lucide-react";

interface ContactInfo {
  email: string;
  linkedin?: string;
}

interface ContactProps {
  contact: ContactInfo;
  dictionary: any;
}

export default function Contact({ contact, dictionary }: ContactProps) {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary">
      <div className="container text-center">
        <h2 className="font-headline text-4xl font-semibold text-primary sm:text-5xl">
          {dictionary.contact.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/70">
          {dictionary.contact.description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
          <Button asChild size="lg">
            <a href={`mailto:${contact.email}`}>
              <Mail className="mr-2 h-5 w-5" />
              {dictionary.contact.sendEmail}
            </a>
          </Button>
          {contact.linkedin && (
            <Button asChild size="lg" variant="linkedin">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

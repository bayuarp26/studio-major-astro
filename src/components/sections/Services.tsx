"use client"

import { Button } from "../Button";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

interface ServicesProps {
  dictionary: any;
}

export default function Services({ dictionary }: ServicesProps) {
  const servicesData = [
    {
      title: dictionary.services.socialMediaSpecialist,
      link: "https://api.whatsapp.com/send/?phone=6282286514244&text=Halo%20Kak%2C%20aku%20mau%20kerja%20sama%20nihh%20dengan%20kakak%20untuk%20Jadi%20Tim%20Sosial%20Media%20Spesialist%20kami%2C%20Apa%20aku%20Boleh%20berdiskusi%20sama%20kakak%20?%20&type=phone_number&app_absent=0",
    },
    {
      title: dictionary.services.digitalMarketing,
      link: "https://api.whatsapp.com/send/?phone=6282286514244&text=Halo%20kak%2C%20aku%20mau%20kerja%20sama%20dengan%20kakak%20untuk%20jadi%20bagian%20Tim%20digital%20marketing%20kami%20nih%2C%20apa%20aku%20boleh%20berdiskusi%20dengan%20kakak%20%3F&type=phone_number&app_absent=0",
    },
  ];

  return (
    <section id="services" className="bg-secondary py-24 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-semibold text-primary sm:text-5xl">
            {dictionary.services.title}
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {servicesData.map((service, index) => (
            <Card key={index} className="bg-card shadow-lg rounded-xl overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20">
              <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                <div className="rounded-full border-2 border-primary/50 bg-primary/10 p-4 text-primary transition-all duration-300 group-hover:scale-110">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary">{service.title}</h3>
                <Button asChild size="lg" className="rounded-full px-8">
                  <a href={service.link} target="_blank" rel="noopener noreferrer">
                    {dictionary.services.buttonText}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

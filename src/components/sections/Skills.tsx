"use client"

import type { SoftwareSkill } from '../../lib/types';
import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Separator } from '../ui/separator';

const SkillItem = ({ skill }: { skill: string }) => {
  return (
    <li className="group [perspective:1000px]">
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className="flex items-center gap-2 [backface-visibility:hidden]">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <span className="text-foreground/80">{skill}</span>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 flex items-center gap-2 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">{skill}</span>
        </div>
      </div>
    </li>
  );
};

interface SkillsProps {
  softSkills: string[];
  hardSkills: string[];
  softwareSkills: SoftwareSkill[];
  dictionary: any;
}

export default function Skills({ softSkills, hardSkills, softwareSkills, dictionary }: SkillsProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the section is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationClass = (isInView: boolean, delay: string = 'delay-0') => 
    `transition-all duration-1000 ${delay} [transform-style:preserve-3d] ${
      isInView ? 'opacity-100 [transform:rotateX(0deg)]' : 'opacity-0 [transform:rotateX(-90deg)]'
    }`;

  return (
    <section id="skills" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {dictionary.skills.title}
          </h2>
        </div>

        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className="mt-16"
        >
          {/* Soft Skills */}
          <div className={animationClass(isInView, 'delay-200')}>
            <h3 className="mb-6 text-center text-2xl font-semibold text-primary">
              {dictionary.skills.softSkills}
            </h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {softSkills.map((skill, index) => (
                <SkillItem key={`soft-${index}`} skill={skill} />
              ))}
            </ul>
          </div>

          <Separator className="my-12" />

          {/* Hard Skills */}
          <div className={animationClass(isInView, 'delay-400')}>
            <h3 className="mb-6 text-center text-2xl font-semibold text-primary">
              {dictionary.skills.hardSkills}
            </h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hardSkills.map((skill, index) => (
                <SkillItem key={`hard-${index}`} skill={skill} />
              ))}
            </ul>
          </div>

          <Separator className="my-12" />

          {/* Software Skills */}
          <div className={animationClass(isInView, 'delay-600')}>
            <h3 className="mb-6 text-center text-2xl font-semibold text-primary">
              {dictionary.skills.softwareSkills}
            </h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {softwareSkills.map((software, index) => (
                <div
                  key={`software-${index}`}
                  className="group relative flex flex-col items-center gap-3 rounded-lg bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110">
                    <img
                      src={software.iconUrl}
                      alt={software.name}
                      className="h-8 w-8 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-primary">
                    {software.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

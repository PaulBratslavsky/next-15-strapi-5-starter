import { ArrowRight } from "lucide-react";

import { TextShimmer } from "@/components/magicui/text-shimmer";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Particles } from "@/components/magicui/particles";

import { StrapiImage } from "@/components/strapi/strapi-image";

export function Hero() {
  return (
    <section className="relative mx-auto px-6 text-center md:px-8 pt-32 max-w-[80rem]">
      <div className="inline-flex h-7 items-center justify-between rounded-full border bg-secondary text-secondary-foreground px-3 text-xs transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in">
        <TextShimmer className="inline-flex items-center justify-center">
          <span className="text-xs text-secondary-foreground/60">
            ✨ Introducing Magic UI Template
          </span>
          <ArrowRight
            size={20}
            className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </TextShimmer>
      </div>
      <h1 className="bg-gradient-to-br from-foreground from-30% to-foreground/40 bg-clip-text py-6 text-center text-5xl font-medium font-heading leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] caret-foreground">
        Magic UI is the new way to build landing pages.
      </h1>
      <p className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] max-w-xl mx-auto">
        Beautifully designed, animated components and templates built with Tailwind CSS, React and
        Framer Motion.
      </p>
      <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg opacity-0 ease-in-out [--animation-delay:600ms]">
        <span>Get Started for free</span>
        <ArrowRight
          size={20}
          className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        />
      </Button>
      <div className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]">
        <div className="rounded-xl border border-white/10 bg-white/10 bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,hsl(var(--accent)),hsl(var(--accent)),transparent_40%)] before:animate-image-glow before:opacity-0">
          <BorderBeam size={200} anchor={90} duration={10} borderWidth={1.5} />
          <StrapiImage
            alt="Hero Image"
            src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg"
            className="relative w-full h-full rounded-[inherit] object-contain border"
            width={1080}
            height={600}
          />
        </div>
      </div>
      <Particles
        ease={70}
        size={0.05}
        color="#ffffff"
        quantity={100}
        staticity={40}
        className="absolute inset-0 -z-10 h-full"
      />
    </section>
  );
}

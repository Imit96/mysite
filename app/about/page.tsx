import { CTABanner } from "@/components/shared/cta-banner";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "About | Ojo Oluwatimileyin",
  description: "I'm a Creative Director & Developer based in Lagos, Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center mb-32">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl bg-muted">
            <Image
              src="/images/about/portrait.jpg"
              alt="Ojo Oluwatimileyin"
              fill
              priority
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-8">
              I'm Ojo Oluwatimileyin.
            </h1>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p>
                I'm a Creative Director & Developer based in Lagos, Nigeria. I design, build, and produce digital experiences across every medium — from code to camera to sound.
              </p>
              <p>
                My journey started with curiosity. I picked up a camera before I wrote my first line of code. I was producing beats before I knew what brand strategy meant. Over time, these disciplines didn't just coexist — they started reinforcing each other. Photography taught me composition in UI design. Music production taught me rhythm in interaction design. Code gave me the power to bring every creative idea to life without depending on anyone else.
              </p>
              <p>
                Today, I work with startups, creative agencies, artists, and enterprises who want a creative partner — not just a specialist in one thing. I see the whole picture, and I build accordingly.
              </p>
            </div>
          </div>
        </div>

        {/* PHILOSOPHY */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">What I Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 font-heading">Integration Over Isolation</h3>
              <p className="text-muted-foreground leading-relaxed">
                The best work happens when strategy, design, code, and content are shaped by the same mind. Handoffs create gaps. Unified vision creates coherence.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 font-heading">Craft Over Speed</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'd rather deliver something exceptional on a thoughtful timeline than something average on a rushed one. Quality compounds.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 font-heading">Partnership Over Transactions</h3>
              <p className="text-muted-foreground leading-relaxed">
                I invest in understanding your business, your audience, and your goals. The projects that work best are the ones where I'm treated as a creative partner, not a vendor.
              </p>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">Tools & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Development</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>React, Next.js, TypeScript</li>
                <li>Node.js, Python</li>
                <li>PostgreSQL, MongoDB</li>
                <li>REST APIs, GraphQL</li>
                <li>Git, Vercel, AWS</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Design</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Figma, Framer</li>
                <li>Adobe Creative Suite</li>
                <li>Prototyping</li>
                <li>Design Systems</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Brand</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Brand Strategy</li>
                <li>Visual Identity</li>
                <li>Naming, Positioning</li>
                <li>Brand Guidelines</li>
                <li>Market Research</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Photography & Video</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Canon / Sony</li>
                <li>Lightroom</li>
                <li>Premiere Pro</li>
                <li>After Effects, DaVinci Resolve</li>
                <li>Drone Operation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Audio & Music</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Ableton Live, Logic Pro, FL Studio</li>
                <li>Sound Design</li>
                <li>Mixing & Mastering</li>
                <li>MIDI, Synthesis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CTABanner 
         title="Want to work together?"
         subtitle="I am currently taking on new projects."
         primaryButtonText="Reach Out"
         primaryButtonHref="/contact"
      />
    </div>
  );
}

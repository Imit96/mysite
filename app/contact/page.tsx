import { ContactForm } from "@/components/shared/contact-form";
import { Linkedin, Github, Twitter, Instagram, Music } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata = {
  title: "Contact | Ojo Oluwatimileyin",
  description: "Have a project in mind? Fill out the form below or book a discovery call.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex-grow">
        {/* HERO */}
        <FadeIn className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
            Let's Create Something.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            Have a project in mind? Fill out the form below or book a discovery call.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
          {/* LEFT: FORM */}
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>

          {/* RIGHT: INFO & CALENDLY */}
          <FadeIn delay={0.2} className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">Prefer to talk?</h3>
            <p className="text-base text-muted-foreground mb-8">Book a free 30-minute discovery call.</p>

            <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-sm mb-12 bg-muted relative">
               <iframe
                 src={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com"}
                 width="100%"
                 height="100%"
                 frameBorder="0"
                 loading="lazy"
                 title="Book a Discovery Call"
               />
            </div>

            <div className="mb-12">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Direct Email</p>
              <a href="mailto:hello@ojotimileyin.com" className="text-lg font-medium hover:text-primary transition-colors underline underline-offset-4">
                hello@ojotimileyin.com
              </a>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Follow Me</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Music className="w-5 h-5" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

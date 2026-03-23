import { CTABanner } from "@/components/shared/cta-banner";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";

export const metadata = {
  title: "Services | Ojo Oluwatimileyin",
  description: "I offer end-to-end creative and technical solutions — individually or as integrated packages.",
};

export default function ServicesPage() {

  return (
    <div className="flex flex-col w-full">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* HERO */}
        <div className="mb-24">
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6">Services</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            I offer end-to-end creative and technical solutions — individually or as integrated packages.
          </p>
        </div>

        {/* SERVICES LIST */}
        <div className="space-y-32">
          {SERVICES.map((svc, index) => {
            const isEven = index % 2 === 1;
            const Icon = svc.icon;
            
            return (
              <section key={svc.id} id={svc.id} className="scroll-m-32">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${isEven ? 'lg:rtl' : ''}`}>
                  <div className={`bg-muted rounded-3xl aspect-square lg:aspect-[4/3] flex items-center justify-center ${isEven ? 'lg:order-2' : ''}`}>
                    <Icon className="w-24 h-24 text-primary opacity-50" />
                  </div>
                  
                  <div className={`flex flex-col ${isEven ? 'lg:order-1 lg:ltr' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold font-mono text-muted-foreground w-12 border-b-2 border-primary pb-2">
                        0{index + 1}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold">{svc.title}</h2>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {svc.description}
                    </p>
                    
                    <div className="mb-8">
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">What's Included</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {svc.includes.map(item => (
                          <li key={item} className="flex items-start text-muted-foreground">
                            <span className="text-primary mr-2">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-10">
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Ideal For</h3>
                      <p className="text-foreground font-medium">{svc.idealFor}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Link 
                        href={`/services/${svc.id}`}
                        className={buttonVariants({ variant: "default" })}
                      >
                        Explore Process & Work →
                      </Link>
                      <Link 
                        href={`/contact?service=${svc.id}`}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        Start a Project
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <CTABanner 
         title="Not sure what you need?"
         subtitle="Book a free discovery call and I'll help you figure it out."
         primaryButtonText="Book a Call"
         primaryButtonHref="https://calendly.com"
         secondaryButtonText="Send a Message"
         secondaryButtonHref="/contact"
      />
    </div>
  );
}

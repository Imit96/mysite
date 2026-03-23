import Link from "next/link"
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="w-full bg-[hsl(240,10%,8%)] dark:bg-[hsl(240,10%,4%)] text-white pt-24 pb-12 px-6 md:px-12 lg:px-20 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* CTA Strip */}
        <div className="pb-24 border-b border-white/10 mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-white">
            Have a project in mind?
          </h2>
          <Link 
            href="/contact"
            className="text-xl md:text-2xl text-primary hover:text-white transition-colors flex items-center gap-4"
          >
            Let's work together <span>→</span>
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold tracking-tight mb-4 block text-white">
              OJO<span className="text-primary">.</span>
            </Link>
            <p className="text-white/60 mb-2 font-medium">Creative Director & Developer</p>
            <p className="text-white/40 text-sm max-w-[250px]">{SITE_CONFIG.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/services/digital-products" className="hover:text-primary transition-colors">Digital Products</Link></li>
              <li><Link href="/services/brand-identity" className="hover:text-primary transition-colors">Brand & Identity</Link></li>
              <li><Link href="/services/visual-content" className="hover:text-primary transition-colors">Visual Content</Link></li>
              <li><Link href="/services/audio-music" className="hover:text-primary transition-colors">Audio & Music</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-sm">Connect</h4>
            <ul className="space-y-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm pt-8 border-t border-white/10">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed & built by me.</p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from "react-router-dom";
import { Mail, MapPin, Facebook, Instagram } from "lucide-react";
import malinkyLogo from "@/assets/malinky-logo.png";

const footerLinks = {
  classes: [
    { name: "Malinky Classes", href: "/class-finder" },
    { name: "Private Group Classes", href: "/classes#private-group-classes" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Private Lessons", href: "/private-lessons" },
    { name: "Library Programs", href: "/library-programs" },
    { name: "Contact", href: "mailto:info@malinkymusic.com" },
  ],
  support: [
    { name: "FAQs", href: "/faqs" },
    { name: "Cancellation Policy", href: "/policies" },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90">
      {/* Main Footer */}
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={malinkyLogo} 
                alt="Malinky Music" 
                className="h-12 w-auto"
              />
              <span className="font-display text-xl font-bold text-background">
                Malinky<span className="text-primary">Music</span>
              </span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              Joyful music classes for ages 0 - 5 across San Francisco and the Bay Area.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/Malinky-Music-61571842494222/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/malinky.music/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Classes Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-4">Classes</h3>
            <ul className="space-y-3">
              {footerLinks.classes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-4">Company</h3>
            <ul className="space-y-3">
            {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>San Francisco, CA</span>
              </li>
              <li>
                <a
                  href="mailto:info@malinkymusic.com"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>info@malinkymusic.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Malinky Music. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-background/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-background/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

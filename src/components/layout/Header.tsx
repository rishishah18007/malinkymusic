import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import malinkyLogo from "@/assets/malinky-logo.png";

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Classes",
    href: "/classes",
    children: [
      { name: "All Classes", href: "/classes" },
      { name: "Find a Class", href: "/class-finder" },
    ],
  },
  { name: "Private Lessons", href: "/private-lessons" },
  { name: "Library Programs", href: "/library-programs" },
  {
    name: "Parties & Events",
    href: "/parties-events",
    children: [
      { name: "Birthday Parties", href: "/parties-events#birthday-parties" },
      { name: "Private Group Classes", href: "/parties-events#private-group-classes" },
    ],
  },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container-page flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={malinkyLogo} 
            alt="Malinky Music" 
            className="h-12 w-auto lg:h-14 transition-transform group-hover:scale-105"
          />
          <span className="font-display text-xl font-bold text-foreground lg:text-2xl">
            Malinky<span className="text-primary">Music</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-1">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              item.children?.some((c) => c.href === location.pathname);
            if (item.children) {
              return (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                    <div className="min-w-[200px] rounded-lg border border-border bg-popover shadow-md p-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            location.pathname === child.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>


        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link to="/classes">
            <Button size="sm" className="shadow-soft">
              Book a Class
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border animate-fade-in">
          <div className="container-page py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          location.pathname === child.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <Link to="/classes" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center">
                  Book a Class
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

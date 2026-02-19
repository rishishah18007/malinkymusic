import { Link } from "react-router-dom";
import { ArrowRight, Music2, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-music-class.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/20 animate-float-note">
          <Music2 className="h-8 w-8" />
        </div>
        <div className="absolute top-40 right-20 text-secondary/40 animate-float-note animation-delay-200">
          <Music2 className="h-6 w-6" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-accent/40 animate-float-note animation-delay-300">
          <Star className="h-5 w-5" />
        </div>
        <div className="absolute bottom-60 right-1/3 text-primary/20 animate-float-note animation-delay-400">
          <Heart className="h-6 w-6" />
        </div>
      </div>

      <div className="container-page py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now enrolling for Winter 2025
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Connection in{" "}
              <span className="text-gradient-primary">Every Note</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              At Malinky Music, every song becomes a chance for you and your child to 
              <strong className="text-foreground"> bond, grow, and play</strong>. 
              Joyful music classes for ages 0–5 across San Francisco Bay Area.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link to="/class-finder">
                <Button size="lg" className="w-full sm:w-auto text-base shadow-hover group">
                  Find Your Class
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/classes">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  Browse All Classes
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-glow">
              <img
                src={heroImage}
                alt="Parents and children enjoying a music class together"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-card rounded-2xl p-4 shadow-card animate-bounce-gentle">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary text-tertiary-foreground">
                  <Music2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Award-Winning</p>
                  <p className="text-xs text-muted-foreground">PLAY Curriculum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

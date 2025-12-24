import { Search, CalendarCheck, Music, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Class",
    description: "Use our easy Class Finder to discover the perfect fit based on your child's age and your schedule.",
  },
  {
    icon: CalendarCheck,
    title: "Book Online",
    description: "Reserve your spot in seconds. Flexible booking with easy rescheduling if plans change.",
  },
  {
    icon: Music,
    title: "Make Music Together",
    description: "Join us for 45 minutes of joyful singing, dancing, and instrument play with your little one.",
  },
  {
    icon: Heart,
    title: "Watch Them Grow",
    description: "See your child's confidence, creativity, and connection blossom week after week.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with Malinky Music is simple. Here's what to expect.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              {/* Step Number */}
              <div className="relative inline-flex">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-glow hover:scale-110">
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

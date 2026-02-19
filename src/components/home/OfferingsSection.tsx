import { AgeGroupCard } from "@/components/ui/AgeGroupCard";
import babyClassImage from "@/assets/baby-class.jpg";
import toddlerClassImage from "@/assets/toddler-class.jpg";
import preschoolClassImage from "@/assets/preschool-class.jpg";

const offerings = [
  {
    title: "Baby & Me",
    ageRange: "0-12 months",
    description: "Gentle rhythms and lullabies for you and your little one. Build early bonds through music.",
    image: babyClassImage,
    href: "/classes?age=0-1",
    color: "primary" as const,
  },
  {
    title: "Toddler Tunes",
    ageRange: "1-3 years",
    description: "Energetic songs, movement, and instruments. Watch your toddler's personality shine!",
    image: toddlerClassImage,
    href: "/classes?age=1-3",
    color: "secondary" as const,
  },
  {
    title: "Preschool Beats",
    ageRange: "3-5 years",
    description: "Collaborative music-making, dancing, and storytelling through song.",
    image: preschoolClassImage,
    href: "/classes?age=3-5",
    color: "accent" as const,
  },
];

export function OfferingsSection() {
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Classes for Every Stage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From first giggles to first dance moves, we have the perfect class for your growing child.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AgeGroupCard {...offering} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgeGroupCardProps {
  title: string;
  ageRange: string;
  description: string;
  image: string;
  href: string;
  color: "primary" | "secondary" | "accent";
}

const colorVariants = {
  primary: "from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10",
  secondary: "from-secondary/30 to-secondary/10 hover:from-secondary/40 hover:to-secondary/15",
  accent: "from-accent/30 to-accent/10 hover:from-accent/40 hover:to-accent/15",
};

const iconColors = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

export function AgeGroupCard({ title, ageRange, description, image, href, color }: AgeGroupCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex flex-col items-center rounded-3xl p-6 lg:p-8 bg-gradient-to-br transition-all duration-300 hover:shadow-hover hover:-translate-y-2",
        colorVariants[color]
      )}
    >
      {/* Image Circle */}
      <div className="relative mb-6">
        <div className="h-32 w-32 lg:h-40 lg:w-40 overflow-hidden rounded-full border-4 border-background shadow-card transition-transform duration-300 group-hover:scale-105">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Floating age badge */}
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-bold shadow-soft",
          iconColors[color]
        )}>
          {ageRange}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground text-center">
        {title}
      </h3>
      <p className="mt-3 text-sm lg:text-base text-muted-foreground text-center leading-relaxed max-w-xs">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
        <span>View Classes</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

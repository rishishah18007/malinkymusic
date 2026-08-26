import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ClassData {
  id: string;
  title: string;
  ageRange: string;
  description: string;
  image: string;
  schedule: string;
  time: string;
  location: string;
  startDate?: string | null;
  spotsLeft: number;
  totalSpots: number;
  price: number;
  featured?: boolean;
  registrationUrl?: string | null;
}

interface ClassCardProps {
  classData: ClassData;
  variant?: "default" | "compact";
}

export function ClassCard({ classData, variant = "default" }: ClassCardProps) {
  const spotsPercentage = (classData.spotsLeft / classData.totalSpots) * 100;
  const isAlmostFull = spotsPercentage <= 25;
  const isFull = classData.spotsLeft === 0;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1",
        classData.featured && "ring-2 ring-primary"
      )}
    >
      {/* Featured Badge */}
      {classData.featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-accent text-accent-foreground font-semibold">
            Popular
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={classData.image}
          alt={classData.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Age Badge on Image */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
            Ages {classData.ageRange}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {classData.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {classData.description}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <span>{classData.schedule}{classData.startDate ? ` • Starts ${classData.startDate}` : ""}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <span>{classData.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="truncate">{classData.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-end pt-2 border-t border-border">
          <span className="text-lg font-bold text-foreground">
            ${classData.price}<span className="text-sm font-normal text-muted-foreground">/class</span>
          </span>
        </div>

        {/* CTA */}
        {classData.registrationUrl ? (
          <a href={classData.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button className="w-full mt-2">Book This Class</Button>
          </a>
        ) : (
          <Link to={`/classes/${classData.id}`}>
            <Button className="w-full mt-2">Book This Class</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

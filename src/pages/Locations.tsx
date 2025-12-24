import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  {
    name: "Mission District Studio",
    address: "2345 Valencia Street, San Francisco, CA 94110",
    neighborhoods: ["Mission District", "Bernal Heights", "Potrero Hill"],
    hours: "Mon-Sat: 9:00 AM - 5:00 PM",
    phone: "(415) 555-0101",
    description: "Our flagship studio in the heart of the Mission, featuring bright, open spaces and easy street parking.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    classTypes: ["Baby & Me", "Toddler Tunes", "Spanish Classes"],
  },
  {
    name: "Pacific Heights Center",
    address: "1890 Fillmore Street, San Francisco, CA 94115",
    neighborhoods: ["Pacific Heights", "Japantown", "Western Addition"],
    hours: "Tue-Sat: 9:30 AM - 4:30 PM",
    phone: "(415) 555-0102",
    description: "A cozy, welcoming space on Fillmore with excellent public transit access.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    classTypes: ["Baby & Me", "Toddler Tunes", "Preschool Beats"],
  },
  {
    name: "Noe Valley Studio",
    address: "3856 24th Street, San Francisco, CA 94114",
    neighborhoods: ["Noe Valley", "Castro", "Glen Park"],
    hours: "Mon, Wed, Fri, Sat: 9:00 AM - 3:00 PM",
    phone: "(415) 555-0103",
    description: "A charming neighborhood studio perfect for our Noe Valley community families.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop",
    classTypes: ["Baby & Me", "Little Movers", "Music Explorers"],
  },
];

export default function LocationsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground animate-fade-in-up">
            Our Locations
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Find a Malinky Music studio near you. We have welcoming spaces across San Francisco's favorite neighborhoods.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="space-y-12">
            {locations.map((location, index) => (
              <div
                key={location.name}
                className={cn(
                  "grid gap-8 lg:grid-cols-2 items-center animate-fade-in-up",
                  index % 2 === 1 && "lg:flex-row-reverse"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className={cn("order-1", index % 2 === 1 && "lg:order-2")}>
                  <div className="relative rounded-3xl overflow-hidden shadow-card group">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-72 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        {location.neighborhoods[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={cn("order-2 space-y-6", index % 2 === 1 && "lg:order-1")}>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    {location.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {location.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{location.address}</p>
                        <p className="text-sm text-muted-foreground">
                          Serving: {location.neighborhoods.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{location.hours}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-foreground hover:text-primary transition-colors">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Classes offered:</p>
                    <div className="flex flex-wrap gap-2">
                      {location.classTypes.map((classType) => (
                        <span
                          key={classType}
                          className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                        >
                          {classType}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to={`/classes?location=${location.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button className="gap-2 group">
                      View Classes at This Location
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood SEO Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Music Classes Near You
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We proudly serve families across San Francisco's diverse neighborhoods.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Mission District",
              "Pacific Heights",
              "Noe Valley",
              "Bernal Heights",
              "Potrero Hill",
              "Castro",
              "Glen Park",
              "Western Addition",
            ].map((neighborhood) => (
              <Link
                key={neighborhood}
                to={`/classes?neighborhood=${neighborhood.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between rounded-xl bg-card p-4 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {neighborhood}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Can't Decide Which Location?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Use our Class Finder to discover the perfect class based on your child's age, schedule, and location preferences.
          </p>
          <Link to="/class-finder">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90"
            >
              Find Your Perfect Class
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

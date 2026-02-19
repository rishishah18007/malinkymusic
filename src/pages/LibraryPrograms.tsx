import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Library, Calendar, MapPin, Clock, Music, ChevronDown } from "lucide-react";
import libraryProgramPhoto from "@/assets/library-program.jpg";

const LibraryPrograms = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-tertiary/10 to-secondary/10 py-14 lg:py-20">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-secondary/20 animate-float-note">
          <Music className="h-12 w-12" />
        </div>
        <div className="absolute bottom-16 right-16 text-tertiary/20 animate-float-note animation-delay-300">
          <Music className="h-10 w-10" />
        </div>
        <div className="absolute top-1/2 right-10 text-primary/10 animate-bounce-gentle">
          <Library className="h-14 w-14" />
        </div>
        <div className="container-page text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-5 py-2.5 text-sm font-semibold text-primary mb-6 shadow-soft">
            <Library className="h-4 w-4" />
            Community Programs
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Library Programs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Malinky Music partners with local libraries to bring <span className="font-semibold text-primary">free music classes</span> to families in our community. 
            Join us for singing, dancing, and musical fun!
          </p>
          <a href="#library-events" className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all duration-200">
            <Calendar className="h-5 w-5" />
            View Upcoming Events
            <ChevronDown className="h-4 w-4 animate-bounce-gentle" />
          </a>
        </div>
      </section>

      {/* About Library Programs */}
      <section className="py-10 lg:py-14">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Free Music Classes at Your Local Library
              </h2>
              <p className="text-muted-foreground mb-4">
                We believe every child deserves access to the joy of music education. That's why we partner 
                with libraries throughout the Bay Area to offer free, drop-in music classes for families.
              </p>
              <p className="text-muted-foreground mb-6">
                Our library programs feature the same engaging songs, instruments, and activities as our 
                regular classes—just in a community setting that's open to all!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/class-finder">
                  <Button size="lg">
                    Find a Library Class
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn About Malinky
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-tertiary/20 to-secondary/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card">
                <img src={libraryProgramPhoto} alt="Malinky Music library program" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Library Events */}
      <section id="library-events" className="py-10 lg:py-14 bg-gradient-to-b from-muted/40 to-background relative overflow-hidden scroll-mt-4">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px), radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container-page relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-semibold text-secondary-foreground mb-4">
              <Calendar className="h-4 w-4" />
              Schedule
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Upcoming Library Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Find a free Malinky Music class at a library near you!
            </p>
          </div>
          <div className="grid gap-4 max-w-3xl mx-auto">
            {[
              {
                library: "Redwood Shores Branch Library",
                date: "February 7, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Monthly PLAY music and movement class! The first Saturday of every month.",
                month: "FEB",
                day: "7",
              },
              {
                library: "Redwood Shores Branch Library",
                date: "March 7, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Monthly PLAY music and movement class! The first Saturday of every month.",
                month: "MAR",
                day: "7",
              },
              {
                library: "San Francisco Public Library – Sunset Branch",
                date: "April 18, 2025",
                time: "4:30 PM – 5:00 PM",
                description: "Bilingual music & movement class.",
                month: "APR",
                day: "18",
              },
              {
                library: "San Francisco Public Library – Mission Branch",
                date: "April 26, 2025",
                time: "1:00 PM – 1:45 PM",
                description: "Día de Los Niños/Libros Celebration!",
                month: "APR",
                day: "26",
              },
              {
                library: "Redwood Shores Branch Library",
                date: "May 2, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Monthly PLAY music and movement class! The first Saturday of every month.",
                month: "MAY",
                day: "2",
              },
              {
                library: "Redwood Shores Branch Library",
                date: "June 6, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Monthly PLAY music and movement class! The first Saturday of every month.",
                month: "JUN",
                day: "6",
              },
              {
                library: "Redwood Shores Branch Library",
                date: "July 5, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Monthly PLAY music and movement class! The first Saturday of every month.",
                month: "JUL",
                day: "5",
              },
              {
                library: "Sunnyvale Library",
                date: "July 21, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Bilingual Spanish-English music and movement class.",
                month: "JUL",
                day: "21",
              },
              {
                library: "Redwood Shores Branch Library",
                date: "August 8, 2025",
                time: "11:00 AM – 11:30 AM",
                description: "Monthly PLAY music and movement class! The first Saturday of every month.",
                month: "AUG",
                day: "8",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="group flex gap-5 bg-background rounded-2xl shadow-soft p-5 sm:p-6 border border-border/40 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent left border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-tertiary via-primary to-secondary rounded-l-2xl" />
                {/* Date badge */}
                <div className="flex-shrink-0 w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-tertiary flex flex-col items-center justify-center text-tertiary-foreground shadow-sm ml-2" style={{ width: '4.5rem', height: '4.5rem' }}>
                  <span className="text-[0.6rem] sm:text-[0.7rem] font-bold tracking-widest uppercase opacity-90">{event.month}</span>
                  <span className="text-2xl sm:text-3xl font-bold leading-none">{event.day}</span>
                </div>
                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                    {event.library}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{event.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 italic leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Want More Music?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Love our library programs? Check out our full class schedule for more opportunities 
            to make music with your little one.
          </p>
          <Link to="/classes">
            <Button size="lg">
              View All Classes
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default LibraryPrograms;

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Library, Calendar } from "lucide-react";
import libraryProgramPhoto from "@/assets/library-program.jpg";

const LibraryPrograms = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 lg:py-24">
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Library className="h-4 w-4" />
            Community Programs
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Library Programs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Malinky Music partners with local libraries to bring free music classes to families in our community. 
            Join us for singing, dancing, and musical fun!
          </p>
        </div>
      </section>

      {/* About Library Programs */}
      <section className="py-16 lg:py-24">
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
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src={libraryProgramPhoto} alt="Malinky Music library program" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Library Events */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
            Upcoming Library Events
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find a free Malinky Music class at a library near you!
          </p>
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
                className="flex gap-4 bg-background rounded-xl shadow-soft p-4 sm:p-5 border border-border/50 hover:shadow-card transition-shadow duration-200"
              >
                {/* Date badge */}
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary flex flex-col items-center justify-center text-primary-foreground">
                  <span className="text-[0.65rem] sm:text-xs font-bold tracking-wider uppercase">{event.month}</span>
                  <span className="text-xl sm:text-2xl font-bold leading-none">{event.day}</span>
                </div>
                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm sm:text-base leading-tight">
                    {event.library}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-primary">
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{event.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 italic">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
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

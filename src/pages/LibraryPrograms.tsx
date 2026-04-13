import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Library, Calendar, MapPin, Clock, Music } from "lucide-react";
import libraryProgramPhoto from "@/assets/library-program.jpg";

const LibraryPrograms = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-tertiary/10 to-secondary/10 py-10 lg:py-14">
        <div className="absolute top-10 left-10 text-secondary/20 animate-float-note">
          <Music className="h-12 w-12" />
        </div>
        <div className="absolute bottom-16 right-16 text-tertiary/20 animate-float-note animation-delay-300">
          <Music className="h-10 w-10" />
        </div>
        <div className="container-page text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-5 py-2.5 text-sm font-semibold text-primary mb-4 shadow-soft">
            <Library className="h-4 w-4" />
            Community Programs
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Library Programs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Malinky Music partners with local libraries to bring <span className="font-semibold text-primary">free music classes</span> to families in our community. 
            Join us for singing, dancing, and musical fun!
          </p>
        </div>
      </section>

      {/* Upcoming Library Events */}
      <section className="py-8 lg:py-12 bg-gradient-to-b from-muted/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px), radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container-page relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-semibold text-secondary-foreground mb-3">
              <Calendar className="h-4 w-4" />
              Schedule
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Upcoming Library Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Find a free Malinky Music class at a library near you!
            </p>
          </div>
          <div className="grid gap-3 max-w-3xl mx-auto">
            {[
              { library: "Montclair Branch Library", date: "April 9, 2026", time: "10:30 AM", description: "Día de Los Niños/Libros Celebration! 1687 Mountain Blvd, Oakland, CA 94611", month: "APR", day: "9" },
              { library: "Rockridge Branch Library", date: "April 16, 2026", time: "10:30 AM", description: "Día de Los Niños/Libros Celebration! 5366 College Avenue, Oakland, CA", month: "APR", day: "16" },
              { library: "San Francisco Public Library – Sunset Branch", date: "April 18, 2026", time: "4:30 PM – 5:00 PM", description: "Bilingual music & movement class.", month: "APR", day: "18" },
              { library: "Little Treasures: A Market for Modern Families", date: "April 19, 2026", time: "11:00 AM & 12:00 PM", description: "Two bilingual shows located in the Ferry Building in San Francisco.", month: "APR", day: "19" },
              { library: "San Francisco Public Library – Mission Branch", date: "April 26, 2026", time: "1:00 PM – 1:45 PM", description: "Día de Los Niños/Libros Celebration!", month: "APR", day: "26" },
              { library: "Elmhurst Branch Library", date: "April 29, 2026", time: "1:00 PM", description: "Día de Los Niños/Libros Celebration! 1427 88th Ave, Oakland, CA 94621", month: "APR", day: "29" },
              { library: "Dimond Branch Library", date: "April 29, 2026", time: "3:00 PM", description: "Día de Los Niños/Libros Celebration! 3565 Fruitvale Ave, Oakland, CA 94602", month: "APR", day: "29" },
              { library: "Lakeview Branch Library", date: "April 30, 2026", time: "10:30 AM", description: "Día de Los Niños/Libros Celebration! 550 El Embarcadero, Oakland, CA 94610", month: "APR", day: "30" },
              { library: "Redwood Shores Branch Library", date: "May 2, 2026", time: "11:00 AM – 11:30 AM", description: "Monthly PLAY music and movement class! The first Saturday of every month.", month: "MAY", day: "2" },
              { library: "César E. Chávez Branch Library", date: "May 2, 2026", time: "2:00 PM – 3:00 PM", description: "Día de Los Niños/Libros Celebration! 3301 E. 12th St Ste 271, Oakland, CA 94601", month: "MAY", day: "2" },
              { library: "East Palo Alto Library", date: "June 10, 2026", time: "10:30 AM – 11:15 AM", description: "2415 University Avenue, East Palo Alto, CA 94303", month: "JUN", day: "10" },
              { library: "Redwood Shores Branch Library", date: "June 6, 2026", time: "11:00 AM – 11:30 AM", description: "Monthly PLAY music and movement class! The first Saturday of every month.", month: "JUN", day: "6" },
              { library: "Redwood Shores Branch Library", date: "July 5, 2026", time: "11:00 AM – 11:30 AM", description: "Monthly PLAY music and movement class! The first Saturday of every month.", month: "JUL", day: "5" },
              { library: "Woodside Library", date: "July 9, 2026", time: "10:30 AM – 11:15 AM", description: "3140 Woodside Road, Woodside, CA 94062", month: "JUL", day: "9" },
              { library: "Mercy Housing", date: "July 20, 2026", time: "10:30 AM – 11:15 AM", description: "2700 Middlefield Road, Redwood City, CA 94063", month: "JUL", day: "20" },
              { library: "Sunnyvale Library", date: "July 21, 2026", time: "11:00 AM – 11:30 AM", description: "Bilingual Spanish-English music and movement class.", month: "JUL", day: "21" },
              { library: "Brisbane Library", date: "July 23, 2026", time: "11:30 AM – 12:00 PM", description: "163 Visitacion Avenue, Brisbane, CA 94005", month: "JUL", day: "23" },
              { library: "Atherton Library", date: "July 25, 2026", time: "10:30 AM – 11:15 AM", description: "2 Dinkelspiel Station Lane, Atherton, CA 94027", month: "JUL", day: "25" },
              { library: "Millbrae Library", date: "July 26, 2026", time: "10:30 AM – 11:15 AM", description: "1 Library Avenue, Millbrae, CA 94030", month: "JUL", day: "26" },
              { library: "Portola Valley Library", date: "July 28, 2026", time: "10:30 AM – 11:15 AM", description: "765 Portola Road, Portola Valley, CA 94028", month: "JUL", day: "28" },
              { library: "Pacifica Sharp Park Library", date: "August 3, 2026", time: "10:15 AM – 11:00 AM", description: "104 Hilton Way, Pacifica, CA 94044", month: "AUG", day: "3" },
              { library: "Half Moon Bay Library", date: "August 5, 2026", time: "11:00 AM – 11:45 AM", description: "620 Correas Street, Half Moon Bay, CA 94019", month: "AUG", day: "5" },
              { library: "Redwood Shores Branch Library", date: "August 8, 2026", time: "11:00 AM – 11:30 AM", description: "Monthly PLAY music and movement class! The first Saturday of every month.", month: "AUG", day: "8" },
            ].map((event, index) => (
              <div
                key={index}
                className="group flex gap-5 bg-background rounded-2xl shadow-soft p-4 sm:p-5 border border-border/40 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-tertiary via-primary to-secondary rounded-l-2xl" />
                <div className="flex-shrink-0 rounded-2xl bg-tertiary flex flex-col items-center justify-center text-tertiary-foreground shadow-sm ml-2" style={{ width: '4.5rem', height: '4.5rem' }}>
                  <span className="text-[0.6rem] sm:text-[0.7rem] font-bold tracking-widest uppercase opacity-90">{event.month}</span>
                  <span className="text-2xl sm:text-3xl font-bold leading-none">{event.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                    {event.library}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{event.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 italic leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Library Programs */}
      <section className="py-8 lg:py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Free Music Classes at Your Local Library
              </h2>
              <p className="text-muted-foreground mb-3">
                We believe every child deserves access to the joy of music education. That's why we partner 
                with libraries throughout the Bay Area to offer free, drop-in music classes for families.
              </p>
              <p className="text-muted-foreground mb-5">
                Our library programs feature the same engaging songs, instruments, and activities as our 
                regular classes—just in a community setting that's open to all!
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn About Malinky
                </Button>
              </Link>
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

      {/* CTA */}
      <section className="py-8 lg:py-12">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Want More Music?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
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

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Library, Music, Users, Calendar, MapPin } from "lucide-react";
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

      {/* Features */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
            What to Expect
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-background rounded-xl p-6 shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Live Music</h3>
              <p className="text-sm text-muted-foreground">
                Engaging songs and melodies performed live for you and your little one
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">All Ages Welcome</h3>
              <p className="text-sm text-muted-foreground">
                Classes designed for babies, toddlers, and preschoolers with their caregivers
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Drop-In Format</h3>
              <p className="text-sm text-muted-foreground">
                No registration required—just show up and join the fun!
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Multiple Locations</h3>
              <p className="text-sm text-muted-foreground">
                Find a library program near you throughout the Bay Area
              </p>
            </div>
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

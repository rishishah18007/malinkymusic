import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Music, Users, Sparkles, Globe, BookOpen, Award, ExternalLink } from "lucide-react";
import emiliaPhoto from "@/assets/emilia-guitar.jpg";
import rishiPhoto from "@/assets/rishi-photo.jpg";
import ruthPhoto from "@/assets/ruth-photo.jpg";

const spotifyTracks = [
  { title: "Elefante", artists: "Cricket Sings, Emilia Lopez-Yañez", url: "https://open.spotify.com/track/5kE1Y0DkFGW9KYicjrZdeS" },
  { title: "Where Do I Live", artists: "Ruth and Emilia", url: "https://open.spotify.com/track/4rQo6Ib6BceDXczfpZ4agb" },
  { title: "Color Wheel Song", artists: "Cricket Sings, Emilia Lopez-Yañez", url: "https://open.spotify.com/track/5jik7cWJS9m4VfTbgVDfDW" },
  { title: "Bear's Birthday", artists: "Ruth and Emilia, Cricket Sings", url: "https://open.spotify.com/track/6hUkAtIhK3IhdPaTuygHMo" },
  { title: "Al Tambor", artists: "Cricket Sings, Emilia Lopez-Yañez", url: "https://open.spotify.com/track/2WLgktygpZRlJRsc7JlYbb" },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-tertiary/10 to-secondary/10 py-12 lg:py-18">
        <div className="absolute top-8 right-12 text-secondary/15 animate-float-note">
          <Music className="h-12 w-12" />
        </div>
        <div className="container-page text-center relative z-10">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Welcome to Malinky Music
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fostering a joyful community of tiny humans and their families through music, movement, and meaningful connection.
          </p>
        </div>
      </section>

      {/* About & Why Malinky */}
      <section className="py-10 lg:py-14">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-4 w-4" />
                About Malinky Music
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why "Malinky?"
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The word Malinky, which means "tiny" in Czech, has been passed down through generations of founder Emilia Lopez-Yañez's family. It was a term of endearment often used by her grandmother, who immigrated from the Czech Republic, and later adopted by Emilia's aunts when they opened a children's clothing store in Aguascalientes, Mexico.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With so many cherished memories attached to the name, Emilia felt it was the perfect choice when starting her own children's business.
              </p>
            </div>
            <div className="relative group flex justify-center">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-tertiary/20 to-secondary/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative h-72 w-72 lg:h-80 lg:w-80 rounded-full overflow-hidden shadow-card border-4 border-primary/20">
                <img src={emiliaPhoto} alt="Emilia Lopez-Yañez, founder of Malinky Music" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-10 lg:py-14 bg-muted/30">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-semibold text-secondary-foreground mb-4">
              <Heart className="h-4 w-4" />
              Our Mission
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-5">
              Connection in Every Note
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Our mission is to foster a joyful community of tiny humans and their families, creating moments of laughter, connection, and musical memories that will be treasured for generations.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Through our different musical offerings, we aim to support the developmental milestones of children ages 0–5. Engaging with music and movement at this early stage can enhance language skills, improve motor development, boost emotional expression, and encourage social bonding. By nurturing these essential skills, we hope to inspire a lifelong love for learning and creativity while celebrating the magic of childhood together.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-10 lg:py-14">
        <div className="container-page">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
            Why We Are Different
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/40 hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Bilingual Classes</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We put an emphasis on bilingual Spanish-English classes designed to immerse young children in both languages through music, play, and engaging activities.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/40 hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Community & Connection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These classes support language development, cultural awareness, and social skills, creating a fun and interactive environment for children and families to learn together.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/40 hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary-foreground mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Award-Winning Curriculum</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We partner with incredible programs and musicians, utilizing the PLAY curriculum and collaborating with award-winning artists to bring the best music education experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 lg:py-14 bg-muted/30">
        <div className="container-page">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
            About Our Partners
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* PLAY */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Music className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">PLAY Music</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                While pursuing her master's degree in oboe performance at USC, Emilia discovered a vibrant music school near her apartment. She reached out to co-owner Anne Kelly-Saxenmeyer, and what began as a simple inquiry evolved into a deep mentorship. Anne not only trained Emilia to become a music and movement teacher, but also offered invaluable guidance and support.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When Malinky Music was born, Emilia knew she didn't want to embark on this journey without Anne and the expertise of PLAY music. That's why we're thrilled to be utilizing the PLAY curriculum in our Malinky classes.
              </p>
              <a href="https://www.playfamily.co/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-3 hover:underline">
                Visit PLAY <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            {/* Ruth and Emilia */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">Ruth and Emilia</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Emilia and her mother Ruth began working together on their first children's album, <em>Me and the Kids</em>, when Emilia was only 3 years old. Together they have performed and recorded several award-winning, Billboard-charting albums in classical, new age, and world music.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Their most recent kids projects focus on spreading positive messages about friendship, working together, and making the world a better place. Their albums have received Parents' Choice Awards, John Lennon Songwriting Contest Grand Prize, NAPPA, Hollywood Music in Media Award nominations, and more.
              </p>
              <a href="https://www.ruthandemilia.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-3 hover:underline">
                Visit Ruth & Emilia <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-10 lg:py-14">
        <div className="container-page">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
            Meet the Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-card mx-auto mb-4">
                <img src={emiliaPhoto} alt="Emilia Lopez-Yañez" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">Emilia Lopez-Yañez</h3>
              <p className="text-primary font-medium text-sm mb-2">Founder & Lead Instructor</p>
              <p className="text-muted-foreground text-sm">
                With a master's in music performance and 10 years as a music educator, Emilia is dedicated to creating a nurturing and engaging environment for children and their caregivers.
              </p>
            </div>
            <div className="text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-tertiary/20 shadow-card mx-auto mb-4">
                <img src={rishiPhoto} alt="Rishi Shah" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">Rishi Shah</h3>
              <p className="text-primary font-medium text-sm mb-2">Founder</p>
              <p className="text-muted-foreground text-sm">
                Rishi brings his vast business and marketing expertise to Malinky Music. He is excited to help foster a love for music in children through engaging and enriching experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-secondary/20 shadow-card mx-auto mb-4">
                <img src={ruthPhoto} alt="Ruth Weber" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">Ruth Weber</h3>
              <p className="text-primary font-medium text-sm mb-2">Co-Writer & Developer</p>
              <p className="text-muted-foreground text-sm">
                Ruth is an award-winning musician and the brilliant mind behind many Malinky songs. Her albums have received Parents' Choice Awards, Hollywood Music in Media Awards, the John Lennon Songwriting Contest, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Music */}
      <section className="py-10 lg:py-14 bg-gradient-to-b from-muted/40 to-background">
        <div className="container-page">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-tertiary/20 px-4 py-2 text-sm font-semibold text-foreground mb-3">
              <Music className="h-4 w-4" />
              Our Music
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Take a Listen!
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Collaborating with our wonderful, award-winning partners, we strive to bring the Bay Area the best music for children, their caregivers, and their educators!
            </p>
          </div>
          <div className="grid gap-3 max-w-2xl mx-auto">
            {spotifyTracks.map((track) => (
              <a
                key={track.title}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-card rounded-xl p-4 shadow-soft border border-border/40 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary flex-shrink-0 group-hover:bg-tertiary group-hover:text-tertiary-foreground transition-colors duration-300">
                  <Music className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors">{track.title}</h3>
                  <p className="text-xs text-muted-foreground">{track.artists}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              When you register for a session of Malinky Music classes, you'll get access to PLAY web materials including sheet music, lyrics, video guides, and ideas for activities to do at home.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-14 bg-gradient-hero">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Join Our Musical Family?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-6">
            Experience the joy of Malinky Music for yourself. Find a class that's perfect for you and your little one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/class-finder">
              <Button size="lg" className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90">
                Find Your Class
              </Button>
            </Link>
            <Link to="/classes">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                View All Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

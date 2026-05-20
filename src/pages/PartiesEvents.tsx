import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Cake, Users } from "lucide-react";

export default function PartiesEvents() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location]);

  return (
    <Layout>
      <Seo
        title="Parties & Events | Malinky Music"
        description="Celebrate with Malinky Music — birthday parties and private group classes filled with joyful music and movement for little ones in the Bay Area."
        path="/parties-events"
      />

      {/* Hero */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">
            Parties & Events
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Bring the joy of Malinky Music to your celebration or group.
          </p>
        </div>
      </section>

      {/* Birthday Parties */}
      <section id="birthday-parties" className="py-12 lg:py-16 scroll-mt-24">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-secondary/20 text-secondary-foreground mb-6">
              <Cake className="h-7 w-7" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Birthday Parties
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Celebrate your little one's special day with a Malinky Music birthday party! Our energetic, interactive sessions are packed with songs, instruments, movement, and play that delight children and their grown-ups alike.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              With packages starting at $290, we bring everything you need for a joyful, music-filled celebration — you provide the cake. Our teachers will bring 45 minutes of music, instruments, props, and a playlist customized with your child's favorite songs.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdpUpS4xkojYuHpLsc6YArcLobWEO4bnrfWmQkYyRwnisDrCg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                Request a Party Booking
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Private Group Classes */}
      <section id="private-group-classes" className="py-12 lg:py-16 bg-muted/40 scroll-mt-24">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/15 text-primary mb-6">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Private Group Classes
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Host a private group class and bring the fun of Malinky music into your own space, with your own group, on your schedule. Utilizing the renowned PLAY curriculum, our group music and movement classes are 40-45 minutes of fun, interactive music and play for children.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              With six, eight, and ten week options, all you need to start is a location in the Bay Area and 4 more friends who want to join in the magic.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc5WwQvJjJ8r41Zx1uu-jUMumGzxUFZZIDMMQFhgbCaMPoC7A/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                Inquire Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

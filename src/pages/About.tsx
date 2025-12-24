import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Music, Users, Award, BookOpen, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Connection First",
    description: "Every class is designed to strengthen the bond between you and your child through the magic of music.",
  },
  {
    icon: Music,
    title: "Joy in Learning",
    description: "We believe the best learning happens when children are laughing, moving, and fully engaged.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a welcoming community of families who share your love for music and early childhood development.",
  },
  {
    icon: Award,
    title: "Award-Winning Curriculum",
    description: "Our PLAY curriculum is designed by early childhood experts and backed by research.",
  },
];

const team = [
  {
    name: "Maria Santos",
    role: "Founder & Lead Instructor",
    bio: "Maria founded Malinky Music with a vision to bring joyful, research-based music education to Bay Area families.",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Emily Chen",
    role: "Music Director",
    bio: "With a background in early childhood music education, Emily creates our magical class experiences.",
    image: "https://i.pravatar.cc/300?img=24",
  },
  {
    name: "James Wilson",
    role: "Program Coordinator",
    bio: "James ensures every family has a smooth experience from booking to class completion.",
    image: "https://i.pravatar.cc/300?img=14",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 lg:py-24">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground animate-fade-in-up">
            Our Story
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            Malinky Music was born from a simple belief: that music is one of the most powerful 
            ways for parents and children to connect, grow, and create lasting memories together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Connection in Every Note
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Malinky Music, we're more than just a music class. We're a place where families 
                come to slow down, be present, and experience the pure joy of making music together.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our name "Malinky" comes from a Scottish word meaning "small" or "little one" — a 
                reminder that we celebrate every little person who walks through our doors and 
                every small moment of connection that happens in our classes.
              </p>
              <Link to="/classes">
                <Button size="lg">Explore Our Classes</Button>
              </Link>
            </div>
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=600&fit=crop"
                  alt="Parent and child enjoying music together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-card max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Families Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container-page">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              What We Believe
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do at Malinky Music.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate educators dedicated to creating magical musical moments.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative inline-block mb-6">
                  <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-card mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Join Our Musical Family?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Experience the joy of Malinky Music for yourself. Find a class that's perfect for you and your little one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/class-finder">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90"
              >
                Find Your Class
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

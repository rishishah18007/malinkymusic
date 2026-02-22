import { Layout } from "@/components/layout/Layout";
import emiliaPhoto from "@/assets/emilia-portrait.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Music, Video, GraduationCap, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const lessonPricing = [
  {
    duration: "30 minutes",
    price: 50,
    description: "Perfect for beginners and young learners",
  },
  {
    duration: "45 minutes",
    price: 75,
    description: "Ideal for students of all ages and levels",
    popular: true,
  },
  {
    duration: "60 minutes",
    price: 100,
    description: "Comprehensive lessons for students wanting to dive deep and excel",
  },
];

const lessonTypes = [
  {
    title: "Voice Lessons",
    icon: Music,
    description: "Develop your vocal technique, range, and performance skills with personalized instruction.",
  },
  {
    title: "Oboe Lessons",
    icon: Music,
    description: "Master the oboe with expert guidance on technique, tone production, and musicality.",
  },
];

// Placeholder testimonials - user will add real ones later
const testimonials = [
  {
    name: "Student Name",
    content: "Add your testimonial here. Share your experience with private lessons.",
    rating: 5,
  },
  {
    name: "Student Name",
    content: "Add your testimonial here. Share your experience with private lessons.",
    rating: 5,
  },
  {
    name: "Student Name",
    content: "Add your testimonial here. Share your experience with private lessons.",
    rating: 5,
  },
];

export default function PrivateLessons() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-warm">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Private <span className="text-primary">Lessons</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Personalized voice and oboe instruction for students ages 5 and up. 
              Develop your musical talents with one-on-one guidance from an experienced performer and educator.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" variant="hero">
                  Get Started
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Types */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Lessons Offered
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from voice or oboe lessons, available in-person at our Laurel Heights studio or online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {lessonTypes.map((lesson) => (
              <Card key={lesson.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <lesson.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{lesson.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Location Options */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-soft">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">In-Person: Laurel Heights Studio</span>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-soft">
              <Video className="h-5 w-5 text-secondary" />
              <span className="font-medium">Online Lessons Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Teacher */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Meet Your Teacher
              </h2>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="h-48 w-48 lg:h-60 lg:w-60 rounded-full overflow-hidden">
                      <img src={emiliaPhoto} alt="Emilia - Voice & Oboe Instructor" className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      Emilia
                    </h3>
                    <p className="text-primary font-medium mb-4">Voice & Oboe Instructor</p>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Emilia has been an active teacher and performer throughout California for over a decade. She holds Bachelor's and Master's degrees in Music Performance from USC and Chapman University, bringing strong technical expertise and a deep passion for music to every lesson.
                      </p>
                      <p>
                        Her students have been accepted into prestigious universities, the San Francisco Youth Symphony, and renowned summer festivals. Emilia works closely with each student to achieve their goals—whether that means earning a lead role in a musical or simply building the confidence to sing at karaoke. Every milestone matters.
                      </p>
                      <p>
                        As a freelance musician, Emilia has performed at Carnegie Hall, Davies Symphony Hall, and the Hollywood Bowl. She most recently served as principal oboe in Jacob Collier's debut Audience Orchestra and has recorded on film and video game soundtracks, as well as Billboard-charting albums alongside artists including Alan White (YES) and Dan Aykroyd.
                      </p>
                      <p>
                        Emilia is excited to continue sharing her love of music and helping each student grow with confidence and artistry.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-20 bg-background">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Lesson Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible lesson lengths to fit your schedule and goals. All prices are per lesson.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {lessonPricing.map((option) => (
              <Card 
                key={option.duration} 
                className={`relative ${option.popular ? 'border-2 border-primary shadow-glow' : 'border-2'}`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="font-display text-xl">{option.duration}</CardTitle>
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    ${option.price}
                  </div>
                  <p className="text-sm text-muted-foreground">per lesson</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-6">{option.description}</p>
                  <Link to="/auth">
                    <Button 
                      variant={option.popular ? "default" : "outline"} 
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            * For students ages 5 and up. Contact us for package deals and sibling discounts.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-page">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What Students Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students who have grown their musical abilities with private lessons.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-12">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-full">
                    <div className="relative bg-card rounded-2xl p-8 lg:p-10 shadow-card animate-fade-in">
                      <div className="absolute -top-4 left-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                          <Quote className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="flex gap-1 mb-6 justify-center">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                        ))}
                      </div>

                      <p className="text-foreground text-lg leading-relaxed text-center mb-8 italic">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center justify-center gap-4 pt-6 border-t border-border">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <p className="font-semibold text-foreground text-lg">— {testimonial.name}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Book your first lesson today and discover the joy of learning voice or oboe with personalized instruction.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="shadow-soft">
              Schedule a Lesson
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

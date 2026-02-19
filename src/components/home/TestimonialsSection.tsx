import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Nelli",
    content: "We have really enjoyed Malinky music class! My baby really loves dancing to the music. The teacher is an excellent singer and keeps the babies really engaged... Highly recommend to any parent looking for a great baby music class!",
    rating: 5,
  },
  {
    name: "Kendall",
    content: "Malinky music is so wonderful! The songs are engaging and so fun... My son loves all the props and instruments she brings. Emilia is gentle, welcoming, kind, energetic, and FUN! Cannot recommend her classes more!",
    rating: 5,
  },
  {
    name: "Ashley",
    content: "Emilia is fantastic! She is so warm and wonderful to be around... We look forward to our weekly sessions with her and would recommend anyone looking for a fun class and sense of community to come join!",
    rating: 5,
  },
  {
    name: "Kyla",
    content: "Emilia is wonderful! My daughter has attended her music classes since she was around 9 months old. At that time she would listen to the songs and explore the instruments handed to her. Now, she is almost 15 months and has started dancing to the music... There is something for all ages and all developmental stages!",
    rating: 5,
  },
];

export function TestimonialsSection() {
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
    <section className="py-10 lg:py-14 bg-background">
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            What Families Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of happy families who've found their musical home with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
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
                <CarouselItem key={testimonial.name} className="md:basis-full">
                  <div
                    className="relative bg-card rounded-2xl p-8 lg:p-10 shadow-card animate-fade-in"
                  >
                    {/* Quote Icon */}
                    <div className="absolute -top-4 left-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                        <Quote className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6 justify-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-foreground text-lg leading-relaxed text-center mb-8 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
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

          {/* Dots indicator */}
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
  );
}

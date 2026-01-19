import { Star, Quote } from "lucide-react";

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
  return (
    <section className="py-16 lg:py-24 bg-background">
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

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative bg-card rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  <Quote className="h-5 w-5" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">— {testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

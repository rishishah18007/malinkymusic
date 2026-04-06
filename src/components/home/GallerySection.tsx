import { useEffect, useRef, useState } from "react";

import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";
import gallery5 from "@/assets/gallery/gallery-5.jpg";
import gallery6 from "@/assets/gallery/gallery-6.jpg";
import gallery7 from "@/assets/gallery/gallery-7.jpg";
import gallery8 from "@/assets/gallery/gallery-8.jpg";

const images = [
  { src: gallery1, alt: "Parent and child enjoying music class together in the park" },
  { src: gallery2, alt: "Malinky Music teacher playing guitar outdoors with a toddler" },
  { src: gallery3, alt: "Children playing under a parachute during outdoor music class" },
  { src: gallery4, alt: "Malinky Music teacher singing joyfully outdoors at the Presidio" },
  { src: gallery5, alt: "Mother and baby playing with egg shakers at outdoor music class" },
  { src: gallery6, alt: "Mom holding baby while toddler plays with shakers at the Presidio" },
  { src: gallery7, alt: "Smiling baby held up by mom at outdoor music class" },
  { src: gallery8, alt: "Toddler playing with maracas during outdoor music class" },
];

export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate images enough times for seamless infinite scroll
  const displayImages = [...images, ...images, ...images, ...images];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const step = () => {
      if (!isHovered) {
        scrollPos += speed;
        // Reset when we've scrolled through half (since we duplicated 4x, reset at 2x)
        const halfScroll = container.scrollWidth / 2;
        if (scrollPos >= halfScroll) {
          scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <section className="py-10 lg:py-14 bg-muted/30 overflow-hidden">
      <div className="container-page mb-8 text-center animate-fade-in-up">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          The Malinky Vibe
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Music, movement, and connection — here's what our classes look like in action.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden cursor-grab"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96 aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

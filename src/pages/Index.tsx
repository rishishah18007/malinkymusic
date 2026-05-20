import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { HeroSection } from "@/components/home/HeroSection";
import { OfferingsSection } from "@/components/home/OfferingsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Seo
        title="Malinky Music | Music Classes for Ages 0-5 in SF"
        description="Joyful music classes for babies, toddlers, and preschoolers across San Francisco and the Bay Area."
        path="/"
      />
      <HeroSection />
      <OfferingsSection />
      <GallerySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { OfferingsSection } from "@/components/home/OfferingsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
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

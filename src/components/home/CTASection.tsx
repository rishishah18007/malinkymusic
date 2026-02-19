import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-10 lg:py-14 bg-gradient-hero">
      <div className="container-page text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-background/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Limited spots available this season</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Ready to Start Your Musical Journey?
          </h2>

          <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find the perfect class for your family. Your first class is just a click away!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/class-finder">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto text-base shadow-lg group bg-background text-foreground hover:bg-background/90"
              >
                Find Your Class
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="https://malinkymusic.us12.list-manage.com/subscribe/post?u=10e007957d12bac66b194f1a8&id=6e3d977210&f_id=003066e9f0" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Mail className="mr-2 h-4 w-4" />
                Join Our Mailing List
              </Button>
            </a>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

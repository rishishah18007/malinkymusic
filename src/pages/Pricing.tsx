import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingPlans = [
  {
    name: "Drop-In",
    description: "Perfect for trying us out or occasional visits",
    price: 35,
    period: "per class",
    features: [
      "Single class admission",
      "Full class experience",
      "Instrument lending",
      "No commitment required",
    ],
    popular: false,
    cta: "Book a Drop-In",
  },
  {
    name: "4-Class Pack",
    description: "Our most popular option for regular attendees",
    price: 120,
    period: "4 classes",
    pricePerClass: 30,
    features: [
      "4 classes to use within 6 weeks",
      "Save $20 vs drop-in rate",
      "Flexible scheduling",
      "Make-up class option",
      "Priority booking access",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    name: "8-Class Pack",
    description: "Best value for committed music lovers",
    price: 200,
    period: "8 classes",
    pricePerClass: 25,
    features: [
      "8 classes to use within 10 weeks",
      "Save $80 vs drop-in rate",
      "Flexible scheduling",
      "Unlimited make-up classes",
      "Priority booking access",
      "Early access to special events",
    ],
    popular: false,
    cta: "Best Value",
  },
];

const faqs = [
  {
    question: "What should we bring to class?",
    answer: "Just yourselves and comfortable clothes! We provide all instruments and materials. Feel free to bring a water bottle and a small snack for after class.",
  },
  {
    question: "Can I try a class before committing?",
    answer: "Absolutely! We offer a complimentary trial class for new families. It's the perfect way to see if Malinky Music is the right fit for you and your child.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "We understand life with little ones can be unpredictable. You can cancel or reschedule up to 4 hours before class for full credit. Late cancellations forfeit that class credit.",
  },
  {
    question: "Do class packs expire?",
    answer: "Yes, to ensure classes stay fresh and spots available for all families. 4-class packs expire in 6 weeks, 8-class packs in 10 weeks. Extensions available for special circumstances.",
  },
  {
    question: "Can siblings attend together?",
    answer: "Each child needs their own registration, but we offer a 15% sibling discount! Siblings can attend the same class if they're in the appropriate age range.",
  },
  {
    question: "What if my child is between age groups?",
    answer: "We're happy to help you choose the best fit. Generally, we recommend the younger class for children on the cusp, but you're welcome to try both and see where your child thrives.",
  },
];

export default function PricingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground animate-fade-in-up">
            Simple, Flexible Pricing
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Choose the option that works best for your family. No hidden fees, no long-term contracts.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-3xl p-8 animate-fade-in-up",
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-glow scale-105 z-10"
                    : "bg-card text-foreground shadow-card"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-sm font-semibold shadow-soft">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                  <p className={cn(
                    "mt-2 text-sm",
                    plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={cn(
                      "text-sm",
                      plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      /{plan.period}
                    </span>
                  </div>
                  {plan.pricePerClass && (
                    <p className={cn(
                      "mt-1 text-sm",
                      plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      ${plan.pricePerClass} per class
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={cn(
                        "h-5 w-5 shrink-0 mt-0.5",
                        plan.popular ? "text-accent" : "text-primary"
                      )} />
                      <span className={cn(
                        "text-sm",
                        plan.popular ? "text-primary-foreground/90" : "text-foreground"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/classes">
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-background text-foreground hover:bg-background/90"
                        : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Pay What You Can Note */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="bg-tertiary/10 rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Pay-What-You-Can Option
              </h3>
              <p className="text-muted-foreground">
                We believe music should be accessible to all families. If cost is a barrier, 
                please reach out to discuss our sliding scale options. No child will be turned away for financial reasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container-page">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <HelpCircle className="h-4 w-4" />
              <span>Questions?</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-display text-lg font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

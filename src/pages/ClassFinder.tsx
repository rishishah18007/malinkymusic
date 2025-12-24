import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ClassCard, ClassData } from "@/components/ui/ClassCard";
import { ArrowLeft, ArrowRight, Baby, MapPin, Calendar, Sparkles, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import babyClassImage from "@/assets/baby-class.jpg";
import toddlerClassImage from "@/assets/toddler-class.jpg";
import preschoolClassImage from "@/assets/preschool-class.jpg";

interface Question {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: "age",
    title: "How old is your child?",
    subtitle: "We'll find classes perfectly suited to their developmental stage.",
    icon: Baby,
    options: [
      { value: "0-12", label: "0-12 months", description: "Newborns & crawlers" },
      { value: "1-2", label: "1-2 years", description: "New walkers & talkers" },
      { value: "2-3", label: "2-3 years", description: "Active toddlers" },
      { value: "3-5", label: "3-5 years", description: "Preschoolers" },
    ],
  },
  {
    id: "location",
    title: "Where are you located?",
    subtitle: "We'll show you classes closest to your neighborhood.",
    icon: MapPin,
    options: [
      { value: "mission", label: "Mission District", description: "Valencia & 24th St" },
      { value: "pacific-heights", label: "Pacific Heights", description: "Fillmore St" },
      { value: "noe-valley", label: "Noe Valley", description: "24th St & Church" },
      { value: "any", label: "I'm flexible", description: "Show all locations" },
    ],
  },
  {
    id: "schedule",
    title: "What days work best?",
    subtitle: "Select your preferred schedule.",
    icon: Calendar,
    options: [
      { value: "weekday-morning", label: "Weekday Mornings", description: "Mon-Fri before noon" },
      { value: "weekday-afternoon", label: "Weekday Afternoons", description: "Mon-Fri after noon" },
      { value: "weekend", label: "Weekends", description: "Saturday & Sunday" },
      { value: "any", label: "I'm flexible", description: "Any time works" },
    ],
  },
];

// Sample recommended classes based on answers
const getRecommendedClasses = (answers: Record<string, string>): ClassData[] => {
  // In a real app, this would filter from a database
  const allClasses: ClassData[] = [
    {
      id: "1",
      title: "Baby & Me Music",
      ageRange: "0-12 months",
      description: "Gentle rhythms and lullabies to bond with your baby through the power of music.",
      image: babyClassImage,
      schedule: "Mondays",
      time: "10:00 AM - 10:45 AM",
      location: "Mission District Studio",
      spotsLeft: 3,
      totalSpots: 12,
      price: 35,
      featured: true,
    },
    {
      id: "2",
      title: "Toddler Tunes",
      ageRange: "1-2 years",
      description: "Energetic songs, movement, and simple instruments for curious toddlers.",
      image: toddlerClassImage,
      schedule: "Tuesdays & Thursdays",
      time: "9:30 AM - 10:15 AM",
      location: "Pacific Heights Center",
      spotsLeft: 5,
      totalSpots: 10,
      price: 35,
    },
    {
      id: "3",
      title: "Little Movers",
      ageRange: "2-3 years",
      description: "Dance, sing, and explore rhythm with high-energy activities for active toddlers.",
      image: toddlerClassImage,
      schedule: "Wednesdays",
      time: "11:00 AM - 11:45 AM",
      location: "Noe Valley Studio",
      spotsLeft: 8,
      totalSpots: 12,
      price: 35,
    },
    {
      id: "4",
      title: "Preschool Beats",
      ageRange: "3-4 years",
      description: "Collaborative music-making with instruments, singing, and creative expression.",
      image: preschoolClassImage,
      schedule: "Fridays",
      time: "3:30 PM - 4:15 PM",
      location: "Mission District Studio",
      spotsLeft: 2,
      totalSpots: 10,
      price: 40,
      featured: true,
    },
  ];

  return allClasses.slice(0, 3);
};

export default function ClassFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendedClasses = getRecommendedClasses(answers);

  if (showResults) {
    return (
      <Layout>
        <section className="py-12 lg:py-20">
          <div className="container-page">
            {/* Results Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-tertiary/20 px-4 py-2 text-sm font-medium text-tertiary mb-4">
                <Sparkles className="h-4 w-4" />
                <span>We found your perfect matches!</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                Your Recommended Classes
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Based on your preferences, here are the classes we think you and your little one will love.
              </p>
            </div>

            {/* Your Selections Summary */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {Object.entries(answers).map(([questionId, value]) => {
                const question = questions.find((q) => q.id === questionId);
                const option = question?.options.find((o) => o.value === value);
                return (
                  <div
                    key={questionId}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-foreground font-medium">{option?.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Recommended Classes */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {recommendedClasses.map((classItem, index) => (
                <div
                  key={classItem.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ClassCard classData={classItem} />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={handleReset}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Start Over
              </Button>
              <Link to="/classes">
                <Button>
                  Browse All Classes
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center py-12 lg:py-20">
        <div className="container-page w-full">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <currentQuestion.icon className="h-8 w-8" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {currentQuestion.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-4 sm:grid-cols-2 mb-12">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={cn(
                    "group relative flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all duration-200 hover:-translate-y-1",
                    answers[currentQuestion.id] === option.value
                      ? "border-primary bg-primary/5 shadow-hover"
                      : "border-border bg-card hover:border-primary/50 hover:shadow-card"
                  )}
                >
                  {/* Selected Check */}
                  {answers[currentQuestion.id] === option.value && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <span className="font-display text-lg font-bold text-foreground">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-1 text-sm text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="gap-2"
              >
                {currentStep === questions.length - 1 ? "See My Classes" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

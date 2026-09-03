import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ClassCard, ClassData } from "@/components/ui/ClassCard";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
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
    id: "location",
    title: "Where are you located?",
    subtitle: "We'll show you the class closest to your neighborhood.",
    icon: MapPin,
    options: [
      { value: "inner-sunset", label: "Inner Sunset", description: "Near Outer Village" },
      { value: "presidio", label: "Presidio", description: "Near Canvas Church" },
      { value: "inner-richmond", label: "Inner Richmond", description: "Near Mountain Lake Park" },
      { value: "sausalito", label: "Sausalito", description: "Mini Anna Photo Studio" },
      { value: "any", label: "I'm flexible", description: "Show all locations" },
    ],
  },
  {
    id: "schedule",
    title: "What days work best?",
    subtitle: "Select your preferred schedule.",
    icon: Calendar,
    options: [
      { value: "monday-morning", label: "Monday Mornings", description: "10:00 AM at the Presidio" },
      { value: "tuesday-morning", label: "Tuesday Mornings", description: "10:15 AM at Outer Village" },
      { value: "wednesday-morning", label: "Wednesday Mornings", description: "10:00 AM in Sausalito" },
      { value: "thursday-morning", label: "Thursday Mornings", description: "10:00 AM at Mountain Lake Park" },
      { value: "any", label: "I'm flexible", description: "Any time works" },
    ],
  },
];

// Same fallback images / ordering as the All Classes page so images match
const classImages = [toddlerClassImage, preschoolClassImage, babyClassImage];
const getImageForIndex = (index: number): string => classImages[index % classImages.length];

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const formatDate = (date: string): string => {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const useClasses = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        .from("classes")
        .select(`
          id,
          title,
          description,
          age_group,
          schedule,
          start_time,
          end_time,
          day_of_week,
          start_date,
          price,
          capacity,
          is_featured,
          image_url,
          registration_url,
          locations ( id, name )
        `)
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching classes:", error);
        setIsLoading(false);
        return;
      }

      if (data) {
        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const sorted = [...data].sort((a, b) => {
          if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
          return dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week);
        });
        setClasses(
          sorted.map((cls, index) => ({
            id: cls.id,
            title: cls.title,
            ageRange: cls.age_group,
            description: cls.description || "",
            image: cls.image_url || getImageForIndex(index),
            schedule: cls.schedule,
            time:
              cls.start_time === "00:00:00" && cls.end_time === "00:00:00"
                ? "TBD"
                : `${formatTime(cls.start_time)} - ${formatTime(cls.end_time)}`,
            location: cls.locations?.name || "TBD",
            startDate: cls.start_date ? formatDate(cls.start_date) : null,
            spotsLeft: Math.floor(Math.random() * cls.capacity),
            totalSpots: cls.capacity,
            price: Number(cls.price),
            featured: cls.is_featured,
            registrationUrl: (cls as any).registration_url,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchClasses();
  }, []);

  return { classes, isLoading };
};

const matchesLocationFor = (locAnswer: string | undefined, cls: ClassData) =>
  !locAnswer || locAnswer === "any" ||
  (locAnswer === "inner-sunset" && cls.location.includes("Outer Village")) ||
  (locAnswer === "presidio" && (cls.location.includes("Presidio") || cls.location.includes("Canvas Church") || cls.location.includes("Main Parade Lawn"))) ||
  (locAnswer === "inner-richmond" && cls.location.includes("Mountain Lake Park")) ||
  (locAnswer === "sausalito" && (cls.location.includes("Sausalito") || cls.location.includes("Mini Anna") || cls.title.includes("Sausalito")));

const matchesScheduleFor = (schedAnswer: string | undefined, cls: ClassData) =>
  !schedAnswer || schedAnswer === "any" ||
  (schedAnswer === "monday-morning" && cls.schedule.includes("Monday")) ||
  (schedAnswer === "tuesday-morning" && cls.schedule.includes("Tuesday")) ||
  (schedAnswer === "wednesday-morning" && cls.schedule.includes("Wednesday")) ||
  (schedAnswer === "thursday-morning" && cls.schedule.includes("Thursday"));

// Filter classes based on answers
const getRecommendedClasses = (answers: Record<string, string>, allClasses: ClassData[]): ClassData[] => {
  const locAnswer = answers.location;
  const schedAnswer = answers.schedule;

  const matchesLocation = (cls: ClassData) => matchesLocationFor(locAnswer, cls);
  const matchesSchedule = (cls: ClassData) => matchesScheduleFor(schedAnswer, cls);

  // First try exact matches (both location and schedule)
  const exactMatches = allClasses.filter(cls => matchesLocation(cls) && matchesSchedule(cls));

  // If exact matches exist, return them; otherwise return classes matching either preference
  if (exactMatches.length > 0) return exactMatches;

  return allClasses.filter(cls => matchesLocation(cls) || matchesSchedule(cls));
};



export default function ClassFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { classes: allClasses, isLoading } = useClasses();

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

  const recommendedClasses = getRecommendedClasses(answers, allClasses);

  // Determine if we're showing exact or broad matches for messaging
  const locAnswer = answers.location;
  const schedAnswer = answers.schedule;
  const hasExactMatch = recommendedClasses.some(
    (cls) => matchesLocationFor(locAnswer, cls) && matchesScheduleFor(schedAnswer, cls)
  );

  if (showResults) {
    return (
      <Layout>
        <Seo
          title="Class Finder | Malinky Music"
          description="Find the right Malinky Music class for your child by location, age, and schedule."
          path="/class-finder"
        />
        <section className="py-12 lg:py-20">
          <div className="container-page">
            {/* Results Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-tertiary/20 px-4 py-2 text-sm font-medium text-tertiary mb-4">
                <Sparkles className="h-4 w-4" />
                <span>{hasExactMatch ? "We found your perfect matches!" : "Here are your closest options!"}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                {hasExactMatch ? "Your Recommended Classes" : "Closest Available Classes"}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {hasExactMatch
                  ? "Based on your preferences, here are the classes we think you and your little one will love."
                  : "No single class matches both your location and schedule preferences, so we're showing you classes that fit either one."}
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
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
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
            )}


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
      <Seo
        title="Class Finder | Malinky Music"
        description="Find the right Malinky Music class for your child by location, age, and schedule."
        path="/class-finder"
      />
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

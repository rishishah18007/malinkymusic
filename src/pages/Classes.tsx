import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ClassCard, ClassData } from "@/components/ui/ClassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar, Baby } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import babyClassImage from "@/assets/baby-class.jpg";
import toddlerClassImage from "@/assets/toddler-class.jpg";
import preschoolClassImage from "@/assets/preschool-class.jpg";

// Sample class data
const sampleClasses: ClassData[] = [
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
    spotsLeft: 0,
    totalSpots: 10,
    price: 40,
    featured: true,
  },
  {
    id: "5",
    title: "Music Explorers",
    ageRange: "4-5 years",
    description: "Advanced music concepts through play, storytelling, and instrument exploration.",
    image: preschoolClassImage,
    schedule: "Saturdays",
    time: "10:00 AM - 10:45 AM",
    location: "Pacific Heights Center",
    spotsLeft: 6,
    totalSpots: 10,
    price: 40,
  },
  {
    id: "6",
    title: "Spanish Music Class",
    ageRange: "0-5 years",
    description: "Bilingual music class featuring traditional Spanish songs and rhythms.",
    image: babyClassImage,
    schedule: "Saturdays",
    time: "11:30 AM - 12:15 PM",
    location: "Mission District Studio",
    spotsLeft: 4,
    totalSpots: 12,
    price: 40,
  },
];

const ageFilters = [
  { value: "all", label: "All Ages" },
  { value: "0-1", label: "0-12 months" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
];

const locationFilters = [
  { value: "all", label: "All Locations" },
  { value: "mission", label: "Mission District" },
  { value: "pacific-heights", label: "Pacific Heights" },
  { value: "noe-valley", label: "Noe Valley" },
];

const dayFilters = [
  { value: "all", label: "Any Day" },
  { value: "weekday", label: "Weekdays" },
  { value: "weekend", label: "Weekends" },
];

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");

  // Simple filtering logic (would be more sophisticated with real data)
  const filteredClasses = sampleClasses.filter((classItem) => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-12 lg:py-20">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">
            Find Your Perfect Class
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Browse our joyful music classes for babies, toddlers, and preschoolers across San Francisco.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-card border-b border-border sticky top-16 lg:top-20 z-40">
        <div className="container-page py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Baby className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  {ageFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[160px]">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locationFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dayFilter} onValueChange={setDayFilter}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {dayFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class Finder CTA */}
            <Link to="/class-finder" className="lg:ml-auto">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Guided Class Finder
              </Button>
            </Link>
          </div>

          {/* Active Filters */}
          {(ageFilter !== "all" || locationFilter !== "all" || dayFilter !== "all") && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {ageFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {ageFilters.find(f => f.value === ageFilter)?.label}
                  <button onClick={() => setAgeFilter("all")} className="ml-1 hover:text-primary">×</button>
                </Badge>
              )}
              {locationFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {locationFilters.find(f => f.value === locationFilter)?.label}
                  <button onClick={() => setLocationFilter("all")} className="ml-1 hover:text-primary">×</button>
                </Badge>
              )}
              {dayFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {dayFilters.find(f => f.value === dayFilter)?.label}
                  <button onClick={() => setDayFilter("all")} className="ml-1 hover:text-primary">×</button>
                </Badge>
              )}
              <button
                onClick={() => {
                  setAgeFilter("all");
                  setLocationFilter("all");
                  setDayFilter("all");
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <strong className="text-foreground">{filteredClasses.length}</strong> classes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((classItem, index) => (
              <div
                key={classItem.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ClassCard classData={classItem} />
              </div>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No classes found matching your criteria.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setAgeFilter("all");
                setLocationFilter("all");
                setDayFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

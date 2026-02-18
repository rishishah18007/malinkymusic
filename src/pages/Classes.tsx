import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ClassCard, ClassData } from "@/components/ui/ClassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar, Baby, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import babyClassImage from "@/assets/baby-class.jpg";
import toddlerClassImage from "@/assets/toddler-class.jpg";
import preschoolClassImage from "@/assets/preschool-class.jpg";

const ageFilters = [
  { value: "all", label: "All Ages" },
  { value: "0-12 months", label: "0-12 months" },
  { value: "1-2 years", label: "1-2 years" },
  { value: "2-3 years", label: "2-3 years" },
  { value: "3-4 years", label: "3-4 years" },
  { value: "4-5 years", label: "4-5 years" },
];

const dayFilters = [
  { value: "all", label: "Any Day" },
  { value: "weekday", label: "Weekdays" },
  { value: "weekend", label: "Weekends" },
];

// Map age groups to images
const getImageForAgeGroup = (ageGroup: string): string => {
  if (ageGroup.includes("0-12") || ageGroup.includes("0-5")) return babyClassImage;
  if (ageGroup.includes("1-2") || ageGroup.includes("2-3")) return toddlerClassImage;
  return preschoolClassImage;
};

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const { data } = await supabase
      .from("locations")
      .select("id, name")
      .eq("is_active", true);
    
    if (data) {
      setLocations(data);
    }
  };

  const fetchClasses = async () => {
    setIsLoading(true);
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
        price,
        capacity,
        is_featured,
        image_url,
        registration_url,
        locations (
          id,
          name
        )
      `)
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching classes:", error);
      setIsLoading(false);
      return;
    }

    if (data) {
      const formattedClasses: ClassData[] = data.map((cls) => ({
        id: cls.id,
        title: cls.title,
        ageRange: cls.age_group,
        description: cls.description || "",
        image: cls.image_url || getImageForAgeGroup(cls.age_group),
        schedule: cls.schedule,
        time: `${formatTime(cls.start_time)} - ${formatTime(cls.end_time)}`,
        location: cls.locations?.name || "TBD",
        spotsLeft: Math.floor(Math.random() * cls.capacity), // TODO: Calculate from bookings
        totalSpots: cls.capacity,
        price: Number(cls.price),
        featured: cls.is_featured,
        registrationUrl: (cls as any).registration_url,
      }));
      setClasses(formattedClasses);
    }
    setIsLoading(false);
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Filter classes
  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch = 
      classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAge = ageFilter === "all" || classItem.ageRange === ageFilter;
    
    const matchesLocation = locationFilter === "all" || 
      classItem.location.toLowerCase().includes(
        locations.find(l => l.id === locationFilter)?.name.toLowerCase() || ""
      );

    const matchesDay = dayFilter === "all" || 
      (dayFilter === "weekend" && ["Saturday", "Sunday"].some(d => classItem.schedule.includes(d))) ||
      (dayFilter === "weekday" && !["Saturday", "Sunday"].some(d => classItem.schedule.includes(d)));

    return matchesSearch && matchesAge && matchesLocation && matchesDay;
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
                <SelectTrigger className="w-[180px]">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
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
                  {locations.find(l => l.id === locationFilter)?.name}
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
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

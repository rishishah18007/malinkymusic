import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStats {
  totalClasses: number;
  totalBookings: number;
  totalRevenue: number;
  activeLocations: number;
  upcomingSessions: number;
  waitlistEntries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClasses: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeLocations: 0,
    upcomingSessions: 0,
    waitlistEntries: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);

    // Fetch classes count
    const { count: classesCount } = await supabase
      .from("classes")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // Fetch bookings count
    const { count: bookingsCount } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true });

    // Fetch total revenue
    const { data: revenueData } = await supabase
      .from("bookings")
      .select("amount_paid")
      .eq("status", "confirmed");
    
    const totalRevenue = revenueData?.reduce((sum, b) => sum + (Number(b.amount_paid) || 0), 0) || 0;

    // Fetch active locations
    const { count: locationsCount } = await supabase
      .from("locations")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // Fetch upcoming sessions
    const { count: sessionsCount } = await supabase
      .from("class_sessions")
      .select("*", { count: "exact", head: true })
      .gte("session_date", new Date().toISOString().split("T")[0])
      .eq("is_cancelled", false);

    // Fetch waitlist entries
    const { count: waitlistCount } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // Fetch recent bookings
    const { data: bookings } = await supabase
      .from("bookings")
      .select(`
        id,
        status,
        amount_paid,
        created_at,
        profiles (full_name, email),
        class_sessions (
          session_date,
          classes (title)
        )
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    setStats({
      totalClasses: classesCount || 0,
      totalBookings: bookingsCount || 0,
      totalRevenue,
      activeLocations: locationsCount || 0,
      upcomingSessions: sessionsCount || 0,
      waitlistEntries: waitlistCount || 0,
    });

    setRecentBookings(bookings || []);
    setIsLoading(false);
  };

  const statCards = [
    {
      title: "Active Classes",
      value: stats.totalClasses,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-tertiary",
      bgColor: "bg-tertiary/10",
    },
    {
      title: "Locations",
      value: stats.activeLocations,
      icon: MapPin,
      color: "text-accent-foreground",
      bgColor: "bg-accent/30",
    },
    {
      title: "Upcoming Sessions",
      value: stats.upcomingSessions,
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "On Waitlist",
      value: stats.waitlistEntries,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your music classes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title} className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-display text-xl">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No bookings yet. Bookings will appear here once parents start registering.
            </p>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {booking.profiles?.full_name || "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.class_sessions?.classes?.title || "Class"} - {" "}
                      {new Date(booking.class_sessions?.session_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      ${booking.amount_paid || 0}
                    </p>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      booking.status === "confirmed" 
                        ? "bg-tertiary/20 text-tertiary" 
                        : booking.status === "cancelled"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-accent/30 text-accent-foreground"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

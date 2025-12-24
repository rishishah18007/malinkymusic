import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, TrendingUp, DollarSign, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { toast } from "sonner";

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

interface ClassRevenue {
  className: string;
  revenue: number;
  bookings: number;
}

export default function AdminRevenue() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("6months");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [avgBookingValue, setAvgBookingValue] = useState(0);
  const [monthlyData, setMonthlyData] = useState<RevenueData[]>([]);
  const [classRevenue, setClassRevenue] = useState<ClassRevenue[]>([]);

  useEffect(() => {
    fetchRevenueData();
  }, [timeRange]);

  const fetchRevenueData = async () => {
    setIsLoading(true);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    if (timeRange === "3months") {
      startDate.setMonth(startDate.getMonth() - 3);
    } else if (timeRange === "6months") {
      startDate.setMonth(startDate.getMonth() - 6);
    } else if (timeRange === "12months") {
      startDate.setMonth(startDate.getMonth() - 12);
    }

    // Fetch all bookings with revenue
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(`
        id,
        amount_paid,
        created_at,
        status,
        class_sessions (
          classes (title)
        )
      `)
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .eq("status", "confirmed");

    if (error) {
      toast.error("Failed to fetch revenue data");
      console.error(error);
      setIsLoading(false);
      return;
    }

    // Calculate totals
    const total = bookings?.reduce((sum, b) => sum + (Number(b.amount_paid) || 0), 0) || 0;
    const count = bookings?.length || 0;
    const avg = count > 0 ? total / count : 0;

    setTotalRevenue(total);
    setTotalBookings(count);
    setAvgBookingValue(avg);

    // Group by month
    const monthlyMap = new Map<string, { revenue: number; bookings: number }>();
    bookings?.forEach((booking) => {
      const date = new Date(booking.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthName = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      
      const existing = monthlyMap.get(monthName) || { revenue: 0, bookings: 0 };
      monthlyMap.set(monthName, {
        revenue: existing.revenue + (Number(booking.amount_paid) || 0),
        bookings: existing.bookings + 1,
      });
    });

    const monthlyArray: RevenueData[] = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        bookings: data.bookings,
      }))
      .sort((a, b) => {
        // Sort by date
        const parseMonth = (m: string) => {
          const [month, year] = m.split(" ");
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return parseInt(`20${year}`) * 100 + months.indexOf(month);
        };
        return parseMonth(a.month) - parseMonth(b.month);
      });

    setMonthlyData(monthlyArray);

    // Group by class
    const classMap = new Map<string, { revenue: number; bookings: number }>();
    bookings?.forEach((booking) => {
      const className = booking.class_sessions?.classes?.title || "Unknown";
      const existing = classMap.get(className) || { revenue: 0, bookings: 0 };
      classMap.set(className, {
        revenue: existing.revenue + (Number(booking.amount_paid) || 0),
        bookings: existing.bookings + 1,
      });
    });

    const classArray: ClassRevenue[] = Array.from(classMap.entries())
      .map(([className, data]) => ({
        className,
        revenue: data.revenue,
        bookings: data.bookings,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    setClassRevenue(classArray);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Revenue</h1>
          <p className="text-muted-foreground mt-1">
            Track your revenue and booking trends
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-tertiary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalBookings}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Booking Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${avgBookingValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Classes
            </CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{classRevenue.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Over Time */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No revenue data available for this period
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value}`, "Revenue"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue by Class */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display">Revenue by Class</CardTitle>
          </CardHeader>
          <CardContent>
            {classRevenue.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No class revenue data available
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classRevenue.slice(0, 5)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      type="number" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="className" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      width={100}
                      tickFormatter={(value) => value.length > 15 ? `${value.slice(0, 15)}...` : value}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Class Revenue Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-display">Revenue Breakdown by Class</CardTitle>
        </CardHeader>
        <CardContent>
          {classRevenue.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No revenue data to display. Revenue will appear here once bookings are made.
            </p>
          ) : (
            <div className="space-y-4">
              {classRevenue.map((cls, index) => (
                <div
                  key={cls.className}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{cls.className}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.bookings} bookings
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      ${cls.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${(cls.revenue / cls.bookings).toFixed(2)} avg
                    </p>
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

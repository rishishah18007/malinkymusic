import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Booking {
  id: string;
  status: string;
  amount_paid: number | null;
  created_at: string;
  user_id: string;
  profiles: { full_name: string | null; email: string | null } | null;
  children: { name: string } | null;
  class_sessions: {
    session_date: string;
    classes: { title: string } | null;
  } | null;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        status,
        amount_paid,
        created_at,
        user_id,
        children (name),
        class_sessions (
          session_date,
          classes (title)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch bookings");
      console.error(error);
    } else {
      // Fetch profiles separately
      const bookingsWithProfiles = await Promise.all(
        (data || []).map(async (booking) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, email")
            .eq("id", booking.user_id)
            .maybeSingle();
          return { ...booking, profiles: profile };
        })
      );
      setBookings(bookingsWithProfiles as any);
    }
    setIsLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: "confirmed" | "cancelled" | "waitlisted" | "completed") => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", bookingId);

    if (error) {
      toast.error("Failed to update booking status");
      console.error(error);
    } else {
      toast.success("Booking status updated");
      fetchBookings();
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Class", "Date", "Child", "Status", "Amount", "Booked On"];
    const rows = filteredBookings.map((b) => [
      b.profiles?.full_name || "Unknown",
      b.profiles?.email || "",
      b.class_sessions?.classes?.title || "",
      b.class_sessions?.session_date || "",
      b.children?.name || "",
      b.status,
      b.amount_paid || 0,
      new Date(b.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Bookings exported to CSV");
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      (booking.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.class_sessions?.classes?.title?.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-tertiary/20 text-tertiary";
      case "cancelled":
        return "bg-destructive/20 text-destructive";
      case "waitlisted":
        return "bg-accent/30 text-accent-foreground";
      case "completed":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
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
          <h1 className="font-display text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            View and manage class bookings
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="waitlisted">Waitlisted</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-2xl font-bold text-tertiary">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Waitlisted</p>
            <p className="text-2xl font-bold text-accent-foreground">
              {bookings.filter((b) => b.status === "waitlisted").length}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold text-foreground">
              ${bookings.reduce((sum, b) => sum + (Number(b.amount_paid) || 0), 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="shadow-soft">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Child</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {booking.profiles?.full_name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.profiles?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.class_sessions?.classes?.title || "—"}
                    </TableCell>
                    <TableCell>
                      {booking.class_sessions?.session_date
                        ? new Date(booking.class_sessions.session_date).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell>{booking.children?.name || "—"}</TableCell>
                    <TableCell>${Number(booking.amount_paid || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) => updateBookingStatus(booking.id, value as "confirmed" | "cancelled" | "waitlisted" | "completed")}
                      >
                        <SelectTrigger className="w-[130px]">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="waitlisted">Waitlisted</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

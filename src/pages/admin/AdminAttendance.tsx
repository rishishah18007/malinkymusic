import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ClassSession {
  id: string;
  session_date: string;
  spots_available: number;
  is_cancelled: boolean;
  classes: {
    id: string;
    title: string;
    capacity: number;
  } | null;
}

interface AttendanceRecord {
  bookingId: string;
  customerName: string;
  childName: string;
  attended: boolean | null;
}

export default function AdminAttendance() {
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchAttendance(selectedSession);
    }
  }, [selectedSession]);

  const fetchSessions = async () => {
    setIsLoading(true);
    const today = new Date().toISOString().split("T")[0];
    
    // Get sessions from the past week and next week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    const { data, error } = await supabase
      .from("class_sessions")
      .select(`
        id,
        session_date,
        spots_available,
        is_cancelled,
        classes (id, title, capacity)
      `)
      .gte("session_date", weekAgo.toISOString().split("T")[0])
      .lte("session_date", weekFromNow.toISOString().split("T")[0])
      .eq("is_cancelled", false)
      .order("session_date", { ascending: true });

    if (error) {
      toast.error("Failed to fetch sessions");
      console.error(error);
    } else {
      setSessions(data || []);
      // Auto-select today's session if available
      const todaySession = data?.find((s) => s.session_date === today);
      if (todaySession) {
        setSelectedSession(todaySession.id);
      } else if (data && data.length > 0) {
        setSelectedSession(data[0].id);
      }
    }
    setIsLoading(false);
  };

  const fetchAttendance = async (sessionId: string) => {
    setIsLoadingAttendance(true);
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        status,
        user_id,
        children (name)
      `)
      .eq("class_session_id", sessionId)
      .eq("status", "confirmed");

    if (error) {
      toast.error("Failed to fetch attendance");
      console.error(error);
    } else {
      // Fetch profiles separately
      const records: AttendanceRecord[] = await Promise.all(
        (data || []).map(async (booking) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", booking.user_id)
            .maybeSingle();
          return {
            bookingId: booking.id,
            customerName: profile?.full_name || "Unknown",
            childName: booking.children?.name || "—",
            attended: null,
          };
        })
      );
      setAttendanceList(records);
    }
    setIsLoadingAttendance(false);
  };

  const markAttendance = (bookingId: string, attended: boolean) => {
    setAttendanceList((prev) =>
      prev.map((record) =>
        record.bookingId === bookingId ? { ...record, attended } : record
      )
    );
    toast.success(`Marked as ${attended ? "present" : "absent"}`);
    // In a real app, you'd save this to the database
  };

  const selectedSessionData = sessions.find((s) => s.id === selectedSession);
  const attendedCount = attendanceList.filter((r) => r.attended === true).length;
  const absentCount = attendanceList.filter((r) => r.attended === false).length;

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
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground mt-1">
          Track attendance for each class session
        </p>
      </div>

      {/* Session Selector */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Select Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-muted-foreground">
              No upcoming sessions. Create class sessions to track attendance.
            </p>
          ) : (
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger className="w-full md:w-[400px]">
                <SelectValue placeholder="Select a session" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((session) => {
                  const isToday = session.session_date === new Date().toISOString().split("T")[0];
                  return (
                    <SelectItem key={session.id} value={session.id}>
                      <div className="flex items-center gap-2">
                        <span>{session.classes?.title}</span>
                        <span className="text-muted-foreground">
                          {new Date(session.session_date).toLocaleDateString()}
                        </span>
                        {isToday && <Badge variant="secondary">Today</Badge>}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {selectedSession && selectedSessionData && (
        <>
          {/* Stats */}
          <div className="grid gap-4 grid-cols-3">
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Enrolled</p>
                <p className="text-2xl font-bold text-foreground">{attendanceList.length}</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-tertiary">{attendedCount}</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-destructive">{absentCount}</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance List */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>
                {selectedSessionData.classes?.title} - {" "}
                {new Date(selectedSessionData.session_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAttendance ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : attendanceList.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No confirmed bookings for this session
                </p>
              ) : (
                <div className="space-y-3">
                  {attendanceList.map((record) => (
                    <div
                      key={record.bookingId}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="font-medium text-foreground">{record.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Child: {record.childName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {record.attended === true && (
                          <Badge className="bg-tertiary/20 text-tertiary">Present</Badge>
                        )}
                        {record.attended === false && (
                          <Badge className="bg-destructive/20 text-destructive">Absent</Badge>
                        )}
                        <Button
                          variant={record.attended === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => markAttendance(record.bookingId, true)}
                          className="gap-1"
                        >
                          <Check className="h-4 w-4" />
                          Present
                        </Button>
                        <Button
                          variant={record.attended === false ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => markAttendance(record.bookingId, false)}
                          className="gap-1"
                        >
                          <X className="h-4 w-4" />
                          Absent
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

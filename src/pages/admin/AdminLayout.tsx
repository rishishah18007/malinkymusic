import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ClipboardCheck, 
  DollarSign, 
  MapPin,
  ChevronLeft,
  Menu,
  LogOut,
  Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Classes", href: "/admin/classes", icon: Calendar },
  { name: "Bookings", href: "/admin/bookings", icon: Users },
  { name: "Attendance", href: "/admin/attendance", icon: ClipboardCheck },
  { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { name: "Locations", href: "/admin/locations", icon: MapPin },
];

export default function AdminLayout() {
  const { user, signOut, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      checkAdminStatus();
    }
  }, [user, isLoading]);

  const checkAdminStatus = async () => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: user!.id,
      _role: 'admin'
    });

    if (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
      return;
    }

    setIsAdmin(data);
    
    if (!data) {
      toast.error("You don't have admin access");
      navigate("/");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Music className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-foreground">Admin</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/admin" && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-2 border-t border-border">
          <div className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            sidebarOpen ? "justify-between" : "justify-center"
          )}>
            {sidebarOpen && (
              <div className="truncate">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.user_metadata?.full_name || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Classes from "./pages/Classes";
import ClassFinder from "./pages/ClassFinder";
import About from "./pages/About";
import LibraryPrograms from "./pages/LibraryPrograms";
import PrivateLessons from "./pages/PrivateLessons";
import PartiesEvents from "./pages/PartiesEvents";
import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminLocations from "./pages/admin/AdminLocations";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/class-finder" element={<ClassFinder />} />
            <Route path="/about" element={<About />} />
            <Route path="/library-programs" element={<LibraryPrograms />} />
            <Route path="/private-lessons" element={<PrivateLessons />} />
            <Route path="/parties-events" element={<PartiesEvents />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="classes" element={<AdminClasses />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="revenue" element={<AdminRevenue />} />
              <Route path="locations" element={<AdminLocations />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

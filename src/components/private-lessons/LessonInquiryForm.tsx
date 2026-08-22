import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface LessonInquiryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedDuration?: string;
}

export function LessonInquiryForm({ open, onOpenChange, preselectedDuration }: LessonInquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lesson_type: "",
    lesson_duration: preselectedDuration || "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.lesson_type) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("lesson_inquiries" as any).insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        lesson_type: formData.lesson_type,
        lesson_duration: formData.lesson_duration || null,
        message: formData.message.trim() || null,
      } as any);

      if (error) throw error;

      toast.success("Thank you! We'll be in touch soon to schedule your lesson.");
      setFormData({ name: "", email: "", phone: "", lesson_type: "", lesson_duration: "", message: "" });
      onOpenChange(false);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      toast.error("Something went wrong. Please try again or email us at info@malinkymusic.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Sign Up for Lessons</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you to schedule your first lesson.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              maxLength={100}
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              maxLength={20}
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label>Lesson Type *</Label>
            <Select
              value={formData.lesson_type}
              onValueChange={(v) => setFormData((p) => ({ ...p, lesson_type: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lesson type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voice">Voice Lessons</SelectItem>
                <SelectItem value="oboe">Oboe Lessons</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Preferred Lesson Length</Label>
            <Select
              value={formData.lesson_duration}
              onValueChange={(v) => setFormData((p) => ({ ...p, lesson_duration: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30 minutes">30 minutes — $50</SelectItem>
                <SelectItem value="45 minutes">45 minutes — $75</SelectItem>
                <SelectItem value="60 minutes">60 minutes — $120</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              maxLength={1000}
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              placeholder="Tell us about your goals, experience level, or any questions..."
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

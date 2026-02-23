
-- Create table for private lesson inquiries
CREATE TABLE public.lesson_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  lesson_type TEXT NOT NULL,
  lesson_duration TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lesson_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry (no auth required)
CREATE POLICY "Anyone can submit lesson inquiries"
ON public.lesson_inquiries
FOR INSERT
WITH CHECK (true);

-- Only admins can view/manage inquiries
CREATE POLICY "Admins can manage lesson inquiries"
ON public.lesson_inquiries
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

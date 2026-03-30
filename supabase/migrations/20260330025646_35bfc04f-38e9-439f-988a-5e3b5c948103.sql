-- Create enums
CREATE TYPE public.age_group AS ENUM ('toddlers', 'kids', 'pre-teens', 'teens');
CREATE TYPE public.interest AS ENUM ('Sports', 'Arts', 'STEM', 'Music', 'Dance', 'Outdoor Adventures', 'Creative', 'Cooking');
CREATE TYPE public.activity_type AS ENUM ('Indoor', 'Outdoor', 'Hybrid');

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL DEFAULT '',
  age_groups age_group[] NOT NULL DEFAULT '{}',
  age_suitability TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  time TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_free BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  tags interest[] NOT NULL DEFAULT '{}',
  activity_type activity_type NOT NULL DEFAULT 'Indoor',
  organizer TEXT NOT NULL DEFAULT '',
  organizer_desc TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Events are publicly readable
CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
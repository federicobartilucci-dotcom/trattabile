-- Trattabile Database Schema

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  user_type TEXT DEFAULT 'buyer' CHECK (user_type IN ('buyer', 'seller', 'both')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT USING (true);

-- Properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('appartamento', 'villa', 'casa', 'terreno', 'commerciale', 'altro')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT,
  cap TEXT,
  sqm INTEGER,
  rooms INTEGER,
  bathrooms INTEGER,
  floor INTEGER,
  year_built INTEGER,
  energy_class TEXT,
  features TEXT[],
  images TEXT[],
  video_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'inactive')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view active properties
CREATE POLICY "properties_public_read" ON public.properties FOR SELECT USING (status = 'active' OR auth.uid() = user_id);
-- Only owner can insert
CREATE POLICY "properties_insert_own" ON public.properties FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Only owner can update
CREATE POLICY "properties_update_own" ON public.properties FOR UPDATE USING (auth.uid() = user_id);
-- Only owner can delete
CREATE POLICY "properties_delete_own" ON public.properties FOR DELETE USING (auth.uid() = user_id);

-- Offers table (anonymous until accepted)
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Buyers can see their own offers
CREATE POLICY "offers_buyer_read" ON public.offers FOR SELECT USING (auth.uid() = buyer_id);
-- Property owners can see offers on their properties (but buyer info is hidden in the app layer)
CREATE POLICY "offers_seller_read" ON public.offers FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND user_id = auth.uid())
);
-- Buyers can insert offers
CREATE POLICY "offers_insert_own" ON public.offers FOR INSERT WITH CHECK (auth.uid() = buyer_id);
-- Buyers can update (withdraw) their own offers
CREATE POLICY "offers_update_buyer" ON public.offers FOR UPDATE USING (auth.uid() = buyer_id);
-- Property owners can update (accept/reject) offers
CREATE POLICY "offers_update_seller" ON public.offers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND user_id = auth.uid())
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NULL),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offers_updated_at
    BEFORE UPDATE ON public.offers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- GeoStrike database bedrock — run in Supabase SQL Editor or via CLI
-- Requires: PostGIS (Supabase enables PostGIS on request; ensure extension is enabled in Dashboard)

CREATE EXTENSION IF NOT EXISTS postgis;

-- Mineral types
CREATE TYPE mineral_category AS ENUM (
  'Gold',
  'Quartz',
  'Silver',
  'Copper',
  'Black Sand',
  'Other'
);

-- Profile / subscription (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Field logs (geography for map queries)
CREATE TABLE public.geostrike_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  user_id UUID REFERENCES auth.users (id) ON DELETE SET NULL,
  location GEOGRAPHY (POINT, 4326) NOT NULL,
  elevation DOUBLE PRECISION,
  mineral_type mineral_category NOT NULL DEFAULT 'Gold',
  purity_estimate DOUBLE PRECISION,
  notes TEXT,
  image_paths TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_synced BOOLEAN NOT NULL DEFAULT TRUE
);

-- Official BLM / MLRS-style claims cache
CREATE TABLE public.geostrike_claims (
  id SERIAL PRIMARY KEY,
  claim_number TEXT UNIQUE,
  claim_name TEXT,
  owner_name TEXT,
  status TEXT,
  boundary GEOMETRY (POLYGON, 4326),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Server-side queue mirror (optional; client also uses Dexie “Vault”)
CREATE TABLE public.geostrike_offline_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX geostrike_logs_geo_idx ON public.geostrike_logs USING GIST (location);

CREATE INDEX geostrike_claims_geo_idx ON public.geostrike_claims USING GIST (boundary);

CREATE INDEX geostrike_logs_user_idx ON public.geostrike_logs (user_id);

CREATE INDEX geostrike_offline_queue_user_idx ON public.geostrike_offline_queue (user_id);

-- RPC: insert a log point from the client with correct geography typing
CREATE OR REPLACE FUNCTION public.geostrike_push_log (
  p_lat DOUBLE PRECISION,
  p_lng DOUBLE PRECISION,
  p_elevation DOUBLE PRECISION,
  p_mineral_type mineral_category,
  p_purity_estimate DOUBLE PRECISION,
  p_notes TEXT,
  p_image_paths TEXT[]
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.geostrike_logs (
    user_id,
    location,
    elevation,
    mineral_type,
    purity_estimate,
    notes,
    image_paths,
    is_synced
  )
  VALUES (
    auth.uid (),
    ST_SetSRID (ST_MakePoint (p_lng, p_lat), 4326)::geography,
    p_elevation,
    p_mineral_type,
    p_purity_estimate,
    p_notes,
    p_image_paths,
    TRUE
  )
  RETURNING
    id INTO new_id;

  RETURN new_id;
END;
$$;

REVOKE ALL ON FUNCTION public.geostrike_push_log (
  DOUBLE PRECISION,
  DOUBLE PRECISION,
  DOUBLE PRECISION,
  mineral_category,
  DOUBLE PRECISION,
  TEXT,
  TEXT[]
)
FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.geostrike_push_log (
  DOUBLE PRECISION,
  DOUBLE PRECISION,
  DOUBLE PRECISION,
  mineral_category,
  DOUBLE PRECISION,
  TEXT,
  TEXT[]
)
TO authenticated;

GRANT EXECUTE ON FUNCTION public.geostrike_push_log (
  DOUBLE PRECISION,
  DOUBLE PRECISION,
  DOUBLE PRECISION,
  mineral_category,
  DOUBLE PRECISION,
  TEXT,
  TEXT[]
)
TO service_role;

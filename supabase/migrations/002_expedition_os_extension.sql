-- Optional future tables for Expedition OS (run after 001_geostrike_bedrock.sql)
-- Supply Sync, Item Wiki, Digital Assay Book, team geofence events

-- CREATE TABLE public.geostrike_supplies (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
--   team_id UUID,
--   owner_user_id UUID REFERENCES auth.users (id),
--   label TEXT NOT NULL,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE public.geostrike_wiki_entries (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
--   team_id UUID,
--   item_label TEXT NOT NULL,
--   use_case TEXT NOT NULL,
--   outcome TEXT,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE public.geostrike_geofence_events (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
--   user_id UUID REFERENCES auth.users (id),
--   claim_id INTEGER REFERENCES public.geostrike_claims (id),
--   distance_m DOUBLE PRECISION,
--   triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

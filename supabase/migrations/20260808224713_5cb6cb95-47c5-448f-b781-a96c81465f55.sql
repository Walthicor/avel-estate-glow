CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  form_type text NOT NULL DEFAULT 'short',
  buyer_type text,
  purpose text,
  budget text,
  timeline text,
  cities text[] NOT NULL DEFAULT '{}',
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  message text,
  property_id text,
  locale text NOT NULL DEFAULT 'en',
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  consent_at timestamptz,
  marketing_consent boolean NOT NULL DEFAULT false
);

GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages leads" ON public.leads FOR ALL TO service_role USING (true) WITH CHECK (true);
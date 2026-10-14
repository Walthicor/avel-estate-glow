ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'nuevo';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS quote jsonb;
COMMENT ON COLUMN public.leads.status IS 'Estado del lead para seguimiento: nuevo, contactado, etc.';
COMMENT ON COLUMN public.leads.quote IS 'Detalles del cotizador de 4 pasos; solo se llena cuando form_type = quote.';
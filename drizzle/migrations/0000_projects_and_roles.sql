CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.assign_admin_by_email()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) IN ('mardigitalcali@gmail.com', 'avelinmobiliaria@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created_assign_admin AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_admin_by_email();
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) IN ('mardigitalcali@gmail.com', 'avelinmobiliaria@gmail.com')
ON CONFLICT DO NOTHING;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  city text NOT NULL DEFAULT '',
  department text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Residencial' CHECK (type IN ('Residencial','Corporativo','Comercial')),
  area_m2 integer,
  year integer,
  team_role text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'En desarrollo' CHECK (status IN ('Entregado','En obra','En desarrollo')),
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  main_photo text,
  sketch text,
  gallery text[] NOT NULL DEFAULT '{}',
  services text[] NOT NULL DEFAULT '{}',
  lat double precision,
  lng double precision,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published projects" ON public.projects FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update projects" ON public.projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete projects" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER projects_touch BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE POLICY "Public reads project media" ON storage.objects FOR SELECT USING (bucket_id = 'project-media');
CREATE POLICY "Admins upload project media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update project media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete project media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.projects (slug, name, city, department, type, area_m2, year, team_role, status, tagline, description, main_photo, sketch, gallery, services, lat, lng, sort_order) VALUES
('popayan-trade-center','Popayán Trade Center','Popayán','Cauca','Corporativo',13063,2023,'Diseño, licencia y gerencia de obra','Entregado','Un edificio que le da a Popayán un nuevo centro de negocios.','Torre corporativa y comercial con oficinas, locales y parqueaderos. Acompañamos el proyecto desde el primer boceto hasta la entrega de llaves, con presupuesto y cronograma controlados en cada etapa.','https://picsum.photos/seed/ptc/1920/1200','https://picsum.photos/seed/ptc/1920/1200?grayscale',ARRAY['https://picsum.photos/seed/ptc1/1600/1100','https://picsum.photos/seed/ptc2/1100/1600','https://picsum.photos/seed/ptc3/1600/1100','https://picsum.photos/seed/ptc4/1600/1100','https://picsum.photos/seed/ptc5/1100/1600'],ARRAY['Diseño arquitectónico','Diseño estructural','Diseño eléctrico','Diseño hidrosanitario','Presupuesto','Cronograma','Gerencia de obra'],2.4448,-76.6147,1),
('casa-piedra-y-madera','Casa Piedra y Madera','Pereira','Risaralda','Residencial',420,2022,'Diseño arquitectónico y construcción','Entregado','Piedra para la memoria, madera para el día a día.','Vivienda campestre que combina muros de piedra local con estructura de madera, pensada para abrirse al paisaje del Eje Cafetero.','https://picsum.photos/seed/cpm/1920/1200','https://picsum.photos/seed/cpm/1920/1200?grayscale',ARRAY['https://picsum.photos/seed/cpm1/1600/1100','https://picsum.photos/seed/cpm2/1100/1600','https://picsum.photos/seed/cpm3/1600/1100','https://picsum.photos/seed/cpm4/1600/1100'],ARRAY['Diseño arquitectónico','Diseño estructural','Presupuesto','Gerencia de obra'],4.8133,-75.6961,2),
('torre-residencial','Torre Residencial','Cali','Valle del Cauca','Residencial',8600,2025,'Diseño y gerencia de obra','En obra','Vivir en altura sin perder la escala humana.','Torre de apartamentos con zonas comunes generosas y fachada bioclimática que controla el sol de la tarde.','https://picsum.photos/seed/tr/1920/1200','https://picsum.photos/seed/tr/1920/1200?grayscale',ARRAY['https://picsum.photos/seed/tr1/1600/1100','https://picsum.photos/seed/tr2/1100/1600','https://picsum.photos/seed/tr3/1600/1100','https://picsum.photos/seed/tr4/1600/1100'],ARRAY['Diseño arquitectónico','Diseño estructural','Diseño eléctrico','Diseño hidrosanitario','Cronograma','Gerencia de obra'],3.4516,-76.5320,3),
('casa-del-jardin','Casa del Jardín','Popayán','Cauca','Residencial',310,2024,'Diseño arquitectónico','Entregado','Una casa que crece alrededor de su jardín.','Vivienda unifamiliar organizada en torno a un patio central que ilumina y ventila todos los espacios.','https://picsum.photos/seed/cdj/1920/1200','https://picsum.photos/seed/cdj/1920/1200?grayscale',ARRAY['https://picsum.photos/seed/cdj1/1600/1100','https://picsum.photos/seed/cdj2/1100/1600','https://picsum.photos/seed/cdj3/1600/1100'],ARRAY['Diseño arquitectónico','Diseño hidrosanitario','Presupuesto'],2.4520,-76.6000,4),
('jds-factory','JD''s Factory','Popayán','Cauca','Comercial',1200,2023,'Diseño y construcción','Entregado','Industria y marca en un mismo lugar.','Nave comercial con área de producción, exhibición y oficinas, construida en tiempo récord.','https://picsum.photos/seed/jds/1920/1200','https://picsum.photos/seed/jds/1920/1200?grayscale',ARRAY['https://picsum.photos/seed/jds1/1600/1100','https://picsum.photos/seed/jds2/1100/1600','https://picsum.photos/seed/jds3/1600/1100'],ARRAY['Diseño arquitectónico','Diseño estructural','Diseño eléctrico','Presupuesto','Cronograma','Gerencia de obra'],2.4600,-76.5900,5),
('casa-cordillera','Casa Cordillera','Salento','Quindío','Residencial',380,2026,'Diseño arquitectónico','En desarrollo','Una ventana abierta a la cordillera.','Casa de descanso en ladera con terrazas escalonadas que siguen la topografía y enmarcan la vista a las montañas.','https://picsum.photos/seed/cc/1920/1200','https://picsum.photos/seed/cc/1920/1200?grayscale',ARRAY['https://picsum.photos/seed/cc1/1600/1100','https://picsum.photos/seed/cc2/1100/1600','https://picsum.photos/seed/cc3/1600/1100'],ARRAY['Diseño arquitectónico','Diseño estructural','Presupuesto'],4.6371,-75.5706,6);
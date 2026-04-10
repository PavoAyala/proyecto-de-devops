-- Create table for restaurant reservations based on reservations_habitaciones
CREATE TABLE IF NOT EXISTS public.reservas_restaurantes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  reserva_id uuid NOT NULL,
  restaurante_id uuid NOT NULL,
  mesa_id uuid, -- Optional, can be assigned later
  fecha date NOT NULL,
  hora time without time zone NOT NULL,
  numero_personas integer NOT NULL,
  notas text,
  CONSTRAINT reservas_restaurantes_pkey PRIMARY KEY (id),
  CONSTRAINT reservas_restaurantes_reserva_id_fkey FOREIGN KEY (reserva_id) REFERENCES public.reservas(id) ON DELETE CASCADE,
  CONSTRAINT reservas_restaurantes_restaurante_id_fkey FOREIGN KEY (restaurante_id) REFERENCES public.restaurantes(id) ON DELETE CASCADE,
  CONSTRAINT reservas_restaurantes_mesa_id_fkey FOREIGN KEY (mesa_id) REFERENCES public.mesas(id) ON DELETE SET NULL
);

-- Enable RLS if needed (assuming public access for now as per project context if not specified)
ALTER TABLE public.reservas_restaurantes ENABLE ROW LEVEL SECURITY;

-- Simple policy for authenticated users to insert
CREATE POLICY "Users can insert their own restaurant reservations"
  ON public.reservas_restaurantes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reservas
      WHERE id = reservas_restaurantes.reserva_id
      AND usuario_id = auth.uid()
    )
  );

-- Simple policy for users to see their own restaurant reservations
CREATE POLICY "Users can view their own restaurant reservations"
  ON public.reservas_restaurantes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.reservas
      WHERE id = reservas_restaurantes.reserva_id
      AND usuario_id = auth.uid()
    )
  );

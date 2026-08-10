/*
# Create enquiries table (single-tenant, no auth)

1. New Tables
- `enquiries`
- `id` (uuid, primary key)
- `name` (text, not null) — full name of the person enquiring
- `email` (text, not null) — contact email
- `phone` (text) — optional phone number
- `event_type` (text, not null) — one of: Weddings, Parties, Corporate, Proms, Other
- `event_date` (date) — optional preferred date
- `venue` (text) — optional venue name or location
- `service` (text) — which booth/service they are interested in
- `guests` (integer) — approximate guest count
- `duration` (text) — requested duration in hours
- `message` (text) — additional notes from the customer
- `status` (text, default 'new') — enquiry status for internal tracking
- `created_at` (timestamp, default now)

2. Security
- Enable RLS on `enquiries`.
- Allow anon + authenticated INSERT only (public can submit enquiries).
- No SELECT/UPDATE/DELETE from the anon key — enquiries are managed server-side.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_type text NOT NULL,
  event_date date,
  venue text,
  service text,
  guests integer,
  duration text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
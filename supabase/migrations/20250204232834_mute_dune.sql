/*
  # Create leads table for questionnaire responses

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `current_ai` (text, required)
      - `computer_usage` (text, required)
      - `admin_time` (text, required)
      - `frustrations` (text, required)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `status` (text) - For tracking lead status (e.g., new, contacted, qualified)
      
  2. Security
    - Enable RLS on `leads` table
    - Add policies for authenticated users to:
      - Read all leads
      - Insert new leads
      - Update leads they have access to

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for chronological queries
    - Index on status for filtering
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  current_ai text NOT NULL,
  computer_usage text NOT NULL,
  admin_time text NOT NULL,
  frustrations text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

-- Create indexes
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authenticated users can read all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();
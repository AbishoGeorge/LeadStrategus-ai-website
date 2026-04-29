/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `company` (text, required)
      - `email` (text, required)
      - `requirement` (text, required)
      - `message` (text, optional)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add insert policy for anonymous users to submit contact forms
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  requirement text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    length(name) > 0 AND
    length(company) > 0 AND
    length(email) > 0 AND
    length(requirement) > 0
  );

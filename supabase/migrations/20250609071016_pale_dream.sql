/*
  # Fix profile RLS policies

  1. Security
    - Enable RLS on profiles table (if not already enabled)
    - Add INSERT policy for authenticated users to create their own profile
    - Ensure policy doesn't conflict with existing policies

  This migration fixes the profile creation issue during user registration.
*/

-- Enable RLS on profiles table (safe to run multiple times)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'profiles'
  ) THEN
    RAISE EXCEPTION 'profiles table does not exist';
  END IF;
END $$;

-- Enable RLS (safe to run multiple times)
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;

-- Create INSERT policy for profile creation during registration
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure we have the basic SELECT and UPDATE policies as well
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
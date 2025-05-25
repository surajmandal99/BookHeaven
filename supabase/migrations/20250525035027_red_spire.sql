/*
  # Fix Profile Table Policies

  1. Security Changes
    - Add INSERT policy for authenticated users to create their own profile
    - Ensure RLS is enabled on profiles table
    
  Note: Existing SELECT and UPDATE policies are preserved
*/

-- Enable RLS (if not already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Add INSERT policy for profile creation during registration
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
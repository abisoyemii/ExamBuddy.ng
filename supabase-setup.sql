-- ============================================================
--  ExamBuddy Nigeria — Supabase Database Setup
--  Run this SQL in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create the exam_results table
CREATE TABLE IF NOT EXISTS public.exam_results (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exam        text NOT NULL,                -- 'JAMB', 'WAEC', 'NECO'
  score_pct   integer NOT NULL,             -- 0–100
  correct     integer NOT NULL,
  wrong       integer NOT NULL,
  skipped     integer NOT NULL,
  total_qs    integer NOT NULL,
  time_taken  text,                         -- e.g. '32m 14s'
  subjects    jsonb,                        -- per-subject breakdown
  taken_at    timestamptz DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security (users can only see their own results)
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Allow users to INSERT their own results
CREATE POLICY "Users can insert own results"
  ON public.exam_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to SELECT their own results
CREATE POLICY "Users can view own results"
  ON public.exam_results FOR SELECT
  USING (auth.uid() = user_id);

-- 3. Optional: index for fast queries by user
CREATE INDEX IF NOT EXISTS idx_results_user_taken
  ON public.exam_results(user_id, taken_at DESC);

-- 4. Optional: save user progress between exam sessions
CREATE TABLE IF NOT EXISTS public.user_progress (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exam        text NOT NULL,
  progress    jsonb,
  metadata    jsonb,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert or update own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_progress_user_exam
  ON public.user_progress(user_id, exam);

-- ============================================================
--  That's it! Your database is ready.
-- ============================================================
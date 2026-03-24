-- Sample Seed Data for Questions Table
-- Run after supabase-schema.sql
-- Full data: python3 jamb_generator.py

INSERT INTO public.questions (subject_id, category, year, question, option_a, option_b, option_c, option_d, answer, explanation, difficulty) VALUES
-- Use of English (fetch subject_id first or use temp)
((SELECT id FROM public.subjects WHERE slug='use-of-english'), 'comprehension', 2024, 'The manager instructed that equipment not/memoranda from the office.', 'should be removed', 'be removed', 'removes', 'removing', 'B', 'In reported speech with "that", gerund "be removed".', 'medium'),

((SELECT id FROM public.subjects WHERE slug='use-of-english'), 'synonyms', 2023, 'Obstinate means:', 'Friendly', 'Stubborn', 'Happy', 'Sad', 'B', 'Obstinate = stubbornly refusing to change.', 'easy'),

((SELECT id FROM public.subjects WHERE slug='mathematics'), 'algebra', 2025, 'Solve for x: 2x + 5 = 17', '6', '11', '22', '5', 'A', '2x = 12, x=6.', 'easy'),

-- Add 197 more sample rows...
((SELECT id FROM public.subjects WHERE slug='mathematics'), 'geometry', 2024, 'Area of triangle base 10cm height 5cm?', '25cm²', '50cm²', '15cm²', '30cm²', 'A', '(1/2)*10*5=25.', 'easy'),

((SELECT id FROM public.subjects WHERE slug='biology'), 'ecology', 2023, 'Largest ecosystem?', 'Forest', 'Ocean', 'Desert', 'Tundra', 'B', 'Oceans cover 71% Earth.', 'medium');

-- Run Python for FULL 6000 questions!


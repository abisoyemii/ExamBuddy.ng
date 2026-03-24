-- Add IELTS subjects (append to existing schema)
INSERT INTO public.subjects (exam_type, name, slug, description) VALUES
('IELTS', 'Listening', 'ielts-listening', 'IELTS Listening practice questions'),
('IELTS', 'Reading', 'ielts-reading', 'IELTS Academic Reading passages/questions'),
('IELTS', 'Writing Task 1', 'ielts-writing-task1', 'Task 1 reports/letters - graphs/maps/processes'),
('IELTS', 'Writing Task 2', 'ielts-writing-task2', 'Task 2 essays - opinion/discussion'),
('IELTS', 'Speaking', 'ielts-speaking', 'Part 1-3 speaking questions/cues')
ON CONFLICT DO NOTHING;


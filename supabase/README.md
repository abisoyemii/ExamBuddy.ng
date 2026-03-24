# Supabase Backend Setup

1. **DB Schema**: Run `supabase-schema.sql` in Dashboard → SQL Editor.

2. **Edge Functions** (local deploy):
   ```
   npm install -g supabase
   supabase init
   supabase login
   supabase link --project-ref [YOUR_PROJECT_REF]
   supabase functions deploy get-questions
   supabase functions deploy get-subjects
   ```

3. **Seed Data**: Run Python generators → `seed-db.sql` in SQL Editor.

4. **Test**: POST to https://[project].supabase.co/functions/v1/get-questions
   ```json
   {"exam":"JAMB", "subjects":["use-of-english","mathematics"], "count":40}
   ```

Service Role Key needed for functions env (Dashboard → Settings → API).


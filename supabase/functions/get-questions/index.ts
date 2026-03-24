Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { exam, subjects, count = 50, year, category }: {
      exam?: string;
      subjects?: string[];
      count?: number;
      year?: number;
      category?: string;
    } = await req.json();

    if (!exam || !subjects || !Array.isArray(subjects)) {
      return new Response(JSON.stringify({ error: 'Missing exam or subjects array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'https://dhcxzdfvpsccmescmavd.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    } as any);

    // Count total matching questions
    let query = supabase
      .from('questions')
      .select('count', { count: 'exact', head: true })
      .eq('subjects.exam_type', exam);

    if (subjects.length) {
      query = query.contains('subjects.slug', [subjects]);
    }
    if (year) {
      query = query.eq('year', year);
    }
    if (category) {
      query = query.eq('category', category);
    }

    const totalRes = await query;
    const total = totalRes.data?.count ?? 0;

    if (total === 0) {
      return new Response(JSON.stringify({ questions: [], total }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Random sample using OFFSET
    const skip = Math.floor(Math.random() * Math.max(0, total - count));
    const { data: questions, error } = await supabase
      .from('questions')
      .select(`
        *,
        subjects!inner (
          exam_type,
          name,
          slug
        )
      `)
      .eq('subjects.exam_type', exam)
      .range(skip, skip + count - 1)
      .order('random()');  // Random order

    if (error) throw error;

    return new Response(JSON.stringify({
      questions: questions?.map((q: any) => ({
        id: q.id,
        subject: q.subjects.name,
        subject_slug: q.subjects.slug,
        category: q.category,
        year: q.year,
        question: q.question,
        options: { 
          A: q.option_a, 
          B: q.option_b, 
          C: q.option_c, 
          D: q.option_d 
        },
        answer: q.answer,
        explanation: q.explanation,
        difficulty: q.difficulty
      })) || [],
      total,
      params: { exam, subjects, count, year }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
});


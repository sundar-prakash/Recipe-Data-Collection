import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const searchParams = request.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Start building query. Need count as well.
    let query = supabase.from('recipes').select('*', { count: 'exact' });

    // Filters
    const title = searchParams.get('title');
    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    const cuisine = searchParams.get('cuisine');
    if (cuisine) {
        query = query.ilike('cuisine', `%${cuisine}%`);
    }

    const serves = searchParams.get('serves');
    if (serves) {
        // serves column is "4 servings", so we search for "4%"
        query = query.ilike('serves', `${serves}%`);
    }

    const applyNumericFilter = (column: string, value: string) => {
        if (value.startsWith('>=')) {
            query = query.gte(column, parseFloat(value.substring(2)));
        } else if (value.startsWith('<=')) {
            query = query.lte(column, parseFloat(value.substring(2)));
        } else if (value.startsWith('>')) {
            query = query.gt(column, parseFloat(value.substring(1)));
        } else if (value.startsWith('<')) {
            query = query.lt(column, parseFloat(value.substring(1)));
        } else {
            query = query.eq(column, parseFloat(value));
        }
    };

    const rating = searchParams.get('rating');
    if (rating) applyNumericFilter('rating', rating);

    const total_time = searchParams.get('total_time');
    if (total_time) applyNumericFilter('total_time', total_time);

    // Apply pagination range
    query = query.range(from, to);

    // Sort by creation date by default or handle sorting provided by params if needed
    // Defaulting to id desc for consistent ordering
    query = query.order('id', { ascending: false });

    const { data, count, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, total: count });
}

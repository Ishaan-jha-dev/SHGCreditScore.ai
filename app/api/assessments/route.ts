import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Fetch user if logged in, but do not block if they are in demo mode
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || null;

    const { shgName, district, state, membersCount, formedDate } = await req.json();

    // 1. Create the SHG Group
    const { data: shgGroup, error: shgError } = await supabase
      .from('shg_groups')
      .insert({
        name: shgName,
        district,
        state,
        members_count: parseInt(membersCount),
        formed_date: formedDate || null,
        created_by: userId,
      })
      .select()
      .single();

    if (shgError) {
      console.error('SHG creation error:', shgError);
      return NextResponse.json({ error: shgError.message }, { status: 400 });
    }

    // 2. Create an Assessment linked to the group
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .insert({
        shg_id: shgGroup.id,
        status: 'pending',
        created_by: userId,
      })
      .select()
      .single();

    if (assessmentError) {
      console.error('Assessment creation error:', assessmentError);
      return NextResponse.json({ error: assessmentError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      shgId: shgGroup.id,
    });
  } catch (error: unknown) {
    console.error('New assessment error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password, name, bankId } = await req.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Sign up the user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, bank_id: bankId },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Insert the user into the custom public.users table to satisfy Drizzle schema relations
    if (authData.user) {
      const { error: dbError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: email,
        name: name,
        role: 'officer',
        bank_id: bankId,
        password_hash: 'managed_by_supabase_auth',
      });
      
      if (dbError) {
        console.error("Database sync error (can be ignored if trigger exists):", dbError.message);
      }
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
  }
}

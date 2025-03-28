import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const cookiesStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });

    //　supabaseからセッションを取得
    const { data: { session } } = await supabase.auth.getSession();

    //　セッションがある場合はログアウト
    if (session) {
        await supabase.auth.signOut();
    }

    return NextResponse.redirect(new URL('/', req.url));
}
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { searchParams } = new URL(req.url);

    //　codeがあった場合はセッションに含める
    const code = searchParams.get('code');

    // codeがあった場合はセッションに含める
    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    // リスト一覧へ偏移
    return NextResponse.redirect(new URL('/todo-list', req.url));
}

export const dynamic = "force-static";

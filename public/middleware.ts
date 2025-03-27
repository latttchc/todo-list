import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    // リダイレクト処理を実装
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // ユーザー情報を取得
    const { data: { user } } = await supabase.auth.getUser();

    // 認証画面へ遷移する処理
    if (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/todo-list', req.url));
    }

    if (!user && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return res;
}

//　適用するパスを指定
export const config = {
    matcher: ['/', 'todo-list']
}
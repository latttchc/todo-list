'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoResponseProps, TodoCreateProps } from "../types"

//　作成処理(titleとdescriptionを受け取りsupabaseに送信)
export const createTodo = async ({ title, description }: TodoCreateProps): Promise<TodoResponseProps> => {
    //　supabaseからセッションを取得
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    //　ユーザーでない場合の処理
    if (!user) {
        console.log('認証されていないユーザーは新規作成できません.');
        return {} as TodoResponseProps;
    }

    // データを作成する処理
    const { error } = await supabase
        .from('todos')
        .insert([
            {
                title,
                description,
                user_id: user.id
            }
        ])

    // エラー処理
    if (error) {
        console.log('データ挿入に失敗しました', error);
        return {} as TodoResponseProps;
    }

    // 表示データの更新
    revalidatePath('/todo-create');

    //　成功メッセージ
    return { message: '成功しました.' };

}

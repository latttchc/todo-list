"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoDetailProps, TodoIdProps } from "../types"

//　詳細処理の実装
const getTodo = async ({ id }: TodoIdProps): Promise<{ todo: TodoDetailProps }> => {
    //　supabaseからセッション取得
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user

    //　ユーザーでない場合の処理
    if (!user) {
        alert('認証されていないユーザーはTodoを表示できません');
        return {
            todo: {} as TodoDetailProps
        }
    }

    //　詳細データを取得処理
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .match({
            id: id,
            user_id: user.id
        });

    //　エラー処理
    if (error) {
        console.error('情報の取得に失敗しました. :', error);
        return {
            todo: {} as TodoDetailProps
        }
    }

    //　データの取得に失敗した場合の処理
    if (!data) {
        console.error('情報の取得に失敗しました.')
        return {
            todo: {} as TodoDetailProps
        }
    }

    //　データの更新処理
    revalidatePath(`/todo-list/${id}`);
    //　詳細データを返す
    return {
        todo: data[0] as TodoDetailProps
    }
}
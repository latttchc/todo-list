'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { TodoIdProps, TodoResponseProps } from "../types"

//　削除処理
const deleteTodo = async ({ id }: TodoIdProps): Promise<TodoResponseProps> => {
    //　supabaseから取得
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user

    //　ユーザーでない場合
    if (!user) {
        alert('認証されてないユーザーはTodoを削除できません');
        return {} as TodoResponseProps
    }

    //　データの削除処理
    const { error } = await supabase
        .from('todos')
        .delete()
        .match({
            id: id,
            user_id: user.id
        })

    //　エラーの場合の処理
    if (error) {
        console.error('削除に失敗しました. :', error);
        return {} as TodoResponseProps
    }

    //　表示データの更新
    revalidatePath(`/todo-list/${id}`);

    //　成功メッセージを返す
    return {
        message: '成功しました.'
    }
}

export default deleteTodo
'use server'

import { cookies } from "next/headers"
import { TodoResponseProps, TodoUpdateProps } from "../types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"

//　データ更新の処理
const updateTodo = async ({ id, title, description }: TodoUpdateProps): Promise<TodoResponseProps> => {
    //　supabaseのセッションを取得
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user

    //　ユーザー取得できない場合
    if (!user) {
        alert('認証されてないユーザーはTodoを更新できません')
        return {} as TodoResponseProps
    }

    //　データの更新処理
    const { error } = await supabase
        .from('todos')
        .update({
            title,
            description,
            updated_at: new Date()
        })
        .match({
            id: id,
            user_id: user.id
        })

    //　エラーした場合の処理
    if (error) {
        console.error('情報の更新に失敗しました :', error);
        return {} as TodoResponseProps
    }

    // 成功メッセージを返す
    return { message: '成功しました。' }
}

export default updateTodo
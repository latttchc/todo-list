'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { TodoDetailProps } from "../types"

// TodoListのデータ取得
const getTodoList = async (): Promise<{ todos: TodoDetailProps[] }> => {

    //supabaseからセッションを取得
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    //　ユーザー情報
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    //　ユーザーでない場合はアラート
    if (!user) {
        alert('認証されてなれていないTODOを表示できません.');
        return {
            todos: [] as TodoDetailProps[]
        };
    }
    // supabaseから一覧データを取得
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('title', { ascending: true });

    //　エラーの場合は空の配列を出力
    if (error) {
        console.error('情報取得に失敗しました :', error);
        return {
            todos: [] as TodoDetailProps[]
        };
    }

    //　データがない場合は空の配列を出力
    if (!data) {
        console.error('情報取得に失敗しました :', error);
        return {
            todos: [] as TodoDetailProps[]
        };
    }

    //　表示データを更新
    revalidatePath('/todo-list');
    return {
        todos: data
    };
}

export default getTodoList
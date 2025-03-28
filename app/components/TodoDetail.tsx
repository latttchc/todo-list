'use client'

import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import deleteTodo from "../server-action/deleteTodo"
import updateTodo from "../server-action/updateTodo"
import { TodoDetailProps, TodoIdProps } from "../types"
import { useRouter } from "next/navigation"
import getTodo from "../server-action/getTodo"

const TodoDetail = ({ id }: TodoIdProps) => {
    const router = useRouter();
    //　データの状態管理
    const [todoContents, settodoContents] = useState<TodoDetailProps>();
    //　編集スイッチの状態管理
    const [isEdit, setIsEdit] = useState<boolean>();

    //　詳細データの取得処理を実装
    useEffect(() => {
        const fetchData = async () => {
            const { todo } = await getTodo({ id: Number(id) });
            settodoContents(todo);
        }
        fetchData();
    }, [id, router])

    //　詳細データがない場合の処理を実装
    if (!todoContents) {
        router.push('/todo-list');
        return
    }

    //　詳細データを更新する処理を実装
    const onUpdeteSubmit = async () => {
        const { message } = await updateTodo({
            id: todoContents.id,
            title: todoContents.title,
            description: todoContents.description
        });
        //　成功メッセージ
        if (message) {
            alert(message);
            router.push('/todo-list');
        }
    }

    //　詳細データを削除する処理を実装
    const onDeleteSubmit = async () => {
        const confirmed: boolean = confirm('削除しますか?');

        //　削除する場合
        if (confirmed) {
            const { message } = await deleteTodo({
                id: todoContents.id
            });

            //　成功メッセージ
            if (message) {
                router.push('/todo-list');
            }
        }
    }

    //　idがない場合の処理
    if (!id) {
        return <div>IDが指定されてません.</div>
    }

    return (
        <>
            {/* 詳細画面の表示部分を実装 */}
            <FormControlLabel
                sx={{ m: 2 }}
                control={
                    <Switch
                        checked={isEdit}
                        onChange={() => setIsEdit(!isEdit)}
                        inputProps={{ "aria-label": 'controlled' }}
                    />
                }
                label="編集"
            />
            <form>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        type="text"
                        disabled={!isEdit}
                        label="タイトル"
                        value={todoContents.title}
                        onChange={(e) => {
                            settodoContents({
                                ...todoContents,
                                title: e.target.value
                            })
                        }}
                        required
                    />
                    <TextField
                        type="text"
                        disabled={!isEdit}
                        label="説明"
                        value={todoContents.description}
                        onChange={(e) => {
                            settodoContents({
                                ...todoContents,
                                description: e.target.value
                            })
                        }}
                        required
                    />
                    <Box>作成日:{format(new Date(todoContents.created_at), 'yyy/MM/dd')}</Box>
                    <Box>更新日:{todoContents.updated_at ? format(new Date(todoContents.updated_at), 'yyy/MM/dd') : '更新なし'}</Box>

                    <Box display="flex" justifyContent="center" sx={{ px: 4, py: 1 }}>
                        <Button type="submit" variant="contained" disabled={isEdit} color="info">Todoを更新</Button>
                        <Button type="submit" variant="outlined" disabled={isEdit} color="inherit" sx={{ ml: 2 }}>Todoを削除</Button>
                        <Button href={`/todo-list`} variant="outlined" disabled={isEdit} color="inherit" sx={{ ml: 2 }}>戻る</Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default TodoDetail
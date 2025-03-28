'use client'

import { createTodo } from "../server-action/createTodo"
import { Box, Button, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"

//　新規作成コンポーネントを作成
const TodoCreate = () => {
    const router = useRouter();
    //　タイトルを状態管理
    const [title, setTitle] = useState<string>('');
    //　説明を状態管理
    const [description, setDescription] = useState<string>('');

    //　データを送信する関数
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const message = await createTodo({ title, description });
            if (message) {
                router.push('/todo-list');
            }
        } catch (error) {
            console.log('Todoの作成に失敗しました.');
        }
    }

    return (
        // 作成画面を表示する部分
        <form onSubmit={onSubmit}>
            <Box display='flex' sx={{ flexDirection: "column", gap: 2 }}>
                <TextField type="text" label="タイトル" value={title} required onChange={(e) => setTitle(e.target.value)} />
                <TextField type="text" label="説明" value={description} required onChange={(e) => setTitle(e.target.value)} />

                <Box display="flex" justifyContent="center">
                    <Button type="submit" variant="contained" color="success" sx={{ px: 4, py: 1 }}>TODOを作成</Button>
                </Box>
            </Box>
        </form>
    )
}

export default TodoCreate
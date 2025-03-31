'use client'

import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import deleteTodo from "../server-action/deleteTodo"
import updateTodo from "../server-action/updateTodo"
import getTodo from "../server-action/getTodo"
import { TodoDetailProps, TodoIdProps } from "../types"
import { useRouter } from "next/navigation"

const TodoDetail = ({ id }: TodoIdProps) => {
    const router = useRouter();
    const [todoContents, setTodoContents] = useState<TodoDetailProps | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const { todo } = await getTodo({ id: Number(id) });
            setTodoContents(todo);
        };
        fetchData();
    }, [id]);

    if (!todoContents) {
        return <p>Loading...</p>;
    }

    const handleUpdate = async () => {
        if (!todoContents) return;

        try {
            const { message } = await updateTodo({
                id: todoContents.id,
                title: todoContents.title,
                description: todoContents.description
            });

            if (message) {
                alert(message);
                router.push('/todo-list');
            }
        } catch (error) {
            console.error('更新に失敗しました :', error);
        }
    };

    const handleDelete = async () => {
        if (!todoContents) return;

        try {
            const confirmed = confirm('削除しますか?');
            if (confirmed) {
                const { message } = await deleteTodo({ id: todoContents.id });

                if (message) {
                    alert(message);
                    router.push('/todo-list');
                }
            }
        } catch (error) {
            console.error('削除に失敗しました :', error);
        }
    };

    return (
        <>
            <FormControlLabel
                sx={{ m: 2 }}
                control={
                    <Switch
                        checked={isEdit}
                        onChange={() => setIsEdit(prev => !prev)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="編集"
            />
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    type="text"
                    disabled={!isEdit}
                    label="タイトル"
                    value={todoContents.title || ''}
                    onChange={(e) =>
                        setTodoContents(prev => prev ? { ...prev, title: e.target.value } : prev)
                    }
                    required
                />
                <TextField
                    type="text"
                    disabled={!isEdit}
                    label="説明"
                    value={todoContents.description || ''}
                    onChange={(e) =>
                        setTodoContents(prev => prev ? { ...prev, description: e.target.value } : prev)
                    }
                    required
                />
                <Box>作成日: {format(new Date(todoContents.created_at), 'yyyy/MM/dd')}</Box>
                <Box>更新日: {todoContents.updated_at ? format(new Date(todoContents.updated_at), 'yyyy/MM/dd') : '更新なし'}</Box>

                <Box display="flex" justifyContent="center" sx={{ px: 4, py: 1 }}>
                    <Button onClick={handleUpdate} variant="contained" disabled={!isEdit} color="info">
                        Todoを更新
                    </Button>
                    <Button onClick={handleDelete} variant="outlined" disabled={isEdit} color="inherit" sx={{ ml: 2 }}>
                        Todoを削除
                    </Button>
                    <Button href="/todo-list" variant="outlined" color="inherit" sx={{ ml: 2 }}>
                        戻る
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default TodoDetail;

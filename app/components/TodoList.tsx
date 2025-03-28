"use client"

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import getTodoList from "../server-action/getTodoList"
import { TodoDetailProps, TodoListProps } from "../types"
import { todo } from "node:test"

//　一覧表示のコンポーネントを実装
const TodoList = () => {
    //　一覧データをuseStateで状態管理
    const [todoListContents, setTodoListContents] = useState<TodoDetailProps[]>();
    //　supabaseから一覧データを取得
    useEffect(() => {
        const fetchData = async () => {
            const { todos } = await getTodoList();
            setTodoListContents(todos)
        }
        fetchData();
    }, [])

    //　データがない場合の処理
    if (!todoListContents) {
        return <p>データがありません.</p>
    }

    return (
        <>
            {/* データを一覧表示する部分を実装 */}
            {todoListContents.length === 0 && <p>データがありません.</p>}
            {todoListContents.map((todo: TodoListProps) => (
                <Card key={todo.id} sx={{ m: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {todo.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {todo.description}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button href={`/todo-list/${todo.id}`} variant="contained" color="success" size="small">
                            詳細
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </>
    );
}

export default TodoList
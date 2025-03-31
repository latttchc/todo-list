import TodoDetail from "@/app/components/TodoDetail";

const TodoDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    return <TodoDetail id={Number(id)} />
}
export default TodoDetailPage
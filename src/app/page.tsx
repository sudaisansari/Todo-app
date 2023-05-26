import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-primary to-secondary h-screen
    flex justify-center items-center">
      <div className="rounded-xl px-3 py-4 bg-gradient-to-br from-[#D9D9D9]/70 to-[#D9D9D9]/60 
      backdrop-blur-xl bg-opacity-50 w-full max-w-md">
        {/* TodoList */}
        {/* ts ignore command will remove error because of async function of todoList but noe it will remove error */}
        {/* @ts-ignore */} 
        <TodoList />
        {/* AddTodo  */}
        <AddTodo />
        {/* Bar */}
        <div className="h-1.5 bg-black mx-auto rounded-md w-1/2 mt-6"></div>
      </div>
    </main>
  )
}
import { Todo } from "@/lib/drizzle";

/* 
fetch("/api/todo"); 
* We write api path like /api/todo when we our calling api of that same nextjs project.
  when we deploy it. It will generate fuull api at here fetch("/api/todo");
* For async await we use try catch for error handling
*/
const getData = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/todo",
      {
        method: "GET",
        cache : "no-store",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.ok);
    if (!res.ok) {
      throw new Error("failed to fetch data");
    };
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const TodoList = async () => {

  const res: { data: Todo[] } = await getData();
  console.log(res);

  return (
    <div className="max-h-[350px] overflow-auto mb-4">
      {
         res.data.map((item) => {
          return (
            <div key={item.id} className="bg-gray-200 px-4 py-4 flex items-center gap-x-3 shadow rounded-lg my-5">
              {/* circle */}
              <div className="bg-secondary rounded-full h-3 w-3"></div>
              {/* Text Title*/}
              <p className="text-lg font-medium">{item.task}</p>          
            </div>
           )
         })
      }
    </div>
  )
}

export default TodoList
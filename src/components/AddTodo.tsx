"use client"
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { NewTodo } from '@/lib/drizzle'
import { useRouter } from 'next/navigation'

const AddTodo = () => {

    const [task, setTask] = useState<NewTodo | null>(null);
    const { refresh } = useRouter();//refresh is destructured from useRouter
    const inputRef = useRef<HTMLInputElement | null>(null); // ref for the input element

    const handleSubmit = async () => {
        try {
            if (task) {
                const res = await fetch("http://127.0.0.1:3000/api/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        task: task.task
                    }),
                })
                console.log(res.ok);
                refresh();
                setTask(null); // Clear the task
                if (inputRef.current) {
                    inputRef.current.value = ''; // Clear the input field
                }
            }
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <div>
            <form className='w-full flex gap-x-3'>
                <input
                    ref={inputRef}
                    onChange={(e) => setTask({ task: e.target.value })}
                    className='rounded-full w-full py-3.5 px-5 border focus:outline-secondary' type="text" />
                <button
                    type='button'
                    onClick={() => {
                        handleSubmit();
                        if (inputRef.current) {
                            inputRef.current.value = ''; // Clear the input field after clicking the button
                        }
                    }}
                    className='p-4 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary'>
                    <Image src={"/arrow.svg"} width={20} height={20} alt="icon" />
                </button>
            </form>
        </div >
    )
}

export default AddTodo
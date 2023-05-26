import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, todoTable, db } from "@/lib/drizzle"
import {sql} from "@vercel/postgres";

export async function GET(request: NextRequest) {
    try {
        await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255));`
        const res = await db.select().from(todoTable);// fetching data from database through drizzle
        return NextResponse.json({ data: res });
    }
    catch (err) {
        console.log((err as {message : string}).message);
        return NextResponse.json({ message: "Something Went Wrong" });
    }
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    try {
        if (req.task) {
            const res = await db.insert(todoTable).values({
                task : req.task,
            }).returning();
             
            console.log(res);
            return NextResponse.json({ message: "Data Added Successfully", data : res })
        }
        else {
            throw new Error("Task field is required");// when we throw anything it sotres in catch
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
        // throw error will return here
    }
}
// this is a whole structure of our Database looks like, that we are telling to Drizzle. 
/* Drizzle basically helping us to communicate with database, and also poviding us typesafe
   response, and what we have in response
*/

// We use following functions to make table of database
import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";// we import it for types to use them in frontend
import { sql } from "@vercel/postgres";

/* you cannot make tables with the help of drizzle but you can do other quries like delete,
   poast, put get
 */
/* telling Drizzle ORM by writing that how our " Database's table structure " is look like
 in first parameter we write Table name, in second pass object inside object write 
    fields  */
export const todoTable = pgTable("todos", {
    id: serial("id").primaryKey(), // .primerykey() generates primary key for data id 
    task: varchar("task", { length: 255 }).notNull() // notnull means this field not be blank
})

export type Todo = InferModel<typeof todoTable>; // defining type to our table for GET request
export type NewTodo = InferModel<typeof todoTable, "insert">; // defining type to our table for POST or inserting data
/* *We imported type of infermaodel,
   *InferModel<typeof todoTable> Our todoTable type will go to inferModel type and inferModel
   converting our type to this structure by hvering on Todo and newTodo like following
    type Todo = {
    id: number;
    task: string;}
    *We will use these types in our frontend
 */

export const db = drizzle(sql); 
/* *Making instance of database, 
   *Telling to Drizzle about our carredentials that we have on our database , 
   *Drizzle(sql) passing secrets in this to make client, 
   *sql will drive secrets by its own from environment variables(.env) and make it secrets 
   and will pass it to drizzle and then you can do queries you want
*/
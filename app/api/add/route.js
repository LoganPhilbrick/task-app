import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs/server";

export const fetchCache = "force-no-store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const text = searchParams.get("text");
  const id = uuidv4();
  const { userId } = auth();

  try {
    if (!title || !text) throw new Error("Title and description required");
    await sql`INSERT INTO tasks (title, text, id, userid) VALUES ( ${title}, ${text}, ${id}, ${userId});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM tasks WHERE userid = ${userId}`;
  return NextResponse.json(tasks.rows, { status: 200 });
}

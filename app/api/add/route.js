import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const fetchCache = "force-no-store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const text = searchParams.get("text");
  const id = uuidv4();

  try {
    if (!title || !text) throw new Error("Title and description required");
    await sql`INSERT INTO tasks (id ,title, text) VALUES (${id},${title}, ${text});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM tasks;`;
  return NextResponse.json(tasks.rows, { status: 200 });
}

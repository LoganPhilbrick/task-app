import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const text = searchParams.get("text");

  try {
    if (!title || !text) throw new Error("Title and description required");
    await sql`INSERT INTO tasks (title, text) VALUES (${title}, ${text});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM tasks;`;
  return NextResponse.json({ tasks }, { status: 200 });
}

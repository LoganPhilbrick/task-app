import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM tasks;`;
  return NextResponse.json({ tasks }, { status: 200 });
}
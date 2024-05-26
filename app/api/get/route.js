import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export async function GET(request) {
  const tasks = await sql`SELECT * FROM tasks`;
  return NextResponse.json(tasks.rows);
}

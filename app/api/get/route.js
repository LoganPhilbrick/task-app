import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const fetchCache = "force-no-store";

export async function GET(request) {
  const { userId } = auth();

  const tasks = await sql`SELECT * FROM tasks WHERE userid = ${userId}`;
  return NextResponse.json(tasks.rows);
}

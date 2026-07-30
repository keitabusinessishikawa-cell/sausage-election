import { NextResponse } from "next/server";

import { resetVotes } from "@/lib/voteStore";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = request.headers.get("x-admin-token");
  const expected = process.env.ADMIN_RESET_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    await resetVotes();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/votes/reset failed:", error);
    return NextResponse.json({ error: "reset failed" }, { status: 500 });
  }
}

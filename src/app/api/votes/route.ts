import { NextResponse } from "next/server";

import type { VoteAction } from "@/data/sausages";
import { addVote, getTotals, isValidVote } from "@/lib/voteStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const totals = await getTotals();
    return NextResponse.json({ totals });
  } catch (error) {
    console.error("GET /api/votes failed:", error);
    return NextResponse.json(
      { error: "failed to load votes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { sausageId, action } = (body ?? {}) as {
    sausageId?: unknown;
    action?: unknown;
  };

  if (!isValidVote(sausageId, action)) {
    return NextResponse.json({ error: "invalid vote" }, { status: 400 });
  }

  try {
    await addVote(sausageId, action as VoteAction);
    const totals = await getTotals();
    return NextResponse.json({ totals });
  } catch (error) {
    console.error("POST /api/votes failed:", error);
    return NextResponse.json(
      { error: "failed to record vote" },
      { status: 500 },
    );
  }
}

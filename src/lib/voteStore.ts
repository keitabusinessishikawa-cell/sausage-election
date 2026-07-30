import { SAUSAGES, VOTE_ACTIONS, type VoteAction } from "@/data/sausages";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export type VoteTotals = Record<string, Partial<Record<VoteAction, number>>>;

const KNOWN_SAUSAGE_IDS = new Set(SAUSAGES.map((sausage) => sausage.id));

export function isValidVote(
  sausageId: unknown,
  action: unknown,
): sausageId is string {
  return (
    typeof sausageId === "string" &&
    KNOWN_SAUSAGE_IDS.has(sausageId) &&
    typeof action === "string" &&
    (VOTE_ACTIONS as readonly string[]).includes(action)
  );
}

export async function getTotals(): Promise<VoteTotals> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("votes")
    .select("sausage_id, action, count");

  if (error) throw error;

  const totals: VoteTotals = {};
  for (const row of data ?? []) {
    const current = totals[row.sausage_id] ?? {};
    totals[row.sausage_id] = {
      ...current,
      [row.action as VoteAction]: row.count,
    };
  }
  return totals;
}

export async function addVote(
  sausageId: string,
  action: VoteAction,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc("increment_vote", {
    p_sausage_id: sausageId,
    p_action: action,
  });
  if (error) throw error;
}

export async function resetVotes(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("votes")
    .delete()
    .not("sausage_id", "is", null);
  if (error) throw error;
}

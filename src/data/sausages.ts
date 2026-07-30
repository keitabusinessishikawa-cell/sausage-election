import type { StaticImageData } from "next/image";

import sausageFrankfurter from "@/assets/images/sausage-frankfurter.jpg";
import sausageBratwurst from "@/assets/images/sausage-bratwurst.jpg";
import sausageGarlicFrank from "@/assets/images/sausage-garlic-frank.jpg";
import sausageKasekunacker from "@/assets/images/sausage-kasekunacker.jpg";
import sausageMalaFrank from "@/assets/images/sausage-mala-frank.png";

export const VOTE_ACTIONS = ["favorite", "eaten", "curious"] as const;

export type VoteAction = (typeof VOTE_ACTIONS)[number];

export const POINTS: Record<VoteAction, number> = {
  favorite: 20,
  eaten: 5,
  curious: 3,
};

export const ACTION_LABEL: Record<VoteAction, string> = {
  favorite: "お気に入り",
  eaten: "食べた",
  curious: "気になる",
};

const STARTING_SCORE = 100;

export interface Sausage {
  id: string;
  order: number;
  name: string;
  badge?: string;
  image: StaticImageData;
  startingScore: number;
}

export const SAUSAGES: Sausage[] = [
  {
    id: "frankfurter",
    order: 1,
    name: "フランクフルト",
    image: sausageFrankfurter,
    startingScore: STARTING_SCORE,
  },
  {
    id: "bratwurst",
    order: 2,
    name: "ブラートヴルスト",
    image: sausageBratwurst,
    startingScore: STARTING_SCORE,
  },
  {
    id: "garlic-frank",
    order: 3,
    name: "ガーリックフランク",
    image: sausageGarlicFrank,
    startingScore: STARTING_SCORE,
  },
  {
    id: "kasekunacker",
    order: 4,
    name: "ケーゼクナッカー",
    image: sausageKasekunacker,
    startingScore: STARTING_SCORE,
  },
  {
    id: "mala-frank",
    order: 5,
    name: "マーラーフランク",
    badge: "期間限定",
    image: sausageMalaFrank,
    startingScore: STARTING_SCORE,
  },
];

export function scoreOf(
  sausage: Sausage,
  myVotes?: Partial<Record<VoteAction, number>>,
): number {
  return VOTE_ACTIONS.reduce((total, action) => {
    return total + (myVotes?.[action] ?? 0) * POINTS[action];
  }, sausage.startingScore);
}

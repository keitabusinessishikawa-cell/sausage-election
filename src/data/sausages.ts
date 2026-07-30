import type { StaticImageData } from "next/image";

import sausageFrankfurter from "@/assets/images/sausage-frankfurter.jpg";
import sausageBratwurst from "@/assets/images/sausage-bratwurst.jpg";
import sausageGarlicFrank from "@/assets/images/sausage-garlic-frank.jpg";
import sausageKasekunacker from "@/assets/images/sausage-kasekunacker.jpg";
import sausageMalaFrank from "@/assets/images/sausage-mala-frank.png";

export const VOTE_ACTIONS = ["eaten", "wantToEat", "online"] as const;

export type VoteAction = (typeof VOTE_ACTIONS)[number];

export const POINTS: Record<VoteAction, number> = {
  eaten: 20,
  wantToEat: 5,
  online: 3,
};

export const ACTION_LABEL: Record<VoteAction, string> = {
  eaten: "食べた",
  wantToEat: "食べてみたい",
  online: "オンライン",
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

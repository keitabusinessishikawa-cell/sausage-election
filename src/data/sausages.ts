import type { StaticImageData } from "next/image";

import sausageFrankfurter from "@/assets/images/sausage-frankfurter.jpg";
import sausageBratwurst from "@/assets/images/sausage-bratwurst.jpg";
import sausageGarlicFrank from "@/assets/images/sausage-garlic-frank.jpg";
import sausageKasekunacker from "@/assets/images/sausage-kasekunacker.jpg";
import sausageMalaFrank from "@/assets/images/sausage-mala-frank.png";

// "favorite" is the single ranking pick (1 per person, one-time). "eaten"
// draws down the person's own meal-count pool. "curious" is unlimited. All
// three feed the combined (総合) ranking, weighted by POINTS.
export const VOTE_ACTIONS = ["favorite", "eaten", "curious"] as const;

export type VoteAction = (typeof VOTE_ACTIONS)[number];

export const POINTS: Record<VoteAction, number> = {
  favorite: 100,
  eaten: 20,
  curious: 3,
};

export const ACTION_LABEL: Record<VoteAction, string> = {
  favorite: "お気に入り登録",
  eaten: "食べる登録",
  curious: "気になる",
};

export const EATEN_QUANTITY_OPTIONS = [1, 3, 5] as const;

export interface Sausage {
  id: string;
  order: number;
  name: string;
  badge?: string;
  image: StaticImageData;
  tasteCopy: string;
  themeColor: string;
  shopUrl: string;
}

const SHOP_ROOT = "https://ichimeat.base.shop/";

export const SAUSAGES: Sausage[] = [
  {
    id: "frankfurter",
    order: 1,
    name: "フランクフルト",
    image: sausageFrankfurter,
    tasteCopy: "パキフワ食感、優しい燻製。",
    themeColor: "#ef4444",
    shopUrl: "https://ichimeat.base.shop/items/74653511",
  },
  {
    id: "bratwurst",
    order: 2,
    name: "ブラートヴルスト",
    image: sausageBratwurst,
    tasteCopy: "ジュワっと、肉々しい。",
    themeColor: "#f59e0b",
    shopUrl: "https://ichimeat.base.shop/items/74653558",
  },
  {
    id: "garlic-frank",
    order: 3,
    name: "ガーリックフランク",
    image: sausageGarlicFrank,
    tasteCopy: "ガツンと、ニンニクパンチ。",
    themeColor: "#10b981",
    shopUrl: "https://ichimeat.base.shop/items/74653595",
  },
  {
    id: "kasekunacker",
    order: 4,
    name: "ケーゼクナッカー",
    image: sausageKasekunacker,
    tasteCopy: "とろりと溢れる、濃厚チーズ。",
    themeColor: "#eab308",
    shopUrl: "https://ichimeat.base.shop/items/74653734",
  },
  {
    id: "mala-frank",
    order: 5,
    name: "マーラーフランク",
    badge: "期間限定",
    image: sausageMalaFrank,
    tasteCopy: "シビ辛で、心地よい辛さ。",
    themeColor: "#db2777",
    shopUrl: SHOP_ROOT,
  },
];

"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { QuantityPicker } from "@/components/QuantityPicker";
import { useVotes } from "@/context/VoteContext";

type Stage = "checking" | "quantity" | "content";

// Session-only: reappears in a fresh tab/browser session, but not on reload.
const ONBOARDED_SESSION_KEY = "sausage-election:onboarded";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { isMyStateReady, eatenQuantity } = useVotes();
  const [stage, setStage] = useState<Stage>("checking");

  useEffect(() => {
    if (!isMyStateReady) return;

    let sessionOnboarded = false;
    try {
      sessionOnboarded = window.sessionStorage.getItem(ONBOARDED_SESSION_KEY) === "1";
    } catch {
      // ignore
    }

    // Already picked a quantity on this device before — no need to ask again.
    setStage(sessionOnboarded || eatenQuantity !== null ? "content" : "quantity");
  }, [isMyStateReady, eatenQuantity]);

  const finishOnboarding = () => {
    try {
      window.sessionStorage.setItem(ONBOARDED_SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setStage("content");
  };

  return (
    <>
      {stage === "checking" && (
        <div className="fixed inset-0 z-50 bg-[#fff3de]" aria-hidden />
      )}
      <AnimatePresence>
        {stage === "quantity" && (
          <QuantityPicker key="quantity" onSelect={finishOnboarding} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { BrandSplash } from "@/components/BrandSplash";
import { QuantityPicker } from "@/components/QuantityPicker";
import { useVotes } from "@/context/VoteContext";

type Stage = "splash" | "quantity" | "content";

// Session-only: reappears in a fresh tab/browser session, but not on reload.
const ONBOARDED_SESSION_KEY = "sausage-election:onboarded";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { eatenQuantity } = useVotes();
  const [stage, setStage] = useState<Stage>("splash");

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(ONBOARDED_SESSION_KEY) === "1") {
        setStage("content");
      }
    } catch {
      // sessionStorage unavailable — fall through to the normal splash flow
    }
  }, []);

  const markSessionOnboarded = () => {
    try {
      window.sessionStorage.setItem(ONBOARDED_SESSION_KEY, "1");
    } catch {
      // ignore
    }
  };

  const finishOnboarding = () => {
    markSessionOnboarded();
    setStage("content");
  };

  const handleSplashDone = () => {
    // Already picked a quantity on this device before — no need to ask again.
    if (eatenQuantity !== null) {
      finishOnboarding();
    } else {
      setStage("quantity");
    }
  };

  return (
    <>
      <AnimatePresence>
        {stage === "splash" && (
          <BrandSplash key="splash" onDone={handleSplashDone} />
        )}
        {stage === "quantity" && (
          <QuantityPicker key="quantity" onSelect={finishOnboarding} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

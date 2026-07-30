import { BottomCTA } from "@/components/BottomCTA";
import { EatenRemainingBar } from "@/components/EatenRemainingBar";
import { Hero } from "@/components/Hero";
import { OnboardingGate } from "@/components/OnboardingGate";
import { PointRules } from "@/components/PointRules";
import { RankingSection } from "@/components/RankingSection";
import { SausageSection } from "@/components/SausageSection";
import { StickyCTA } from "@/components/StickyCTA";
import { VoteProvider } from "@/context/VoteContext";

export default function Home() {
  return (
    <VoteProvider>
      <OnboardingGate>
        <EatenRemainingBar />
        <main>
          <Hero />
          <PointRules />
          <RankingSection />
          <SausageSection />
          <RankingSection />
          <BottomCTA />
        </main>
        <StickyCTA />
      </OnboardingGate>
    </VoteProvider>
  );
}

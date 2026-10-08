import { BrowserRouter, Route } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { PageTransition } from "@/components/PageTransition";
import { DistributionPageSuspense } from "@/features/distribution";
import { InvestorsPageSuspense } from "@/features/investors";
import { WaterfallPageSuspense } from "@/features/waterfall";

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <PageTransition>
          <Route path="/" element={<InvestorsPageSuspense />} />
          <Route path="/waterfall" element={<WaterfallPageSuspense />} />
          <Route path="/distribution" element={<DistributionPageSuspense />} />
        </PageTransition>
      </AppShell>
    </BrowserRouter>
  );
}

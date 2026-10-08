import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { DistributionPage } from "@/features/distribution";
import { InvestorsPage } from "@/features/investors";
import { WaterfallPage } from "@/features/waterfall";

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<InvestorsPage />} />
          <Route path="/waterfall" element={<WaterfallPage />} />
          <Route path="/distribution" element={<DistributionPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

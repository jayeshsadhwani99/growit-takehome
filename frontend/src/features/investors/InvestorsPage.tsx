import { useState } from "react";
import { Button, Page } from "@/components";
import { selectInvestors, selectTotalRaised } from "@/store/features/investors";
import { useAppSelector } from "@/store/hooks";
import { AddInvestorDialog } from "./AddInvestorDialog";
import { InvestorTable } from "./InvestorTable";

export function InvestorsPage() {
  const investors = useAppSelector(selectInvestors);
  const total = useAppSelector(selectTotalRaised);
  const [adding, setAdding] = useState(false);

  return (
    <Page
      title="Investors"
      description="Everyone on the cap table. Share is their portion of capital raised."
      actions={
        investors.length > 0 ? <Button onClick={() => setAdding(true)}>Add investor</Button> : null
      }
    >
      <InvestorTable investors={investors} total={total} onAdd={() => setAdding(true)} />
      <AddInvestorDialog open={adding} onOpenChange={setAdding} />
    </Page>
  );
}

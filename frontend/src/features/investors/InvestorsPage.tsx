import { PageHeader } from "@/components";
import { selectInvestors, selectTotalRaised } from "@/store/features/investors";
import { useAppSelector } from "@/store/hooks";
import { InvestorForm } from "./InvestorForm";
import { InvestorTable } from "./InvestorTable";

export function InvestorsPage() {
  const investors = useAppSelector(selectInvestors);
  const total = useAppSelector(selectTotalRaised);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      <PageHeader
        title="Investors"
        description="Everyone on the cap table. Share is their portion of capital raised."
      />
      <InvestorForm />
      <InvestorTable investors={investors} total={total} />
    </main>
  );
}

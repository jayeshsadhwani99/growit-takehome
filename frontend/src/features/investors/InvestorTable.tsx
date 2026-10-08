import { DataTable, EmptyState, Money } from "@/components";
import type { Investor } from "@/types";
import { InvestorRow } from "./InvestorRow";

const head = "px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted";

export function InvestorTable({ investors, total }: { investors: Investor[]; total: number }) {
  if (investors.length === 0) {
    return (
      <EmptyState
        title="No investors yet"
        description="Add the first investor to start the cap table."
      />
    );
  }

  return (
    <DataTable>
      <caption className="sr-only">Investors and their share of capital raised</caption>
      <thead className="border-b border-border bg-stone-50">
        <tr>
          <th className={head}>Name</th>
          <th className={`${head} text-right`}>Investment</th>
          <th className={head}>Invested on</th>
          <th className={`${head} text-right`}>Share of total</th>
          <th className={head}>
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {investors.map((investor) => (
          <InvestorRow key={investor.id} investor={investor} total={total} />
        ))}
      </tbody>
      <tfoot>
        <tr className="border-t border-border font-medium">
          <th className="px-3 py-3 text-left" scope="row">
            Total raised
          </th>
          <td className="px-3 py-3 text-right">
            <Money value={total} />
          </td>
          <td colSpan={3} />
        </tr>
      </tfoot>
    </DataTable>
  );
}

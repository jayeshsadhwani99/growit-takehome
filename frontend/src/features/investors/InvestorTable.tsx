import { Button, DataTable, EmptyState, Money } from "@/components";
import type { Investor } from "@/types";
import { InvestorRow } from "./InvestorRow";

const head = "px-3 py-2 text-left text-xs font-medium text-muted";

export function InvestorTable({
  investors,
  total,
  onAdd,
}: {
  investors: Investor[];
  total: number;
  onAdd: () => void;
}) {
  if (investors.length === 0) {
    return (
      <EmptyState
        title="No investors"
        description="Add the first investor to start the cap table."
        action={<Button onClick={onAdd}>Add investor</Button>}
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
          <th className="px-3 py-2 text-left text-sm" scope="row">
            Total raised
          </th>
          <td className="px-3 py-2 text-right">
            <Money value={total} />
          </td>
          <td colSpan={3} />
        </tr>
      </tfoot>
    </DataTable>
  );
}

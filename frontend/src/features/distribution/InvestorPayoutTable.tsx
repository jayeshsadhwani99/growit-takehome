import { DataTable, Money } from "@/components";
import type { Hurdle, Investor, Run } from "@/types";
import { hurdleColumnLabel, sumPayouts } from "@/utils";

const head = "px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted";
const cell = "px-3 py-3 text-right whitespace-nowrap";

export function InvestorPayoutTable({
  run,
  investors,
  hurdles,
}: {
  run: Run;
  investors: Investor[];
  hurdles: Hurdle[];
}) {
  return (
    <DataTable>
      <caption className="sr-only">Amount paid to each investor by hurdle</caption>
      <thead className="border-b border-border bg-stone-50">
        <tr>
          <th className={head}>Investor</th>
          {hurdles.map((hurdle, index) => (
            <th key={hurdle.id} className={`${head} text-right`}>
              {hurdleColumnLabel(hurdle, index)}
            </th>
          ))}
          <th className={`${head} text-right`}>Total paid</th>
        </tr>
      </thead>
      <tbody>
        {investors.map((investor) => (
          <tr key={investor.id} className="border-b border-border">
            <th className="px-3 py-3 text-left font-medium" scope="row">
              {investor.name}
            </th>
            {hurdles.map((hurdle) => (
              <td key={hurdle.id} className={cell}>
                <Money
                  value={sumPayouts(
                    run.payouts,
                    (payout) => payout.investorId === investor.id && payout.hurdleId === hurdle.id,
                  )}
                />
              </td>
            ))}
            <td className={cell}>
              <Money value={sumPayouts(run.payouts, (payout) => payout.investorId === investor.id)} />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-t border-border font-medium">
          <th className="px-3 py-3 text-left" scope="row">
            Total
          </th>
          {hurdles.map((hurdle) => (
            <td key={hurdle.id} className={cell}>
              <Money value={sumPayouts(run.payouts, (payout) => payout.hurdleId === hurdle.id)} />
            </td>
          ))}
          <td className={cell}>
            <Money value={sumPayouts(run.payouts, () => true)} />
          </td>
        </tr>
      </tfoot>
    </DataTable>
  );
}

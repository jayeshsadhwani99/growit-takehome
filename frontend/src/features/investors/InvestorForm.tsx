import { type FormEvent, useState } from "react";
import { Button, Card, FormField, Input } from "@/components";
import { investorAdded } from "@/store/features/investors";
import { useAppDispatch } from "@/store/hooks";
import { createId, validateInvestorForm, type InvestorFormErrors } from "@/utils";

export function InvestorForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<InvestorFormErrors>({});

  function onSubmit(event: FormEvent): void {
    event.preventDefault();
    const next = validateInvestorForm({ name, amount, date });
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    dispatch(investorAdded({ id: createId(), name: name.trim(), amount: Number(amount), date }));
    setName("");
    setAmount("");
    setErrors({});
  }

  return (
    <Card>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" noValidate>
        <FormField id="investor-name" label="Name" error={errors.name}>
          <Input
            id="investor-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "investor-name-error" : undefined}
          />
        </FormField>
        <FormField id="investor-amount" label="Amount (USD)" error={errors.amount}>
          <Input
            id="investor-amount"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? "investor-amount-error" : undefined}
          />
        </FormField>
        <FormField id="investor-date" label="Date" error={errors.date}>
          <Input
            id="investor-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "investor-date-error" : undefined}
          />
        </FormField>
        <div className="sm:col-span-2 lg:col-span-1 lg:self-end">
          <Button type="submit" className="w-full">
            Add investor
          </Button>
        </div>
      </form>
    </Card>
  );
}

import { type FormEvent, useState } from "react";
import { Button, DateField, FormField, Input } from "@/components";
import { investorAdded } from "@/store/features/investors";
import { useAppDispatch } from "@/store/hooks";
import { createId, validateInvestorForm, type InvestorFormErrors } from "@/utils";

export function InvestorForm({ onClose }: { onClose: () => void }) {
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
    onClose();
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3" noValidate>
      <FormField id="investor-name" label="Name" error={errors.name}>
        <Input
          id="investor-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setErrors((current) => ({ ...current, name: undefined }));
          }}
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
          onChange={(event) => {
            setAmount(event.target.value);
            setErrors((current) => ({ ...current, amount: undefined }));
          }}
          aria-invalid={Boolean(errors.amount)}
          aria-describedby={errors.amount ? "investor-amount-error" : undefined}
        />
      </FormField>
      <FormField id="investor-date" label="Date" error={errors.date}>
        <DateField
          id="investor-date"
          value={date}
          onChange={(next) => {
            setDate(next);
            setErrors((current) => ({ ...current, date: undefined }));
          }}
          invalid={Boolean(errors.date)}
            describedBy={errors.date ? "investor-date-error" : undefined}
          />
      </FormField>
      <div className="flex justify-end gap-1.5">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button type="submit">Add investor</Button>
      </div>
    </form>
  );
}

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components";
import { InvestorForm } from "./InvestorForm";

export function AddInvestorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-md overflow-y-auto">
        <DialogTitle className="text-sm font-medium">Add investor</DialogTitle>
        <DialogDescription className="mt-1 text-xs text-muted">
          Name, amount, and the day the money starts counting.
        </DialogDescription>
        <InvestorForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

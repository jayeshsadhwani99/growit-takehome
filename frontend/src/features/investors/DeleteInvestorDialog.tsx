import { Button, Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components";
import { deleteInvestor } from "@/store/features/investors";
import { useAppDispatch } from "@/store/hooks";
import type { Investor } from "@/types";

interface DeleteInvestorDialogProps {
  investor: Investor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteInvestorDialog({ investor, open, onOpenChange }: DeleteInvestorDialogProps) {
  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-sm font-medium">Delete {investor.name}?</DialogTitle>
        <DialogDescription className="mt-1 text-xs text-muted">
          This removes them from the cap table.
        </DialogDescription>
        <div className="mt-3 flex justify-end gap-1.5">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteInvestor(investor.id));
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components";
import { RunForm } from "./RunForm";

export function AddRunDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-md overflow-y-auto">
        <DialogTitle className="text-sm font-medium">Run distribution</DialogTitle>
        <DialogDescription className="mt-1 text-xs text-muted">
          A date and the cash to send through the waterfall. The run is saved as-is.
        </DialogDescription>
        <RunForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

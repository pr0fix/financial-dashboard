import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  message: string;
}

export default function ConfirmDialog({
  onConfirm,
  onCancel,
  message,
}: ConfirmDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          {message}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={onCancel}
          className="hover:bg-red-500 hover:text-white"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-blue-600 hover:bg-blue-500"
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

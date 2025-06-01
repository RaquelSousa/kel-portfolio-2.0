import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseFormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error, data: T) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = "Operation completed successfully!",
  errorMessage = "An error occurred. Please try again.",
}: UseFormSubmissionOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submit = async (data: T) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(data);

      toast({
        title: "Success",
        description: successMessage,
      });

      onSuccess?.(data);
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Unknown error");

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      onError?.(errorObj, data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
  };
}

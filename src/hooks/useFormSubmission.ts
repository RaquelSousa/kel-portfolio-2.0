import { useState } from "react";
import { toast } from "sonner";

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

  const submit = async (data: T) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(data);

      toast.success("Success", {
        description: successMessage,
      });

      onSuccess?.(data);
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Unknown error");

      toast.error("Error", {
        description: errorMessage,
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

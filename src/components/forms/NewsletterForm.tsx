import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterData } from "@/lib/validations";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { Button } from "@kel/ui-components";
import { Input } from "@kel/ui-components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail } from "lucide-react";

interface NewsletterFormProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  placeholder?: string;
}

export function NewsletterForm({
  className = "",
  size = "md",
  showLabel = false,
  placeholder = "Enter your email address",
}: NewsletterFormProps) {
  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const { submit, isSubmitting } = useFormSubmission<NewsletterData>({
    onSubmit: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Newsletter signup:", data);
    },
    onSuccess: () => {
      form.reset();
    },
    successMessage: "Successfully subscribed to newsletter!",
    errorMessage: "Failed to subscribe. Please try again.",
  });

  const { handleSubmit } = form;

  const inputSize = {
    sm: "h-8 text-sm",
    md: "h-10",
    lg: "h-12 text-lg",
  }[size];

  const buttonSize = {
    sm: "sm" as const,
    md: "default" as const,
    lg: "lg" as const,
  }[size];

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className={`flex gap-2 ${className}`}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              {showLabel && <FormLabel>Email Address</FormLabel>}
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={placeholder}
                  className={inputSize}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={buttonSize}
          disabled={isSubmitting}
          className="shrink-0"
        >
          <Mail className="mr-2 h-4 w-4" />
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}

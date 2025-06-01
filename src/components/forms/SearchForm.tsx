import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchData } from "@/lib/validations";
import { Button } from "kel-ui-components";
import { Input } from "kel-ui-components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Search, X } from "lucide-react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showButton?: boolean;
}

export function SearchForm({
  onSearch,
  placeholder = "Search...",
  className = "",
  size = "md",
  showButton = true,
}: SearchFormProps) {
  const form = useForm<SearchData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: SearchData) => {
    onSearch(data.query);
  };

  const { handleSubmit, watch } = form;
  const queryValue = watch("query");

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

  const handleInputChange = (value: string) => {
    if (value.length === 0) {
      onSearch("");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex gap-2 ${className}`}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={placeholder}
                  className={inputSize}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showButton && (
          <Button
            type="submit"
            size={buttonSize}
            disabled={!queryValue.trim()}
            className="shrink-0"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </form>
    </Form>
  );
}

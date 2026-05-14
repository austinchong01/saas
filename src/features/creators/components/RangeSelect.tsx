import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function NumberInput({
  field,
  placeholder,
  step,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  placeholder?: string;
  step?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const showFormatted =
    !isFocused &&
    field.value !== "" &&
    field.value !== null &&
    field.value !== undefined &&
    Number(field.value) > 9999;

  return (
    <Input
      type={showFormatted ? "text" : "number"}
      step={step}
      placeholder={placeholder}
      {...field}
      value={
        showFormatted
          ? Number(field.value).toLocaleString("en-US")
          : field.value ?? ""
      }
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        setIsFocused(false);
        field.onBlur(e);
      }}
    />
  );
}

export function RangeFields({
  minName,
  maxName,
  control,
  label,
  placeholder,
  step,
}: {
  minName: string;
  maxName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  placeholder?: { min?: string; max?: string };
  step?: number;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-start gap-3">
        <FormField
          control={control}
          name={minName}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-xs text-muted-foreground">
                Min
              </FormLabel>
              <FormControl>
                <NumberInput
                  field={field}
                  placeholder={placeholder?.min ?? "No min"}
                  step={step}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={maxName}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-xs text-muted-foreground">
                Max
              </FormLabel>
              <FormControl>
                <NumberInput
                  field={field}
                  placeholder={placeholder?.max ?? "No max"}
                  step={step}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
                <Input
                  type="number"
                  step={step}
                  placeholder={placeholder?.min ?? "No min"}
                  {...field}
                  value={field.value ?? ""}
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
                <Input
                  type="number"
                  step={step}
                  placeholder={placeholder?.max ?? "No max"}
                  {...field}
                  value={field.value ?? ""}
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

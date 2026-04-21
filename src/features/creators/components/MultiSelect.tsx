import { Button } from "@/components/ui/button";

export function MultiToggle<T extends string>({
  options,
  value,
  onChange,
  getLabel,
}: {
  options: readonly T[];
  value: T[] | undefined;
  onChange: (next: T[]) => void;
  getLabel?: (option: T) => string;
}) {
  function toggle(option: T) {
    const current = value ?? [];
    const next = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];
    onChange(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          variant={value?.includes(option) ? "default" : "secondary"}
          size="sm"
          onClick={() => toggle(option)}
        >
          {getLabel ? getLabel(option) : option}
        </Button>
      ))}
    </div>
  );
}
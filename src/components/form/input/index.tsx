// components/ui/form/form-input.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  className = "grid gap-2",
  inputClassName = "w-full",
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={className}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              required={required}
              {...field}
              className={inputClassName}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

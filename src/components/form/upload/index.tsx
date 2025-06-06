// components/ui/form/form-upload.tsx
import { useRef, useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  defaultImage?: string;
}

export function FormUpload<T extends FieldValues>({
  control,
  name,
  label,
  defaultImage,
}: FormUploadProps<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const watchedFile = useWatch({ control, name });
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImage || null
  );

  useEffect(() => {
    if (watchedFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(watchedFile);
    } else if (typeof watchedFile === "string") {
      setPreviewUrl(watchedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [watchedFile]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="flex gap-4 items-start">
            <Avatar className="aspect-square w-[100px] h-[100px] rounded-md overflow-hidden">
              {previewUrl ? (
                <AvatarImage src={previewUrl} />
              ) : (
                <AvatarFallback className="rounded-none">IMG</AvatarFallback>
              )}
            </Avatar>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file);
                }
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed hover:bg-muted transition"
              )}
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

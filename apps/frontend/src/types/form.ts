// Form-related types
export interface PolicyFormProps {
  formData: Partial<import("./policy").PolicyFormData>;
  errors: Record<string, string>;
  onChange: (
    field: keyof import("./policy").PolicyFormData,
    value: string
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isEdit?: boolean;
  submitButtonText?: string;
  showSubmitButton?: boolean;
}

export interface PolicyFormContainerProps {
  initialData?: import("./policy").Policy | null;
  onSuccess?: () => void;
  submitButtonText?: string;
  showSubmitButton?: boolean;
  onValidityChange?: (isValid: boolean) => void;
  onChangesChange?: (hasChanges: boolean) => void;
}

export interface PolicyFormContainerRef {
  submit: () => void;
  isFormValid: boolean;
  hasChanges: boolean;
}

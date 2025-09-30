import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { PolicyForm, PolicyFormData } from "./PolicyForm";
import { useCreatePolicy, useUpdatePolicy } from "../../hooks/usePolicies";
import { useToast } from "../../hooks/useToast";
import { Policy } from "../../data/api/policies";

export interface PolicyFormContainerProps {
  initialData?: Policy | null;
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

export const PolicyFormContainer = forwardRef<
  PolicyFormContainerRef,
  PolicyFormContainerProps
>(
  (
    {
      initialData,
      onSuccess,
      submitButtonText,
      showSubmitButton = true,
      onValidityChange,
      onChangesChange,
    },
    ref
  ) => {
    const isEdit = !!initialData;

    const [formData, setFormData] = useState<Partial<PolicyFormData>>({
      name: "",
      type: "security",
      description: "",
      status: "draft",
      priority: "medium",
    });

    const [initialFormData, setInitialFormData] = useState<
      Partial<PolicyFormData>
    >({});

    const [errors, setErrors] = useState<Record<string, string>>({});

    const createPolicyMutation = useCreatePolicy();
    const updatePolicyMutation = useUpdatePolicy();
    const toast = useToast();

    useEffect(() => {
      if (initialData) {
        const initialFormValues = {
          name: initialData.name,
          type: initialData.type,
          description: initialData.description,
          status: initialData.status,
          priority: initialData.priority,
        };
        setFormData(initialFormValues);
        setInitialFormData(initialFormValues);
      } else {
        const defaultValues = {
          name: "",
          type: "security",
          description: "",
          status: "draft",
          priority: "medium",
        };
        setFormData(defaultValues);
        setInitialFormData(defaultValues);
      }
      setErrors({});
    }, [initialData]);

    const onChangesChangeRef = useRef(onChangesChange);
    onChangesChangeRef.current = onChangesChange;

    const onValidityChangeRef = useRef(onValidityChange);
    onValidityChangeRef.current = onValidityChange;

    // Helper function to check if objects are equal
    const objectsEqual = useCallback(
      (
        obj1: Record<string, unknown>,
        obj2: Record<string, unknown>
      ): boolean => {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
          return false;
        }

        for (const key of keys1) {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }

        return true;
      },
      []
    );

    // Notify parent component when form validity changes
    useEffect(() => {
      const isValid = !!(
        formData.name &&
        formData.type &&
        formData.description
      );
      onValidityChangeRef.current?.(isValid);
    }, [formData.name, formData.type, formData.description]);

    // Notify parent component when form changes
    useEffect(() => {
      const hasChanges = !objectsEqual(formData, initialFormData);
      onChangesChangeRef.current?.(hasChanges);
    }, [formData, initialFormData, objectsEqual]);

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.name?.trim()) {
        newErrors.name = "Policy name is required";
      }

      if (!formData.type) {
        newErrors.type = "Policy type is required";
      }

      if (!formData.description?.trim()) {
        newErrors.description = "Description is required";
      }

      if (!formData.status) {
        newErrors.status = "Status is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof PolicyFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error("Please fix validation errors before submitting");
        return;
      }

      try {
        if (isEdit && initialData) {
          toast.success("Updating policy...", 1000);

          await updatePolicyMutation.mutateAsync({
            id: initialData.id,
            updates: formData as Partial<
              Omit<Policy, "id" | "createdAt" | "updatedAt">
            >,
          });
          toast.success("Policy updated successfully!");
        } else {
          toast.success("Creating policy...", 1000);

          await createPolicyMutation.mutateAsync(
            formData as Omit<Policy, "id" | "createdAt" | "updatedAt">
          );
          toast.success("Policy created successfully!");
        }
        onSuccess?.();
      } catch (error) {
        toast.error(
          isEdit
            ? "Failed to update policy. Changes have been reverted."
            : "Failed to create policy"
        );
      }
    };

    const isLoading =
      createPolicyMutation.isPending || updatePolicyMutation.isPending;

    const isFormValid = !!(
      formData.name &&
      formData.type &&
      formData.description
    );

    const hasChanges =
      JSON.stringify(formData) !== JSON.stringify(initialFormData);

    useImperativeHandle(ref, () => ({
      submit: () => {
        // Create a synthetic form event
        const syntheticEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        handleSubmit(syntheticEvent);
      },
      isFormValid,
      hasChanges,
    }));

    return (
      <PolicyForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isEdit={isEdit}
        submitButtonText={submitButtonText}
        showSubmitButton={showSubmitButton}
      />
    );
  }
);

PolicyFormContainer.displayName = "PolicyFormContainer";

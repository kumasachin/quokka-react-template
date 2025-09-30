import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  PolicyFormContainer,
  PolicyFormContainerRef,
} from "./PolicyFormContainer";
import { Policy } from "../../data/api/policies";

interface PolicyFormModalProps {
  open: boolean;
  onClose: () => void;
  policy?: Policy | null;
}

const PolicyFormModal: React.FC<PolicyFormModalProps> = ({
  open,
  onClose,
  policy,
}) => {
  const isEdit = !!policy;
  const formRef = useRef<PolicyFormContainerRef>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  const handleValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleChangesChange = (changes: boolean) => {
    setHasChanges(changes);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="policy-form-modal"
      aria-labelledby="policy-form-title"
      aria-describedby="policy-form-description"
    >
      <DialogTitle id="policy-form-title" data-testid="policy-form-title">
        {isEdit ? `Edit Policy: ${policy?.name}` : "Create New Policy"}
      </DialogTitle>

      <DialogContent>
        <PolicyFormContainer
          ref={formRef}
          initialData={policy}
          onSuccess={onClose}
          showSubmitButton={false}
          onValidityChange={handleValidityChange}
          onChangesChange={handleChangesChange}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }} data-testid="policy-form-actions">
        <Button
          variant="outlined"
          onClick={onClose}
          data-testid="cancel-button"
          aria-label="Cancel and close form without saving"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid || (isEdit && !hasChanges)}
          data-testid="submit-button"
          aria-label={isEdit ? "Update policy" : "Create new policy"}
        >
          {isEdit ? "Update Policy" : "Create Policy"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyFormModal;

import React from "react";
import { Button as MUIButton } from "@mui/material";

interface CustomButton {
  label: string;
  variant: "text" | "outlined" | "contained";
  disabled?: boolean;
  className?: string;
}
const CRMButton = ({
  label,
  variant,
  disabled,
  className,
}: CustomButton) => {
  return (
    <MUIButton 
    variant={variant}
    disabled={disabled} 
    className={className}
    >
      {label}
    </MUIButton>
  );
};

export default CRMButton;

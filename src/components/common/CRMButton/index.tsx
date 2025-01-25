import React from "react";
import { Button  } from "@mui/material";

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
    <Button 
    variant={variant}
    disabled={disabled} 
    className={className}
    >
      {label}
    </Button>
  );
};

export default CRMButton;

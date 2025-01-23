import React from "react";
import { TextField } from "@mui/material";

interface Props {
    label: string;
    placeholder: string;
    required: boolean;
    variant: 'filled' | 'outlined' | 'standard';
    type?: string;
    className: any
}

const CRMTextField = ({ label, placeholder, required, variant, type, className }: Props) => {
    return <TextField
        label={label}
        placeholder={placeholder}
        required={required}
        variant={variant}
        type={type}
        className={className}
    />
}

export default CRMTextField;
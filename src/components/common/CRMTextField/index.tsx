import React from "react";
import { TextField } from "@mui/material";

interface Props {
    label: string;
    placeholder: string;
    required: boolean;
    variant: 'filled' | 'outlined' | 'standard';
    type?: string;
    className: any;
    onTextChange:(e:any)=>void
}


const CRMTextField = ({ label, placeholder, required, variant, type, className,onTextChange }: Props) => {
    const onHandleChange=(e:any)=>{
        onTextChange(e.target.value)
       }
    return <TextField
        label={label}
        placeholder={placeholder}
        required={required}
        variant={variant}
        type={type}
        className={className}
        onChange={(e)=>onHandleChange(e)}
    />
}

export default CRMTextField;
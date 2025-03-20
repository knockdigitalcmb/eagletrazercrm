import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CustomSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}
const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
 const {t}=useTranslation()
  return (
    <FormControl fullWidth variant='filled' data-testid='custom-select'>
      <Select
        labelId='dynamic-dropdown-label'
        value={value}
        onChange={onChange}
        displayEmpty
      >
        <MenuItem value='' disabled>
          {t('selectOption')}
        </MenuItem>
        {options.map((option,index) => (
          <MenuItem key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CustomSelect;

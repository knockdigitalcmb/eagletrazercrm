import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
 
interface DatePickerProps {
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  placeholder?: string;
  sx?: object;
}

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  placeholder,
  sx
}: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        format='DD-MM-YYYY'
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder:  placeholder,
            sx,
          },
          actionBar: {
            actions: ['today', 'cancel'],
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;

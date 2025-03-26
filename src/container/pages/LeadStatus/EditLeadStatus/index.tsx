import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { LeadStatusType } from '../../../../models/type';
import { CRMServiceAPI } from 'services/CRMService';
import { useTranslation } from 'react-i18next';

interface EditLeadStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  data: LeadStatusType;
}

const EditLeadStatusModal: React.FC<EditLeadStatusModalProps> = ({
  open,
  onClose,
  data,
  onSave,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LeadStatusType>({
    id: 0,
    name: '',
    color: '',
    date_visibility: false,
    status: 'Active',
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (event: any) => {
    setFormData({ ...formData, status: event.target.value });
  };

  const handleColorChange = (event: any) => {
    setFormData({ ...formData, color: event.target.value });
  };

  const handleDateVisibilityChange = (isChecked: boolean) => {
    setFormData({ ...formData, date_visibility: isChecked });
  };

  const handleSubmit = async () => {
    try {
      await CRMServiceAPI.updateLeadStatus(formData.id, formData);
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to update lead status:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='edit-lead-status-modal'
    >
      <Box
        sx={{
          width: 500,
          height: 500,
          backgroundColor: 'white',
          padding: 4,
          position: 'relative',
          margin: 'auto',
          top: '8%',
        }}
      >
        <Typography variant='h6' sx={{ mb: 2, borderRadius: '8px' }}>
          {t('editLeadStatus')}
        </Typography>
        <Divider sx={{ mb: 3, borderBottom: '2px solid #FFC107' }} />

        <IconButton
          sx={{
            position: 'absolute',
            top: 20,
            right: 15,
            color: 'gray',
            transition: '0.3s',
            '&:hover': { color: 'black' },
          }}
          onClick={onClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>

        <TextField
          fullWidth
          placeholder='Lead Status Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          required
        />

        <Typography variant='body2' mt={2} mb={1}>
          Status
        </Typography>
        <Box display='flex' gap={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.status === 'Active'}
                onChange={() => handleStatusChange('Active')}
                sx={{
                  color: '#FFC107',
                  '&.Mui-checked': { color: '#FFC107' },
                }}
              />
            }
            label='Active'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.status === 'Inactive'}
                onChange={() => handleStatusChange('Inactive')}
              />
            }
            label='Inactive'
          />
        </Box>

        <Box mt={3}>
          <Typography variant='body2' mb={1} fontWeight='bold'>
            Status Color:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: '1px solid #ddd',
              padding: 2,
              borderRadius: 2,
              width: '80',
            }}
          >
            <input
              type='color'
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
            />
          </Box>
        </Box>

        <Typography variant='body2' mt={2} mb={1} fontWeight='bold'>
          Date Visibility
        </Typography>
        <Box display='flex' gap={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.date_visibility === true}
                onChange={() => handleDateVisibilityChange(true)}
              />
            }
            label='Active'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.date_visibility === false}
                onChange={() => handleDateVisibilityChange(false)}
              />
            }
            label='Inactive'
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditLeadStatusModal;

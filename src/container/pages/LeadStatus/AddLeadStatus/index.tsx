import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CRMServiceAPI } from 'services/CRMService';
import { useTranslation } from 'react-i18next';

interface AddLeadStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddLeadStatusModal: React.FC<AddLeadStatusModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    color: '#561ECB',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (status: 'Active' | 'Inactive') => {
    setFormData({ ...formData, status });
  };

  const handleSubmit = async () => {
    try {
      await CRMServiceAPI.createLeadStatus({
        name: formData.name,
        status: formData.status,
        color: formData.color,
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to add lead status:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='add-lead-status-modal'
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '450px', md: '500px' },
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 8,
          boxShadow: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            color: 'gray',
            transition: '0.3s',
            '&:hover': { color: 'black' },
          }}
          onClick={onClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>

        <Typography variant='h6' sx={{ mb: 2, borderRadius: '8px' }}>
          {t('addLeadStatus')}
        </Typography>
        <Divider sx={{ mb: 3, borderBottom: '2px solid #FFC107' }} />

        <TextField
          fullWidth
          placeholder='Lead Status Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          required
        />

        <Typography variant='body2' mt={2} mb={1} fontWeight='bold'>
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

        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
          <Button onClick={handleSubmit} variant='contained'>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLeadStatusModal;

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
          width: { xs: '90%', sm: '420px', md: '460px' },
          backgroundColor: 'white',
          padding: 2,
          borderRadius: '12px',
          border: '1px solid #ddd',
          boxShadow: 4,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'gray',
            transition: '0.3s',
            '&:hover': { color: 'black' },
          }}
          onClick={onClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>

        <Typography variant='h6' sx={{ mb: 0.5 }}>
          {t('addLeadStatus')}
        </Typography>
        <Divider sx={{ borderBottom: '2px solid #FFC107', mb: 1 }} />
        <Typography variant='subtitle1'>{t('leadStatusName')}</Typography>
        <TextField
          fullWidth
          placeholder={t('leadStatusName')}
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Typography variant='subtitle1'>{t('statusHeading')}</Typography>
        <Box display='flex'>
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
            label={t('active')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.status === 'Inactive'}
                onChange={() => handleStatusChange('Inactive')}
              />
            }
            label={t('inactive')}
          />
        </Box>

        <Typography variant='subtitle1'>{t('statusColor')}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            padding: 0.8,
            borderRadius: 4,
            width: '100%',
          }}
        >
          <input
            type='color'
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            style={{
              width: '100%',
              height: '35px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleSubmit} variant='contained'>
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLeadStatusModal;

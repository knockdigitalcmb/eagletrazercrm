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
          width: 450,
          backgroundColor: 'white',
          padding: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '12px',
          border: '1px solid #ddd',
          boxShadow: 10,
          overflow: 'hidden',
        }}
      >
        <Typography variant='h6' sx={{ marginBottom: 1 }}>
          {t('editLeadStatus')}
        </Typography>
        <Divider sx={{ mb: 1, borderBottom: '2px solid #FFC107' }} />

        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'gray',
            transition: '0.3s',
            '&:hover': { color: 'black' },
          }}
          onClick={onClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
        <Typography variant='subtitle1' mt={1}>
          {t('leadStatusName')}
        </Typography>

        <TextField
          fullWidth
          placeholder='Lead Status Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='dense'
          required
        />

        <Typography variant='subtitle1' mt={1}>
          {t('Status')}
        </Typography>
        <Box display='flex' gap={1.2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.status === 'Active'}
                onChange={() => handleStatusChange('Active')}
                sx={{ color: '#FFC107', '&.Mui-checked': { color: '#FFC107' } }}
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

        <Box mt={1}>
          <Typography variant='subtitle1' mt={1}>
            {t('statusColor')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: 1,
              borderRadius: '6px',
              width: '100%',
              overflow: 'hidden',
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
                border: 'none',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>

        <Typography variant='subtitle1' mt={1}>
          {t('dateVisibility')}
        </Typography>
        <Box display='flex' gap={1.2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.date_visibility}
                onChange={() => handleDateVisibilityChange(true)}
              />
            }
            label={t('active')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!formData.date_visibility}
                onChange={() => handleDateVisibilityChange(false)}
              />
            }
            label={t('inactive')}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditLeadStatusModal;

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
import styles from './AddLeadStatus.module.scss';

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
        className={styles.leadStatusModal}
      
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 15,
            right: 6,
            color: 'gray',
          }}
          onClick={onClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>

        <Typography variant='h6'>{t('addLeadStatus')}</Typography>
        <Divider sx={{ borderBottom: '2px solid #FFC107', mb: 1 }} />

        <TextField
          fullWidth
          placeholder={t('leadStatusName')}
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ mb: 0.5 }}
        />

        <Typography variant='subtitle1'>{t('Status')}</Typography>
        <Box display='flex' gap={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.status === 'Active'}
                onChange={() => handleStatusChange('Active')}
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='color'
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            style={{
              width: '50%',
              height: '28px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button onClick={handleSubmit} variant='contained' size='small'>
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLeadStatusModal;

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
import styles from './EditLeadStatus.module.scss';

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

  const handleStatusChange = (status: string) => {
    setFormData({ ...formData, status });
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
      <Box className={styles.editLeadStatusModal}>
        {/* Header with Close Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6'>{t('editLeadStatus')}</Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: 15,
              right: 10,
              color: 'gray',
            }}
            onClick={onClose}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2, borderBottom: '2px solid #FFC107' }} />

        <TextField
          fullWidth
          placeholder='Lead Status Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          size='small'
        />

        <Typography variant='subtitle1' mt={1}>
          {t('Status')}
        </Typography>
        <Box display='flex' gap={2}>
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

        <Typography variant='subtitle1' mt={1}>
          {t('statusColor')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='color'
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            style={{
              width: '50%',
              height: '35px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        </Box>

        <Typography variant='subtitle1' mt={1}>
          {t('dateVisibility')}
        </Typography>
        <Box display='flex' gap={2}>
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditLeadStatusModal;

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
import { useTranslation } from 'react-i18next';
import styles from './AddLeadSourceModal.module.scss';
import { leadSource } from 'constant/common.constant';
interface AddLeadSourceModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: { sourceName: string; status: string }) => void;
  initialData?: { sourceName: string; status: string } | null;
}

const AddLeadSourceModal: React.FC<AddLeadSourceModalProps> = ({
  open,
  handleClose,
  handleSave,
  initialData,
}) => {
  const { t } = useTranslation();
  const [sourceName, setSourceName] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  useEffect(() => {
    if (initialData) {
      setSourceName(initialData.sourceName);
      setStatus(initialData.status === 'Inactive' ? 'Inactive' : 'Active');
    } else {
      setSourceName('');
      setStatus('Active');
    }
  }, [initialData, open]);

  const onSave = () => {
    if (sourceName.trim() === '') return;
    handleSave({ sourceName, status });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='add-lead-source-modal'
    >
      <Box className={styles.leadSourceModal}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            id='add-lead-source-modal'
            variant='h6'
            component='h2'
            sx={{ fontWeight: 'normal' }}
          >
            {initialData ? t('editLeadSource') : t('addLeadSource')}
          </Typography>
          <IconButton onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2, borderBottom: '2px solid #FFC107' }} />

        <TextField
          placeholder={t('sourceName')}
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          fullWidth
          margin='dense'
          required
        />

        <Typography variant='subtitle1' mt={1}>
          {t('editStatus')}
        </Typography>
        <Box display='flex' gap={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={status === 'Active'}
                onChange={() => setStatus('Active')}
                sx={{ color: '#FFC107', '&.Mui-checked': { color: '#FFC107' } }}
              />
            }
            label={t('Active')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status === 'Inactive'}
                onChange={() => setStatus('Inactive')}
              />
            }
            label={t('Inactive')}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant='contained' onClick={onSave}>
            {initialData ? t('submit') : t('save')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLeadSourceModal;

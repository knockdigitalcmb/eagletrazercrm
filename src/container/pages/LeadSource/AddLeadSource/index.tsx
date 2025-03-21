import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import styles from './AddLeadSource.module.scss';

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
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      classes={{ paper: styles.dialogPaper }}
      aria-labelledby='lead-source-modal-title'
      aria-describedby='lead-source-modal-description'
    >
      <Box className={styles.dialogTitleContainer}>
        <Typography
          id='lead-source-modal-title'
          className={styles.dialogTitleText}
          variant='h6'
          component='h2'
        >
          {initialData ? t('editLeadSource') : t('addLeadSource')}
        </Typography>
        <IconButton
          onClick={handleClose}
          className={styles.closeButton}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        id='lead-source-modal-description'
        className={styles.dialogContentCustom}
      >
        <Box display='flex' flexDirection='column' gap={2}>
          <Box>
            <Typography variant='subtitle1' mb={1}>
              {t('sourceName')}
            </Typography>
            <TextField
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              fullWidth
            />
          </Box>

          <Box>
            <Typography variant='subtitle1' mb={1}>
              {t('editStatus')}
            </Typography>
            <Box display='flex' gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status === 'Active'}
                    onChange={() => setStatus('Active')}
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
          </Box>
        </Box>
      </DialogContent>

      <DialogActions className={styles.dialogActionsCustom}>
        {!initialData && (
          <Button onClick={handleClose} variant='text'>
            {t('cancel')}
          </Button>
        )}
        <Button variant='contained' onClick={onSave}>
          {initialData ? t('submit') : t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeadSourceModal;

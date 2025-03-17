import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

interface AddLeadSourceModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: { sourceName: string; status: string }) => void;
}

const AddLeadSourceModal: React.FC<AddLeadSourceModalProps> = ({
  open,
  handleClose,
  handleSave,
}) => {
  const { t } = useTranslation();
  const [sourceName, setSourceName] = useState('');
  const [status, setStatus] = useState('');

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const onSave = () => {
    if (!sourceName || !status) return;
    handleSave({ sourceName, status });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{t('addLeadSource')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label={t('sourceName')}
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            fullWidth
            margin='normal'
            sx={{ mt: 0, mb: 0.5 }}
          />

          <Typography variant='body1' sx={{ mb: 1 }}>
            {t('leadSourcestatus')}
          </Typography>
          <FormGroup row>
            {['Active', 'Inactive'].map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={status === item}
                    onChange={() => handleStatusChange(item)}
                  />
                }
                label={t(item.toLowerCase())}
              />
            ))}
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          {t('cancel')}
        </Button>
        <Button onClick={onSave} color='primary' variant='contained'>
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeadSourceModal;

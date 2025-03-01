import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DraggableDialogProps {
  open: boolean;
  onClose: () => void;
  onHandleContinue: () => void;
}

const LogoutModal: React.FC<DraggableDialogProps> = ({
  open,
  onClose,
  onHandleContinue,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='logout-dialog-title'
      aria-describedby='logout-dialog-description'
      id='logout-modal'
    >
      <DialogTitle id='logout-dialog-title'>{t('logout')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='logout-dialog-description'>
          {t('confirmationLogout')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandleContinue}>Yes, Continue</Button>
        <Button onClick={onClose} autoFocus>
          No, Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;

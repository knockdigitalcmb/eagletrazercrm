import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DraggableDialogProps } from '../../models/type';
import { useTranslation } from 'react-i18next';

import styles from './ConfirmationModal.module.scss';

const ConfirmationModal: React.FC<DraggableDialogProps> = ({
  open,
  onClose,
  onHandleContinue,
  title,
  titleDescription,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='logout-dialog-title'
      aria-describedby='logout-dialog-description'
      id='logout-modal'
      data-testid='logout-modal'
      sx={{ '& .MuiPaper-root': { borderRadius: '12px' } }}
    >
      <Box sx={{ padding: '20px' }}>
        <DialogTitle id='logout-dialog-title' data-testid='logout-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='logout-dialog-description'
            data-testid='logout-dialog-description'
          >
            {titleDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onHandleContinue}
            className={styles.conformButton}
            data-testid='logout-continue-btn'
          >
            {t('yesContinue')}
          </Button>
          <Button
            onClick={onClose}
            className={styles.conformButton}
            autoFocus
            data-testid='logout-cancel-btn'
          >
            {t('noCancel')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;

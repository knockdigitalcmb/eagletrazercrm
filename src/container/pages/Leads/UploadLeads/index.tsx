import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  styled,
  Typography,
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import styles from './UploadLeads.module.scss';

interface UploadLeads {
  open: boolean;
  setUploadLead: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleLeadsUploadFile: (fileData: File) => void;
}
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadLeads = ({
  open,
  setUploadLead,
  onHandleLeadsUploadFile,
}: UploadLeads) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileValidationError, setFileValidationError] = useState<string>('');

  //on handle upload leads close
  const onHandleUploadLeadsClose = () => {
    setUploadLead(false);
    onHandleUploadFileReset();
  };

  // on handle file submit
  const onHandleFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    if (!file) {
      setFileValidationError(`${t('uploadFileRequired')}`);
      setSelectedFile(null);
      return;
    }
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!validTypes.includes(file.type)) {
      setFileValidationError(`${t('invalidUploadFile')}`);
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileValidationError(`${t('invalidUploadFileFormat')}`);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setFileValidationError('');
  };
  // on handle upload file reset
  const onHandleUploadFileReset = () => {
    setSelectedFile(null);
    setFileValidationError('');
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onHandleUploadLeadsClose();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modalWrapper}>
        <Grid2
          container
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {t('uploadLeads')}
          </Typography>
          <IconButton>
            <GridCloseIcon
              onClick={onHandleUploadLeadsClose}
              data-testid='close-button '
            />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Box id='modal-modal-description'>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ mt: '10px', mb: '20px' }}
          >
            {t('uploadLeads')}
            <VisuallyHiddenInput
              type='file'
              onChange={onHandleFileSubmit}
              multiple
            />
          </Button>
          <Typography
            variant='caption'
            color='grey.600'
            display='block'
            marginBottom={'20px'}
          >
            {t('uploadFileRequirement')}
          </Typography>
          {selectedFile && (
            <Typography variant='body2' sx={{ mb: '20px' }}>
              {selectedFile.name}
            </Typography>
          )}
          {fileValidationError && (
            <Typography color='error' variant='body2' sx={{ mb: '20px' }}>
              {' '}
              {fileValidationError}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
          <Button variant='outlined' onClick={onHandleUploadFileReset}>
            {t('reset')}
          </Button>
          <Button
            variant='contained'
            disabled={!selectedFile}
            onClick={() => {
              if (selectedFile) {
                onHandleLeadsUploadFile(selectedFile);
              }
            }}
          >
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadLeads;

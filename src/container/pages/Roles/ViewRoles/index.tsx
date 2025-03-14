import { Box, IconButton, Typography, Modal, Grid2 } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ViewRoles.module.scss';

interface Props {
  open: boolean;
  onHandleCloseViewModal: () => void;
  row: any;
}

const ViewRoles = ({ open, onHandleCloseViewModal, row }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={onHandleCloseViewModal}
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
            {t('viewRole')}
          </Typography>
          <IconButton>
            <CloseIcon onClick={onHandleCloseViewModal} />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        {row && (
          <div className={styles.modalBody}>
            <Typography className={styles.modalBody}>
              <b>{t('roleHeading')}</b>{' '}
              <span className={styles.roleValues}>{row.role}</span>
            </Typography>
            <Typography className={styles.modalBody}>
              <b>{t('permissionHeading')}</b>{' '}
              {Object.keys(row.permission)
                .filter(
                  (key) => row.permission[key as keyof typeof row.permission]
                )
                .map((key, index, array) => (
                  <span key={`${key}-${index}`} className={styles.roleText}>
                    {key}
                    {index !== array.length - 1 ? ' - ' : ''}
                  </span>
                ))}
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ViewRoles;

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box ,
  Typography,
  Grid2,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface ViewUserDetailsProps {
  open: boolean;
  onClose: () => void;
  selectedUser: any;
}

const ViewUserDetails: React.FC<ViewUserDetailsProps> = ({
  open,
  onClose,
  selectedUser,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          boxShadow: 5,
          borderRadius: 2,
          fontFamily: 'Lato, sans-serif',
        },
      }}
    >
      <DialogTitle sx={{ padding: '12px 16px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottom: '2px solid #fec601',
            paddingBottom: '8px',
          }}
        >
          <Typography variant="h6"  color="text.primary">
            {t('userDetails')}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'gray' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {!selectedUser ? (
          <Typography variant='body1'>No user selected.</Typography>
        ) : (
          <>
            <Grid2 container spacing={2} sx={{ mt: 1 }}>
              <Grid2 size={{ xs: 12, sm: 6, md: 7 }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    // fontWeight: 'bold',
                  }}
                >
                  Basic Information
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>{t('id')}</strong> {selectedUser.employeeId}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {' '}
                  <strong>{t('name')}</strong> {selectedUser.userName}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {' '}
                  <strong>{t('email')}</strong> {selectedUser.email}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>{t('phone')}</strong> {selectedUser.phoneNumber}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>{t('location')}</strong> {selectedUser.location}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {' '}
                  <strong>{t('address')}</strong> {selectedUser.address}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    // fontWeight: 'bold',
                  }}
                >
                  {t('experience')}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>{t('joiningDate')}</strong>{' '}
                  {selectedUser.dateOfJoining}
                </Typography>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    mt: 1,
                    // fontWeight: 'bold',
                  }}
                >
                  {t('userRole')}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>{t('roleTitle')}</strong> {selectedUser.role}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>{t('status')}</strong> {selectedUser.status}
                </Typography>
              </Grid2>
            </Grid2>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default ViewUserDetails;

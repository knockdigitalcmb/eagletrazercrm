import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Modal,
  Grid2,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PermissionProps } from '../../../../models/type';
import CloseIcon from '@mui/icons-material/Close';

import styles from './CreateAndEditRoles.module.scss';

interface Props {
  open: boolean;
  row: any;
  onHandleCloseCreateRoleModal: () => void;
  register: any;
  errors: any;
  onHandleRoleSubmit: () => void;
}

const CreateAndEditRoles = ({
  open,
  row,
  onHandleCloseCreateRoleModal,
  register,
  errors,
  onHandleRoleSubmit,
}: Props) => {
  const { t } = useTranslation();
  console.log(row);
  const permission: (keyof PermissionProps)[] = [
    'create',
    'edit',
    'view',
    'delete',
  ];
  return (
    <Modal
      data-testid='create-edit-modal'
      open={open}
      onClose={() => {
        onHandleCloseCreateRoleModal();
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
            {row ? `${t('editRole')}` : t('createRole')}
          </Typography>

          <IconButton>
            <CloseIcon
              onClick={onHandleCloseCreateRoleModal}
              data-testid='close-button '
            />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Box id='modal-modal-description' sx={{ mt: 2 }}>
          <TextField
            placeholder={t('rolePlaceholder')}
            defaultValue={row?.role || ''}
            {...register('role', { required: `${t('roleRequired')}` })}
            error={Boolean(errors.role)}
            helperText={errors.role ? errors.role.message : ''}
          ></TextField>
          <FormGroup sx={{ mt: 2 }}>
          <Typography sx={{ mr: 2, fontWeight: 'bold' }}>Permissions:</Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {permission.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      defaultChecked={row?.permission?.[permission] || false}
                      {...register(`permission.${permission}`)}
                    />
                  }
                  label={
                    permission.charAt(0).toUpperCase() + permission.slice(1)
                  }
                ></FormControlLabel>
              ))}
            </Box>
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
            <Button
              variant='contained'
              onClick={onHandleRoleSubmit}
              data-testid='submit-button'
            >
              {t('submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateAndEditRoles;

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
  return (
    <Modal
      open={open}
      onClose={() => {
        onHandleCloseCreateRoleModal();
        // setSelectedRole(null);
        // reset();
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
            {row ? 'Edit Role' : t('createRole')}
          </Typography>

          <IconButton>
            <CloseIcon onClick={onHandleCloseCreateRoleModal} />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Box id='modal-modal-description' sx={{ mt: 2 }}>
          <TextField
            placeholder={t('rolePlaceholder')}
            defaultValue={row?.role || ''}
            {...register('role', { required: `${t('roleRequired')}` })}
            error={!!errors.role}
            helperText={errors.role?.message}
          ></TextField>
          <FormGroup sx={{ mt: 2 }}>
            <Typography sx={{ mr: 2 }}>Permissions:</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={row?.permission.create || false}
                    {...register('permission.create')}
                  />
                }
                label='Create'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={row?.permission.edit || false}
                    {...register('permission.edit')}
                  />
                }
                label='Edit'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={row?.permission.view || false}
                    {...register('permission.view')}
                  />
                }
                label='View'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={row?.permission.delete || false}
                    {...register('permission.delete')}
                  />
                }
                label='Delete'
              />
            </Box>
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
            <Button variant='contained' onClick={onHandleRoleSubmit}>
              {t('submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateAndEditRoles;

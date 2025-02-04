import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  Box,
  Grid2,
  Typography,
  styled,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { defaultCreateUserProps } from '../../../constant/payload.const';

import styles from './CreateUser.module.scss';
import { CreateUserType } from '../../../models/type';
import { useTranslation } from 'react-i18next';

const CreateUser: React.FC = () => {
  const { t } = useTranslation();
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

  const asterisk = '\u002A';
  const [user, setUser] = useState<CreateUserType>(defaultCreateUserProps);
  const [showPassword, setShowPassword] = useState(false);
  const [permissions, setPermissions] = useState<
    { [key: string]: boolean } | undefined
  >(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

 // On Handle Toggle Password Visibility
  const onHandleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        setFileError('Invalid file format. Please upload a PNG or JPG file.');
        setSelectedFile(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFileError('File size exceeds 2MB. Please upload a smaller file.');
        setSelectedFile(null);
        return;
      }
      setFileError('');
      setSelectedFile(file);
      const profileUrl = URL.createObjectURL(file);
      setUser((prevState) => ({
        ...prevState,
        profile: profileUrl,
      }));
    }
  };

  const adminPermissions: { [key: string]: boolean } = {
    otpPageView: true,
    employeeView: true,
    employeeEdit: true,
    employeeDelete: true,
  };

  const viewerPermissions: { [key: string]: boolean } = {
    otpPageView: true,
    employeeView: true,
  };

  const userRole = 'admin';
  const userPermissions =
    userRole === 'admin' ? adminPermissions : viewerPermissions;

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onHandlePermissionChange = (permission: string) => {
    if (permissions) {
      setPermissions((prev) => ({
        ...prev!,
        [permission]: !prev![permission],
      }));
    }
  };

  const validateForm = () => {
    let validationErrors: { [key: string]: string } = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!user.employeeId)
      validationErrors.employeeId = 'Employee Id is required';
    if (!user.userName) validationErrors.userName = 'User Name is required';
    else if (!nameRegex.test(user.userName))
      validationErrors.userName = 'User Name should contain only letters';
    if (!user.phoneNumber)
      validationErrors.phoneNumber = 'Phone Number is required';
    else if (user.phoneNumber.length > 10 || !phoneRegex.test(user.phoneNumber))
      validationErrors.phoneNumber = 'Invalid Phone Number';
    if (!user.email) validationErrors.email = 'Email ID is required';
    else if (!emailRegex.test(user.email))
      validationErrors.email = 'Invalid email Format';
    if (!user.location) validationErrors.location = 'Location is required';
    if (!user.joiningDate)
      validationErrors.joiningDate = 'Joining Date is required';
    if (!user.password) {
      validationErrors.password = 'Password is required';
    } else if (user.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Za-z]/.test(user.password)) {
      validationErrors.password = 'Password must contain at least one letter';
    } else if (!/\d/.test(user.password)) {
      validationErrors.password = 'Password must contain at least one number';
    }
    if (!user.role) validationErrors.role = 'User Role is required';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('User Data:', user);
      console.log('Permissions:', permissions);
      setUser(defaultCreateUserProps);
      setPermissions(undefined);
      setSelectedFile(null);
      setFileError('');
      setErrors({});
      setOpenSnackbar(true);
    }
  };

  return (
    <Box data-testid='createUser-page'>
      <Grid2 container spacing={10} className={styles.CreateUserContainer}>
        <Grid2 size={6} className={styles.CreateUserLeftContainer}>
          <Grid2 className={styles.basicInfoWrapper}>
            <Typography variant='h5' className={styles.createUserHeading}>
              {t('basicInformation')}
            </Typography>
            <TextField
              id='employee-ID'
              data-testid='employee-id'
              name='employeeId'
              value={user.employeeId}
              onChange={onHandleChange}
              placeholder={`${t('employeeId')}${asterisk}`}
              error={!!errors.employeeId}
              helperText={errors.employeeId}
            />
            <TextField
              id='user-name'
              data-testid='user-name'
              name='userName'
              value={user.userName}
              onChange={onHandleChange}
              placeholder={`${t('userName')}${asterisk}`}
              error={!!errors.userName}
              helperText={errors.userName}
            />
            <TextField
              id='phone-number'
              data-testid='phone-number'
              name='phoneNumber'
              value={user.phoneNumber}
              onChange={onHandleChange}
              placeholder={`${t('phoneNumber')}${asterisk}`}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              id='email'
              data-testid='email'
              name='email'
              value={user.email}
              onChange={onHandleChange}
              placeholder={`${t('email')}${asterisk}`}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id='location'
              data-testid='location'
              name='location'
              value={user.location}
              onChange={onHandleChange}
              placeholder={`${t('location')}${asterisk}`}
              error={!!errors.location}
              helperText={errors.location}
            />
            <TextField
              id='address'
              data-testid='address'
              name='address'
              value={user.address}
              onChange={onHandleChange}
              multiline
              rows={1}
              placeholder={t('address')}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              id='password'
              data-testid='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={user.password}
              onChange={onHandleChange}
              placeholder={`${t('passwordPlaceholder')}${asterisk}`}
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input:{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={onHandleTogglePasswordVisibility} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              }}
            />
            <Typography variant='body1' className={styles.profilePicture}>
              {' '}
              {t('addPicture')}
            </Typography>
            <Button
              component='label'
              variant='contained'
              startIcon={<CloudUploadIcon />}
              className={styles.chooseFileButton}
            >
              {t('chooseFile')}
              <VisuallyHiddenInput type='file' onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Box className={styles.profilePictureBox}>
                <Typography variant='body1'>
                  {t('file')} {selectedFile.name}
                </Typography>
                <Button
                  className={styles.viewButton}
                  onClick={() => window.open(URL.createObjectURL(selectedFile))}
                >
                  {t('view')}
                </Button>
                <Button
                  variant='contained'
                  sx={{ ml: 2 }}
                  download={selectedFile.name}
                  href={URL.createObjectURL(selectedFile)}
                  className={styles.downloadButton}
                >
                  {t('download')}
                </Button>
              </Box>
            )}
            {fileError && <Typography color='error'>{fileError}</Typography>}
          </Grid2>
          <Grid2 className={styles.experienceWrapper}>
            <Typography variant='h5' className={styles.createUserHeading}>
              {t('Experience')}
            </Typography>
            <TextField
              name='joiningDate'
              type='date'
              value={user.joiningDate}
              onChange={onHandleChange}
              placeholder={`${t('joiningDate')}${asterisk}`}
              error={!!errors.joiningDate}
              helperText={errors.joiningDate}
              InputLabelProps={{ shrink: true }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">{asterisk}</InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              name='previousCompany'
              value={user.previousCompany}
              onChange={onHandleChange}
              placeholder={t('previousCompany')}
            />
            <div className={styles.experienceSection}>
              <TextField
                name='experienceYears'
                value={user.experienceYears}
                onChange={onHandleChange}
                placeholder={t('experienceYears')}
              />
              <TextField
                name='experienceMonths'
                value={user.experienceMonths}
                onChange={onHandleChange}
                placeholder={t('experienceMonths')}
              />
            </div>
          </Grid2>
        </Grid2>
        <Grid2 size={6}>
          <Grid2>
            <Typography>{t('userRole')}</Typography>
            <FormControl fullWidth error={!!errors.role}>
              <Select
                name='role'
                value={user.role || ''}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                label='User Role'
              >
                <MenuItem value='admin'>{t('admin')}</MenuItem>
                <MenuItem value='lead'>{t('lead')}</MenuItem>
                <MenuItem value='employee'>{t('employee')}</MenuItem>
                <MenuItem value='developer'>{t('developer')}</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2>
            <Typography>{t('userPermission')}</Typography>
            <FormGroup>
              <Box sx={{ mt: 2 }}>
                <Typography>{t('otpPage')}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.otpPageView : false}
                      onChange={() => onHandlePermissionChange('otpPageView')}
                    />
                  }
                  label='View'
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography>Employee</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.employeeView : false}
                      onChange={() => onHandlePermissionChange('employeeView')}
                    />
                  }
                  label='View'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.employeeAdd : false}
                      onChange={() => onHandlePermissionChange('employeeAdd')}
                    />
                  }
                  label='Add'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.employeeEdit : false}
                      onChange={() => onHandlePermissionChange('employeeEdit')}
                    />
                  }
                  label='Edit'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.employeeDelete : false}
                      onChange={() =>
                        onHandlePermissionChange('employeeDelete')
                      }
                    />
                  }
                  label='Delete'
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography>Leads</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.leadsView : false}
                      onChange={() => onHandlePermissionChange('leadsView')}
                    />
                  }
                  label='View'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.leadsAdd : false}
                      onChange={() => onHandlePermissionChange('leadsAdd')}
                    />
                  }
                  label='Add'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.leadsEdit : false}
                      onChange={() => onHandlePermissionChange('leadsEdit')}
                    />
                  }
                  label='Edit'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.leadsDelete : false}
                      onChange={() => onHandlePermissionChange('leadsDelete')}
                    />
                  }
                  label='Delete'
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography>Developer</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.developerView : false}
                      onChange={() => onHandlePermissionChange('developerView')}
                    />
                  }
                  label='View'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.developerAdd : false}
                      onChange={() => onHandlePermissionChange('developerAdd')}
                    />
                  }
                  label='Add'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.developerEdit : false}
                      onChange={() => onHandlePermissionChange('developerEdit')}
                    />
                  }
                  label='Edit'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions ? permissions.leadsDelete : false}
                      onChange={() =>
                        onHandlePermissionChange('developerDelete')
                      }
                    />
                  }
                  label='Delete'
                />
              </Box>
            </FormGroup>
          </Grid2>
        </Grid2>
      </Grid2>
      <Box className={styles.createUserSave}>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {t('save')}
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity='success'
            sx={{ width: '100%' }}
          >
            Save Successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
export default CreateUser;

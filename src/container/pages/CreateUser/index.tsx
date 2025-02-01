import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Avatar,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';

import './CreateUser.module.scss';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    email: '',
    location: '',
    address: '',
    password: '',
    profileImage: null as string | null,
    joiningDate: '',
    prevCompany: '',
    experienceYears: '',
    experienceMonths: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0]; // Using optional chaining to safely access the first file
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        profileImage: URL.createObjectURL(files),
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Form submission logic here
  };

  return (
    <Box className='profile-form-container'>
      {/* Profile Image positioned at the top right */}
      <Box className='profile-image-container'>
        <input
          type='file'
          accept='image/*'
          id='profile-image-input'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor='profile-image-input'>
          <Avatar
            alt='Profile Image'
            src={formData.profileImage || '/path/to/default/image.jpg'}
            className='profile-image'
          />
        </label>
      </Box>

      <Typography variant='h5' gutterBottom>
        User Profile Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <Typography variant='h6' gutterBottom>
          Profile Information
        </Typography>
        <Grid container className='form-section'>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='User Name'
              name='userName'
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Phone Number'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Email ID'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Location'
              name='location'
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>

        {/* Experience Section */}
        <Typography variant='h6' gutterBottom sx={{ marginTop: 4 }}>
          Experience Informations
        </Typography>
        <Grid container className='form-section'>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Joining Date'
              name='joiningDate'
              type='date'
              value={formData.joiningDate}
              onChange={handleInputChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Previous Company'
              name='prevCompany'
              value={formData.prevCompany}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Years of Experience'
              name='experienceYears'
              value={formData.experienceYears}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Years</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className='text-field'
              label='Months of Experience'
              name='experienceMonths'
              value={formData.experienceMonths}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Months</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box className='save-button'>
          <Button type='submit' variant='contained' color='primary'>
            Save Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateUser;

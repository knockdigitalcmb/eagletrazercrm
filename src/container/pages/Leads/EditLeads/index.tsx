import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useTranslation } from 'react-i18next';
import DatePicker from 'components/DatePicker';
import {
  leadSource,
  leadFollower,
  leadStatus,
} from '../../../../constant/common.constant';
import CRMSelect from 'components/CRMSelect';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import commentIcon from '../../../../assets/images/chat-message.png';
import ConfirmationModal from '../../../../components/ConfirmationModal/index';
import Tooltip from '@mui/material/Tooltip';
import { CRMServiceAPI } from 'services/CRMService';

import styles from './EditLeads.module.scss';

interface LeadCreateProps {
  open: boolean;
  onHandleEditClose: () => void;
  control: any;
  onHandleEditLeadsSubmit: (data: any) => void;
  handleSubmit: any;
  row: any;
  setValue: any;
  reset: any;
}

const EditLeads = ({
  open,
  onHandleEditClose,
  control,
  onHandleEditLeadsSubmit,
  handleSubmit,
  row,
  setValue,
  reset,
}: LeadCreateProps) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState<string>('');
   const [commentsList, setCommentsList] = useState<
        { text: string; date: string }[]
      >([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
 const [openConfirmModal,setOpenConfirmModal]=useState(false)
 const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (row) {
      setValue('date', row.date ? dayjs(row.date) : null);
      setValue('customerName', row.customerName || '');
      setValue('customerNumber', row.phoneNumber || '');
      setValue('customerAlternateNumber', row.customerAlternateNumber || '');
      setValue('customerEmail', row.email || '');
      setValue('customerLocation', row.location || '');
      setValue('leadFollower', row.follower || '');
      setValue('nextDate', row.nextDate ? dayjs(row.nextDate) : null);
      setValue('leadSource', row.leadSource || '');
      setValue('leadStatus', row.leadStatus || '');
    } else {
      reset();
    }
  }, [row, setValue]);

  const onHandleCommentSubmit = () => {
    if (comments) {
      setCommentsList((prev) => {
        const newComment = {
          text: comments,
          date: dayjs().format('DD-MM-YYYY'),
        };
        const newList = [newComment, ...prev];

        return newList.sort(
          (a, b) =>
            dayjs(b.date, 'DD-MM-YYYY').valueOf() -
            dayjs(a.date, 'DD-MM-YYYY').valueOf()
        );
      });
      setComments('');
    }
    // try{
    //   const response=await CRMServiceAPI.leadComment()
    //   if(comments){
    //     setCommentsList([response])
    //   }
    //   else{
    //     setCommentsList([])
    //   }
    // }
    // catch(error){
    //   console.log("comments api",error)
    // }
  };

  const onHandleCommentsEdit = (index: number) => {
    setEditingIndex(index);
    setEditedComment(commentsList[index].text);
    // try{
    //   const response=await CRMServiceAPI.leadCommentEdit()
    //   if(comments){
    //     setEditedComment([response])
    //   }
    //   else{
    //     setEditedComment([])
    //   }
    // }
    // catch(error){
    //   console.log("comments api",error)
    // }
  };

  const onHandleDeleteClick = (index: number) => {
    setCommentToDelete(index);
    setOpenConfirmModal(true);
  };
  const confirmDelete = () => {
    if (commentToDelete !== null) {
      onHandleCommentsDelete(commentToDelete);
      setCommentToDelete(null);
    }
    setOpenConfirmModal(false);
  };


  const onHandleCommentsDelete = (index: number) => {
    setCommentsList((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedComment('');
      // try{
      //   const response=await CRMServiceAPI.leadCommentDelete()
      //   if(comments){
      //     setEditedComment([response])
      //   }
      //   else{
      //     setEditedComment([])
      //   }
      // }
      // catch(error){
      //   console.log("comments api",error)
      // }
    }
  };

  const onHandleCommentsSave = (index: number) => {
    setCommentsList((prev) => {
      const updatedList = prev.map((comment, i) =>
        i === index ? { ...comment, text: editedComment } : comment
      );

      return updatedList.sort(
        (a, b) =>
          dayjs(b.date, 'DD-MM-YYYY').valueOf() -
          dayjs(a.date, 'DD-MM-YYYY').valueOf()
      );
    });

    setEditingIndex(null);
    setEditedComment('');
  };

  const onHandleCommentsDiscard = () => {
    setEditingIndex(null);
    setEditedComment('');
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          onHandleEditClose();
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
              {t('editLeads')}
            </Typography>

            <IconButton>
              <GridCloseIcon
                onClick={onHandleEditClose}
                data-testid='close-button '
              />
            </IconButton>
          </Grid2>
          <div className={styles.borderLine} />
          <Grid2 container spacing={4}>
            <Grid2 size={7} sx={{ mt: '20px' }}>
              <Typography sx={{ mb: '20px' }}>{t('leadsComments')}</Typography>
              <Grid2 container spacing={3} direction={'row'}>
                <Grid2 size={6}>
                  <Controller
                    name='date'
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selectedDate={field.value ? dayjs(field.value) : null}
                        setSelectedDate={field.onChange}
                        placeholder={t('date')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />
                  <Controller
                    name='customerName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('customerName')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />
                  <Controller
                    name='customerNumber'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('customerNumber')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />
                  <Controller
                    name='customerAlternateNumber'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('customerAlternateNumber')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />

                  <Controller
                    name='customerEmail'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('customerEmail')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name='customerLocation'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('customerLocation')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />
                  <Controller
                    name='leadFollower'
                    control={control}
                    render={({ field }) => (
                      <CRMSelect
                        options={leadFollower}
                        value={field.value}
                        onChange={field.onChange}
                        sx={{ mb: '20px' }}
                        placeholder={t('leadFollower')}
                      />
                    )}
                  />

                  <Controller
                    name='nextDate'
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        selectedDate={field.value ? dayjs(field.value) : null}
                        setSelectedDate={field.onChange}
                        placeholder={t('nextDate')}
                        sx={{ mb: '20px' }}
                      />
                    )}
                  />

                  <Controller
                    name='leadSource'
                    control={control}
                    render={({ field }) => (
                      <CRMSelect
                        options={leadSource}
                        value={field.value || ''}
                        onChange={field.onChange}
                        sx={{ mb: '20px' }}
                        placeholder={t('leadSource')}
                      />
                    )}
                  />

                  <Controller
                    name='leadStatus'
                    control={control}
                    render={({ field }) => (
                      <CRMSelect
                        options={leadStatus}
                        value={field.value || ''}
                        onChange={field.onChange}
                        sx={{ mb: '20px' }}
                        placeholder={t('leadStatus')}
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant='contained'
                  sx={{ mt: '5px' }}
                  onClick={handleSubmit(onHandleEditLeadsSubmit)}
                >
                  {t('submit')}
                </Button>
              </Box>
            </Grid2>
            <Grid2
              size={5}
              sx={{
                mt: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pl: 4,
                borderLeft: '1px solid #ccc',
              }}
            >
              <Box>
                <Typography sx={{ mb: '10px' }}>
                  {t('leadsComments')}
                </Typography>
                <Box sx={{ maxHeight: '280px', overflowY: 'auto', pr: 1 }}>
                  {commentsList.length === 0 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 4,
                      }}
                    >
                      <img
                        src={commentIcon}
                        alt='No Comments'
                        style={{ width: 80, height: 80, opacity: 0.5 }}
                      />
                      <Typography sx={{ color: '#888', mt: 2 }}>
                        {t('noComments')}
                      </Typography>
                    </Box>
                  ) : (
                    commentsList.map((comment, index) => (
                      <Box key={index}>
                        <Typography>
                          {comment.date}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {editingIndex === index ? (
                            <TextField
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                              size='small'
                              sx={{ mr: 1 }}
                            />
                          ) : (
                            <Typography sx={{ color: '#444' }}>
                              {comment.text}
                            </Typography>
                          )}
                          <Box>
                            {editingIndex === index ? (
                              <>
                                <Tooltip title='Save'>
                                  <IconButton
                                    onClick={() => onHandleCommentsSave(index)}
                                  >
                                    <TurnedInIcon color='primary' />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title='Discard'>
                                  <IconButton
                                    onClick={() => onHandleCommentsDiscard()}
                                  >
                                    <KeyboardReturnIcon color='primary' />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete'>
                                  <IconButton
                                    onClick={() => onHandleDeleteClick(index)}
                                  >
                                    <DeleteIcon color='primary' />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                <Tooltip title='Edit'>
                                  <IconButton
                                    onClick={() => onHandleCommentsEdit(index)}
                                  >
                                    <EditIcon color='primary' />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete'>
                                  <IconButton
                                    onClick={() => onHandleDeleteClick(index)}
                                  >
                                    <DeleteIcon color='primary' />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </Box>
                        </Box>
                        <div className={styles.divider} />
                      </Box>
                    ))
                  )}
                </Box>
              </Box>

              {editingIndex === null && (
                <Box sx={{ mt: '10px' }}>
                  <TextField
                    placeholder={t('comments')}
                    value={comments}
                    onChange={(e: any) => setComments(e.target.value)}
                  ></TextField>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginTop: '20px',
                    }}
                  >
                    <Button variant='contained' onClick={onHandleCommentSubmit}>
                      {t('submit')}
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
      <ConfirmationModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onHandleContinue={confirmDelete}
        title={t('deleteComment')}
        titleDescription={t('deleteCommentConfirmation')}
      />
    </>
  );
};

export default EditLeads;

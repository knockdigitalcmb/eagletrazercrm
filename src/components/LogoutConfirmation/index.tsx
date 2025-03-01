import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

interface DraggableDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  actions?: React.ReactNode;
}

const LoginConfirmation: React.FC<DraggableDialogProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog-title'
    >
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default LoginConfirmation;

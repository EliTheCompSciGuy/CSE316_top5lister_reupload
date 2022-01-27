import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useContext } from 'react'
import AuthContext from '../auth';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal() {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
      auth.closeModal();
  }
  let openError = false;
  if (auth.error) {
    openError = true
  }

  return (
    <div>
      <Modal
        open={openError}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert severity="error" style={style}>
            <AlertTitle>Error</AlertTitle>
            Error alert — <strong>{auth.errorMessage}</strong>
            <Button variant="text" onClick={handleClose}>CLOSE</Button>
        </Alert>
      </Modal>
    </div>
  );
}
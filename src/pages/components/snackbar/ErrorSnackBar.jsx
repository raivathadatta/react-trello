import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

function ErrorSnackbar ({ open, message, handleClose })  {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message={message} 
    >
      
    </Snackbar>
  );
};

export default ErrorSnackbar;
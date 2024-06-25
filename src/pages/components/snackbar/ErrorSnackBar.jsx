import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

function ErrorSnackbar ({ open, message, handleClose })  {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >{message}
      {/* <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert> */}
    </Snackbar>
  );
};

export default ErrorSnackbar;
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const LoginModal = ({ open, onClose, onLoginSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const result = await onLoginSubmit(email, password);
    if (result.success) {
      setError('');
      // Close the login modal, reset the form, or perform any other required action upon successful login
    } else {
      setError(result.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="login-dialog-title">
      <DialogTitle id="login-dialog-title">Login</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!email || !password}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

import React from 'react';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

const buttonStyles = {
  backgroundColor: '#28A745',
  borderRadius: '50%',
  height: 50,
  width: 50,
  color: '#FFFFFF'
};

export default function AddTransactionButton({ onPress }) {
  return (
    <>
      <IconButton onClick={onPress} sx={buttonStyles}>
        <Add fontSize="large" />
      </IconButton>
    </>
  );
}
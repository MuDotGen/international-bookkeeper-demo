import React from 'react';
import { Grid, Paper } from '@mui/material';
import AddTransactionButton from './transactions/AddTransactionButton';

const containerStyles = {
  backgroundColor: '#FFFFFF',
  height: '8vh',
  borderTop: '1px solid grey.300',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default function Footer({ onPressAddTransactionButton }) {
  return (
    <Grid item sx={{ width: '100%' }}>
      <Paper sx={containerStyles} elevation={0}>
        <AddTransactionButton onPress={onPressAddTransactionButton} />
      </Paper>
    </Grid>
  );
}
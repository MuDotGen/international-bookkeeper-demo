import React, { useState } from 'react';
import { getmmmddDate } from '../../js/Display';
import { ButtonBase, Grid, Typography } from '@mui/material';
import EditTransactionModal from '../popups/transactionModal/EditTransactionModal';

const styles = {
  transactionButton: (color) => ({
    backgroundColor: '#FFFFFF',
    padding: '10px 1%',
    margin: '5px 0',
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    border: `2px solid ${color}`,
  }),
  transactionDate: {
    paddingLeft: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingRight: '10px',
    borderRight: '1px solid #CCCCCC',
  },
  transactionDesc: {
    fontSize: '14px',
    fontWeight: 'bold',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRight: '1px solid #CCCCCC',
    textAlign: 'left',
  },
  transactionAmount: (color, settings, baseCurrency) => ({
    paddingLeft: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    fontStyle: baseCurrency === settings.currency ? 'normal' : 'italic',
    // textDecoration: baseCurrency === settings.currency ? 'none' : 'underline',
    transform: baseCurrency === settings.currency ? 'none' : 'skewX(-6deg)', // Add this line
    textAlign: 'left',
    color: color,
  }),
};

export default function TransactionButton({ settings, book, transaction, updateEndDate }) {
  const transactionDate = getmmmddDate(new Date(transaction.timestamp.seconds * 1000));
  const transactionDesc = transaction.description;
  const transactionAmount = transaction.amount[settings.currency].toLocaleString('en-US', {
    style: 'currency',
    currency: settings.currency,
  });
  const [transactionModalIsVisible, setTransactionModalIsVisible] = useState(false);

  const handleTransactionPress = () => {
    // Handle the click on the transaction button
    setTransactionModalIsVisible(true)
  };

  const onTransactionClose = () => {
    setTransactionModalIsVisible(false)
  }

  const buttonBorderColor = transaction.type === 'Personal' ? settings.personalColor : settings.businessColor;
  const amountColor = transaction.isIncome ? settings.incomeColor : settings.expenseColor;

  return (
    <>
      <ButtonBase
        sx={styles.transactionButton(buttonBorderColor)}
        onClick={handleTransactionPress}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={2}>
            <Typography sx={styles.transactionDate}>{transactionDate}</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={styles.transactionDesc} noWrap>
              {transactionDesc}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={styles.transactionAmount(amountColor, settings, transaction.amount.baseCurrency)}>
              {transactionAmount}
            </Typography>
          </Grid>
        </Grid>
      </ButtonBase>
      <EditTransactionModal
        open={transactionModalIsVisible}
        onClose={onTransactionClose}
        updateEndDate={updateEndDate}
        existingTransaction={transaction}
        settings={settings}
        book={book} />
    </>
  );
}
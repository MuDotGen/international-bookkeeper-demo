import React, { useState, useEffect } from 'react';
import { Grid, List } from '@mui/material';
import TransactionButton from './TransactionButton';

// Services
import { onTransactionsChange } from '../../js/services/TransactionService';

const styles = {
  container: {
    backgroundColor: '#BBBBBB',
    overflow: 'auto',
    width: '100%',
    height: '84vh'
  },
  list: {
    width: '100%'
  },
};

export default function TransactionsList({ settings, book, dateRange, updateEndDate, businessOnly = false }) {
  const [bookTransactions, setBookTransactions] = useState([]);

  useEffect(() => {
    if (book === null) {
      return;
    }

    const handleTransactionsChange = (transactions) => {
      setBookTransactions(transactions);
    };

    const unsubscribeOnTransactionsChange = onTransactionsChange(book.id, handleTransactionsChange, dateRange.startDate, dateRange.endDate, businessOnly);

    return () => {
      unsubscribeOnTransactionsChange();
    };
  }, [book, dateRange, businessOnly]);


  useEffect(() => {
    if (bookTransactions.length === 0) {
      return;
    }

    // console.log("Transactions");
    // console.log(bookTransactions);
  }, [bookTransactions]);

  return (
    <Grid item container sx={styles.container} alignItems="stretch" justifyContent="center" >
      <Grid item sx={{ width: "98%" }}>
        <List sx={styles.list}>
          {bookTransactions.map((transaction, index) => (
            <TransactionButton settings={settings} book={book} transaction={transaction} updateEndDate={updateEndDate} key={transaction.id + index} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
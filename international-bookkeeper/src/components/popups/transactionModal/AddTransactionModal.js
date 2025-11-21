import React from 'react';
import TransactionModal from './TransactionModal';
import { Timestamp, auth } from '../../../js/FirebaseConfig';
import { addTransaction } from '../../../js/services/TransactionService';

const AddTransactionModal = ({
  open,
  onClose,
  updateEndDate,
  settings,
  book,
}) => {
  const defaultTransaction = {
    id: null,
    amount: {
      JPY: 100,
      USD: 1,
      baseUsdJpy: 100,
      baseCurrency: settings.currency,
    },
    category: settings.defaultVals.category,
    description: "",
    isIncome: false,
    location: settings.defaultVals.location,
    timestamp: Timestamp.fromDate(new Date()),
    type: settings.defaultVals.type,
    user: auth.currentUser.uid,
  }

  // console.log(defaultTransaction)

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onTransactionSave = async (updatedTransaction) => {
    console.log(updatedTransaction)
    await addTransaction(book.id, updatedTransaction)
    updateEndDate(new Date())
    onClose()
  }

  return (
    <TransactionModal
      open={open}
      onClose={onClose}
      onTransactionSave={onTransactionSave}
      currentTransaction={defaultTransaction}
      book={book}
      isAdd={true} />
  );
};

export default AddTransactionModal
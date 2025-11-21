import React from 'react';
import TransactionModal from './TransactionModal';
import { updateTransaction } from '../../../js/services/TransactionService';

const EditTransactionModal = ({
  open,
  onClose,
  updateEndDate,
  existingTransaction,
  settings,
  book,
}) => {

  const onTransactionSave = async (updatedTransaction) => {
    console.log(updatedTransaction)
    await updateTransaction(book.id, existingTransaction.id, updatedTransaction);
    updateEndDate(new Date());
    onClose();
  }

  return (
    <TransactionModal
      open={open}
      onClose={onClose}
      onTransactionSave={onTransactionSave}
      currentTransaction={existingTransaction}
      book={book} />
  );
};

export default EditTransactionModal;

import { collection, db, doc, addDoc, updateDoc, onSnapshot, query, Timestamp, where, orderBy } from '../FirebaseConfig';

const DAYS_BACK = 30;

export const onTransactionsChange = (bookID, callback, startDate = new Date(Date.now() - DAYS_BACK * 24 * 60 * 60 * 1000), endDate = new Date(), businessOnly) => {
  const startTimestamp = Timestamp.fromDate(startDate);
  const endTimestamp = Timestamp.fromDate(endDate);

  // Query to get all transactions in the date range in descending order.
  let q = query(
    collection(db, 'books', bookID, 'transactions'),
    where('timestamp', '>=', startTimestamp),
    where('timestamp', '<=', endTimestamp),
    orderBy('timestamp', 'desc'),
  );
  
  if (businessOnly) {
    q = query(
      collection(db, 'books', bookID, 'transactions'),
      where('timestamp', '>=', startTimestamp),
      where('timestamp', '<=', endTimestamp),
      where('type', '==', 'j3tWKAUBMvjMuGgXBvLT'), // Business
      orderBy('timestamp', 'desc'),
    );
  }

  const unsubscribe = onSnapshot(q, (transactionsSnapshot) => {
    const transactions = transactionsSnapshot.docs.map(transaction => {
      return { ...transaction.data(), id: transaction.id }
    })

    callback(transactions);
  }, (error) => {
    console.log("Error getting documents: ", error)
  });

  return unsubscribe;
  // return () => {}
};

export const addTransaction = async (bookID, transaction) => {
  try {
    const newTransaction = {
      ...transaction,
      timestamp: Timestamp.fromDate(transaction.timestamp),
    }
    console.log(newTransaction)
    const transactionsRef = collection(db, 'books', bookID, 'transactions');
    const newTransactionRef = await addDoc(transactionsRef, newTransaction);

    console.log('New transaction added with ID: ', newTransactionRef.id);
  } catch (error) {
    console.error('Error adding new transaction: ', error);
  }
};

export const updateTransaction = async (bookID, transactionID, transaction) => {
  try {
    const updatedTransaction = {
      ...transaction,
      timestamp: Timestamp.fromDate(transaction.timestamp),
    }
    console.log(updatedTransaction)
    const transactionRef = doc(db, 'books', bookID, 'transactions', transactionID);
    await updateDoc(transactionRef, updatedTransaction);

    console.log('Transaction updated with ID: ', transactionID);
  } catch (error) {
    console.error('Error updating transaction: ', error);
  }
};
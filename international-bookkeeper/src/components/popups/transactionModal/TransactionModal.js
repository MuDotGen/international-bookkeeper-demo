import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { getExchangeRate } from '../../../js/services/ExchangeRateService';

/*
Whenever the exchange rate is changed, the currency opposite of the current
base currency must be recalculated.

Conditions that would require to get a new exchange rate
- Changing the date

Conditions that would require to recalculate one of the amounts
- Getting a new exchange rate
- Changing the value of one of amounts 
*/

const TransactionModal = ({
  open,
  onClose,
  onTransactionSave,
  currentTransaction,
  book,
  isAdd = false,
}) => {
  const defaultTransaction = {
    amount: {
      ...currentTransaction.amount,
    },
    timestamp: currentTransaction.timestamp.toDate(),
    description: currentTransaction.description,
    isIncome: currentTransaction.isIncome,
    type: currentTransaction.type,
    category: currentTransaction.category,
    location: currentTransaction.location,
    user: currentTransaction.user,
  }

  const [transactionContainer, setTransactionContainer] = useState(defaultTransaction)
  const [canSave, setCanSave] = useState(false)

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const calculateOtherCurrencyAmount = (amount, currency, baseUsdJpy) => {
    // Calculates the amount in the other currency based on the input currency
    if (currency === 'USD') {
      const jpyAmount = Math.floor(amount * baseUsdJpy);
      return jpyAmount;
    } else if (currency === 'JPY') {
      const usdAmount = Math.floor((amount / baseUsdJpy) * 100) / 100;
      return usdAmount;
    } else {
      return 0;
    }
  }

  const updateOtherCurrencyAmount = () => {
    const otherCurrencyAmount = calculateOtherCurrencyAmount(transactionContainer.amount[transactionContainer.amount.baseCurrency], transactionContainer.amount.baseCurrency, transactionContainer.amount.baseUsdJpy)
    setTransactionContainer(cur => ({ ...cur, amount: { ...cur.amount, [cur.amount.baseCurrency === 'USD' ? 'JPY' : 'USD']: otherCurrencyAmount } }));
  }

  const updateAmount = (e) => {
    console.log("Updating Amount");
    const updatedAmount = Number(e.target.value) || 0;
    console.log(`Updating Amount: ${updatedAmount}`)
    const otherCurrencyAmount = calculateOtherCurrencyAmount(updatedAmount, transactionContainer.amount.baseCurrency, transactionContainer.amount.baseUsdJpy)
    setTransactionContainer(cur => ({ ...cur, amount: { ...cur.amount, [cur.amount.baseCurrency]: updatedAmount, [cur.amount.baseCurrency === 'USD' ? 'JPY' : 'USD']: otherCurrencyAmount } }));
  }

  const onAmountFocus = () => {
    setCanSave(false)
  }

  const onAmountBlur = (e) => {
    updateAmount(e)
  }

  const getAndSetExchangeRate = async (timestamp) => {
    const currentExchangeRate = await getExchangeRate(timestamp)
    console.log("currentExchangeRate")
    console.log(currentExchangeRate.rates.JPY)
    setTransactionContainer(cur => ({ ...cur, amount: { ...cur.amount, baseUsdJpy: currentExchangeRate.rates.JPY } }));
  }

  // const updateOtherCurrencyAmountRef = useRef(updateOtherCurrencyAmount);


  // If the modal is opened, and it's to add a new transaction, set the date immediately to trigger getting the exchange rate
  useEffect(() => {
    if (open && isAdd) {
      const newDate = new Date()
      setTransactionContainer(cur => ({ ...cur, timestamp: newDate }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isAdd])

  // If the date has been changed, get the exchange rate for the given date
  useEffect(() => {
    if (!open) {
      return
    }

    getAndSetExchangeRate(transactionContainer.timestamp)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionContainer.timestamp])

  // If the exchange rate has been updated, regardless of it's the same as before or not
  useEffect(() => {
    if (!open) {
      return
    }

    updateOtherCurrencyAmount()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionContainer.amount.baseUsdJpy])

  // Just in case there are any looming changes that need to be made to the transactionContainer before saving
  // Set canSave to false, and then when the document is ready to be saved, set canSave to true
  useEffect(() => {
    if (!open) {
      return
    }

    // console.log("transactionContainer")
    // console.log(transactionContainer)

    setCanSave(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionContainer])

  const handleSave = async () => {
    setCanSave(false)
    setTimeout(() => {
      onTransactionSave(transactionContainer)
    }, 1000)
  };

  if (!currentTransaction) {
    console.log('no current transaction')
    return <></>
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="transaction-dialog-title"
      PaperProps={{
        sx: { minWidth: isMobile ? '90vw' : '50vw', maxHeight: '80vh', overflowY: 'auto' },
      }}>

      <DialogTitle id="transaction-dialog-title">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            Transaction
          </Grid>
          <Grid item>
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} direction="column">
          <DatePicker
            label="Date"
            sx={{ marginTop: '20px' }}
            value={transactionContainer.timestamp}
            onChange={(newValue) => {
              setTransactionContainer({ ...transactionContainer, timestamp: newValue });
            }}
            textField={<TextField />}
          />
          <TextField
            label="Description"
            value={transactionContainer.description}
            placeholder="i.e. Amazon - Shoes, etc."
            onChange={(e) => setTransactionContainer({ ...transactionContainer, description: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={transactionContainer.isIncome}
                onChange={(e) => setTransactionContainer({ ...transactionContainer, isIncome: e.target.checked })}
                color="primary"
                value={transactionContainer.isIncome}
              />
            }
            label={transactionContainer.isIncome ? 'Income' : 'Expense'}
          />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={transactionContainer.type}
              onChange={(e) => setTransactionContainer({ ...transactionContainer, type: e.target.value })}
              label="Type"
            >
              {book.types.map((type, index) => (
                <MenuItem value={type.id} key={`${type.id}-${index}`}>{type.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={transactionContainer.category}
              onChange={(e) => setTransactionContainer({ ...transactionContainer, category: e.target.value })}
              label="Category"
            >
              {book.categories.map((category, index) => (
                <MenuItem value={category.id} key={`${category.id}-${index}`}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={transactionContainer.location}
              onChange={(e) => setTransactionContainer({ ...transactionContainer, location: e.target.value })}
              label="Location"
            >
              {book.locations.map((location, index) => (
                <MenuItem value={location.id} key={`${location.id}-${index}`}>{location.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {transactionContainer.amount.baseCurrency === 'USD' &&
            <TextField
              label="Amount USD"
              defaultValue={transactionContainer.amount.USD}
              onFocus={onAmountFocus}
              onBlur={onAmountBlur}
            />
          }
          {transactionContainer.amount.baseCurrency === 'JPY' &&
            <TextField
              label="Amount JPY"
              defaultValue={transactionContainer.amount.JPY}
              onFocus={onAmountFocus}
              onBlur={onAmountBlur}
            />
          }
          <FormControl fullWidth>
            <InputLabel>Base Currency</InputLabel>
            <Select
              value={transactionContainer.amount.baseCurrency}
              onChange={(e) => {
                setTransactionContainer({
                  ...transactionContainer,
                  amount: {
                    ...transactionContainer.amount,
                    baseCurrency: e.target.value,
                  },
                });
              }}
              label="Base Currency"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="JPY to 1 USD Exchange Rate"
            value={transactionContainer.amount.baseUsdJpy}
            disabled={true}
          />
        </Stack>
      </DialogContent>
      <Grid sx={{ marginBottom: '20px' }} container justifyContent="center" alignContent="center">
        <Grid item>
          <Button
            disabled={!canSave}
            onClick={handleSave}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default TransactionModal
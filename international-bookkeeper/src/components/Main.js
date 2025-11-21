import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

// Services
import { onSettingsChange, saveSettings } from '../js/services/UserService';

// Components
import NavigationBar from '../components/NavigationBar';
import TransactionsList from './transactions/TransactionsList';
import AddTransactionModal from './popups/transactionModal/AddTransactionModal';
import Footer from './Footer';
import SettingsModal from './popups/SettingsModal';

const styles = {
  container: {
    height: '100vh'
  },
};

const startDateNumDaysBeforeNow = 6
const startDateNumDaysBeforeNowBusiness = 365

const Main = ({ user, userBooks }) => {
  const getDateRange = (startDateNumDaysBeforeNow) => {
    return {
      startDate: new Date(Date.now() - startDateNumDaysBeforeNow * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    }
  }

  const [book, setBook] = useState(null);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [transactionModalIsVisible, setTransactionModalIsVisible] = useState(false);
  const [dateRange, setDateRange] = useState(getDateRange(startDateNumDaysBeforeNow));
  const [businessOnly, setBusinessOnly] = useState(false);

  const defaultSettings = {
    userName: '[Name]',
    incomeColor: '#000000',
    expenseColor: '#000000',
    personalColor: '#000000',
    typeColor: {

    },
    businessColor: '#000000',
    currency: 'USD',
  }

  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    const getAPIData = async () => {
      // const exchangeRateData = await getExchangeRate()
      // setExchangeRate(exchangeRateData.rates)
    }

    getAPIData()

  }, [])

  useEffect(() => {
    // TO-DO: Handle book change, for now default to first book.
    if (userBooks.length > 0) {
      setBook(userBooks[0])
    }
  }, [userBooks])

  useEffect(() => {
    if (!user) {
      return
    }

    const handleSettingsChange = (newSettings) => {
      // Do something with the updated settings, e.g., update the state
      setSettings(newSettings);
      // console.log("Settings changed")
      // console.log(newSettings)
    };

    // Subscribe to settings changes
    const unsubscribeOnSettingsChange = onSettingsChange(handleSettingsChange);

    return () => {
      unsubscribeOnSettingsChange()
    }
  }, [user])

  useEffect(() => {
    setDateRange(getDateRange(businessOnly ? startDateNumDaysBeforeNowBusiness : startDateNumDaysBeforeNow))
  }, [businessOnly])

  const onSettingsPress = () => {
    setSettingsModalVisible(true)
  }

  const onSettingsSave = async (settings) => {
    const result = await saveSettings(settings);
    if (result.success) {
      // Settings saved successfully
      setSettingsModalVisible(false)
    } else {
      // Error saving settings
      console.error(result.message);
    }
  }

  const onAddTransactionPress = () => {
    setTransactionModalIsVisible(true)
  }

  const onSettingsClose = () => {
    setSettingsModalVisible(false)
  }

  const onTransactionClose = () => {
    setTransactionModalIsVisible(false)
  }

  const toggleBusinessTransactions = (e) => {
    setBusinessOnly(cur => !cur)
  }

  // Call this function when the user updates the endDate
  const updateEndDate = (newEndDate) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      endDate: newEndDate,
    }));
  };

  if (book === null) {
    return <></>
  }

  return (
    <>
      <Grid sx={styles.container} container direction="column" justifyContent="space-between" alignItems="stretch">
        <NavigationBar settings={settings} bookName={book.name} onSettingsPress={onSettingsPress} businessOnly={businessOnly} showBusinessTransactions={toggleBusinessTransactions} />
        <TransactionsList settings={settings} book={book} dateRange={dateRange} updateEndDate={updateEndDate} businessOnly={businessOnly} />
        <Footer onPressAddTransactionButton={onAddTransactionPress} sx={{ margin: '4%' }} />
      </Grid>
      <SettingsModal open={settingsModalVisible} onClose={onSettingsClose} onSettingsSave={onSettingsSave} settings={settings} book={book} />
      <AddTransactionModal open={transactionModalIsVisible} onClose={onTransactionClose} updateEndDate={updateEndDate} settings={settings} book={book} />
    </>
  );
};

export default Main;
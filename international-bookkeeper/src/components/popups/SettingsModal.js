import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
  IconButton,
  Box,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { mapListToKey } from '../../js/Display';

const SettingsModal = ({ open, onClose, onSettingsSave, settings, book }) => {
  const [incomeColor, setIncomeColor] = useState(settings.incomeColor);
  const [expenseColor, setExpenseColor] = useState(settings.expenseColor);
  const [typeColor, setTypeColor] = useState(settings.typeColor);
  const [personalColor, setPersonalColor] = useState(settings.personalColor);
  const [businessColor, setBusinessColor] = useState(settings.businessColor);
  const [showUSD, setShowUSD] = useState(settings.currency === 'USD' ? true : false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSave = () => {
    onSettingsSave({
      incomeColor,
      expenseColor,
      personalColor,
      businessColor,
      typeColor,
      currency: showUSD ? 'USD' : 'JPY',
    });
  };

  const typeNameList = mapListToKey(book.types, 'name')

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="settings-dialog-title"
      PaperProps={{
        sx: { minWidth: isMobile ? '90vw' : '50vw', overflowY: 'visible' },
      }}>

      <DialogTitle id="settings-dialog-title">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            Settings
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
          {/* Income/Expense section */}
          <Typography variant="h6">Income/Expense</Typography>
          <TextField
            label="Income color"
            type="color"
            value={incomeColor}
            onChange={(e) => setIncomeColor(e.target.value)}
          />
          <TextField
            label="Expense color"
            type="color"
            value={expenseColor}
            onChange={(e) => setExpenseColor(e.target.value)}
          />

          {/* Transaction type section */}
          <Typography variant="h6">Transaction Type</Typography>
          {
            Object.entries(typeNameList).map(([id, name]) => {
              const color = typeColor[id] || "#000000";

              const handleChangeColor = (e) => {
                setTypeColor({
                  ...typeColor,
                  [id]: e.target.value,
                });
              };

              return (
                <TextField
                  key={id}
                  label={`${name} color`}
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                />
              );
            })
          }
          <TextField
            label="Personal color"
            type="color"
            value={personalColor}
            onChange={(e) => setPersonalColor(e.target.value)}
          />
          <TextField
            label="Business color"
            type="color"
            value={businessColor}
            onChange={(e) => setBusinessColor(e.target.value)}
          />

          {/* Currency section */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Typography>JPY</Typography>
            <FormControlLabel
              control={<Switch
                checked={showUSD}
                onChange={(e) => setShowUSD(e.target.checked)}
                color="primary"
                value={showUSD}
              />}
              label=""
              sx={{ margin: theme.spacing(0, 1) }}
            />
            <Typography>USD</Typography>
          </Box>

          {/* Extra space at the bottom */}
          <Box mb={2} />
        </Stack>
      </DialogContent>
      <Grid sx={{ marginBottom: '20px' }} container justifyContent="center" alignContent="center">
        <Grid item>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default SettingsModal;
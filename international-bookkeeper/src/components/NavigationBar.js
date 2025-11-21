import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '8vh',
    width: '100%',
    paddingX: 2,
    borderBottom: '1px solid #DDDDDD',
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#444444',
    borderRadius: '10px',
    padding: '5px 10px',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
};

export default function NavigationBar({ settings, bookName, onSettingsPress, businessOnly, showBusinessTransactions }) {
  return (
    <Grid sx={styles.container}>
      <Typography sx={styles.bookName} variant="h6" noWrap onClick={showBusinessTransactions}>
        {settings.userName + ' - ' + bookName + (businessOnly ? ' (Business)' : '')}
      </Typography>
      <IconButton onClick={onSettingsPress} sx={styles.settingsButton}>
        <Typography sx={styles.settingsButtonText} variant="body2">
          Settings
        </Typography>
      </IconButton>
    </Grid>
  );
};


// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function NavigationBar({ bookName, onSettingsPress }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.bookName} numberOfLines={1} ellipsizeMode="tail">{bookName}</Text>
//       <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Settings</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     height: 60,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDDDDD',
//   },
//   bookName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   settingsButton: {
//     backgroundColor: '#444444',
//     borderRadius: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//   },
//   settingsButtonText: {
//     fontSize: 16,
//     borderRadius: 10,
//     alignItems: 'center', // Add this line
//     color: '#FFFFFF',
//   },
// });
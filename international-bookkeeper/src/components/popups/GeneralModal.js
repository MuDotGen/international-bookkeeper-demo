import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 1,
    backgroundColor: '#CCCCCC',
    borderRadius: '50%',
  },
  title: {
    marginBottom: 16,
  },
};

export default function GeneralModal({ isVisible, setIsVisible, children }) {
  return (
    <Dialog
      open={isVisible}
      onClose={() => setIsVisible(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 10,
          padding: 20,
          maxHeight: '80%',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="h2" sx={styles.title}>
          Modal Title
        </Typography>
        <IconButton
          sx={styles.closeButton}
          onClick={() => setIsVisible(false)}
          edge="end"
          color="inherit"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// import React, { useState, useEffect } from 'react';
// import { Modal, Fade, Paper, IconButton, Typography } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const styles = {
//   backgroundOverlay: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     maxWidth: 400,
//     maxHeight: '80%',
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     padding: 1,
//     backgroundColor: '#CCCCCC',
//     borderRadius: '50%',
//   },
//   title: {
//     marginBottom: 16,
//   },
// };

// export default function GeneralModal({ isVisible, setIsVisible, children }) {
//   const [fadeAnim, setFadeAnim] = useState(0);

//   useEffect(() => {
//     setFadeAnim(isVisible ? 1 : 0);
//   }, [isVisible]);

//   return (
//     <Modal
//       open={isVisible}
//       onClose={() => setIsVisible(false)}
//       closeAfterTransition
//       // BackdropComponentProps={{
//       //   timeout: 500,
//       // }}
//     >
//       <Fade in={isVisible}>
//         <div style={styles.backgroundOverlay}>
//           <Paper sx={{ ...styles.container, opacity: fadeAnim }}>
//             <IconButton sx={styles.closeButton} onClick={() => setIsVisible(false)}>
//               <CloseIcon />
//             </IconButton>
//             <Typography variant="h5" component="h2" sx={styles.title}>
//               Modal Title
//             </Typography>
//             {children}
//           </Paper>
//         </div>
//       </Fade>
//     </Modal>
//   );
// }
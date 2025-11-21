import { auth, db, doc, setDoc, onSnapshot } from "../FirebaseConfig";

export const saveSettings = async (newSettings) => {
  try {
    const userId = auth.currentUser.uid;

    // Get a reference to the user's document
    const userDocRef = doc(db, "users", userId);

    // Save the settings
    await setDoc(userDocRef, { settings: newSettings }, { merge: true });

    // Saving successful
    return { success: true };
  } catch (error) {
    // Saving unsuccessful
    return { success: false, message: error.message };
  }
};

export const onSettingsChange = (callback) => {
  const userId = auth.currentUser.uid;

  // Get a reference to the user's document
  const userDocRef = doc(db, "users", userId);

  // Listen for changes in the settings
  const unsubscribe = onSnapshot(
    userDocRef,
    (userDocSnapshot) => {
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const settings = userData.settings;
        callback(settings);
      } else {
        console.log("User document not found");
      }
    },
    (error) => {
      console.log("Error getting settings: ", error);
    }
  );

  return unsubscribe;
};
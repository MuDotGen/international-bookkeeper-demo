import { auth, signInWithEmailAndPassword } from "../FirebaseConfig";

export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Login successful
    return { success: true };
  } catch (error) {
    // Login unsuccessful
    return { success: false, message: error.message };
  }
};
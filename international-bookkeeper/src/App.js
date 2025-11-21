import { useState, useEffect } from "react";

import Main from "./components/Main";

// Backend and services
import { auth } from './js/FirebaseConfig';
import { loginUser } from './js/services/LoginService';
import LoginModal from "./components/popups/LoginModal";
import { onBooksChange } from "./js/services/BookService";

export default function App() {
  const [user, setUser] = useState();
  const [userBooks, setUserBooks] = useState([]);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  // Handle changing data according to logged in status
  useEffect(() => {
    const handleBooksChange = (books) => {
      setUserBooks(books)
    }

    let unsubscribeOnBooksChangeFunctions;
    const unsubscribeAuthStateChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in")
        unsubscribeOnBooksChangeFunctions = onBooksChange(user, handleBooksChange)
        setUser(user)
        setLoginModalVisible(false)
      } else {
        console.log("logged out")
        setUser()
        setLoginModalVisible(true)
      }
    });

    // unsubscribe when component unmounts
    return () => {
      unsubscribeAuthStateChanged();
      if (unsubscribeOnBooksChangeFunctions) {
        unsubscribeOnBooksChangeFunctions()
      }
    };
  }, []);

  const onLoginSubmit = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      // Handle successful login
      setLoginModalVisible(false)
      return result;
    } else {
      return result;
    }
  };

  return (
    <>
      <Main user={user} userBooks={userBooks} />
      <LoginModal open={loginModalVisible} onLoginSubmit={onLoginSubmit} />
    </>
  );
}
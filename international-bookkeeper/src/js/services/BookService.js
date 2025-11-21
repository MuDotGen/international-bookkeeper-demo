import { db, onSnapshot, collection, query, where, doc } from "../FirebaseConfig";

const getBookWithMetadata = (book, bookId, booksData, updateCallback) => {
  const bookCategoriesRef = collection(db, "books", bookId, "categories");
  const bookTypesRef = collection(db, "books", bookId, "types");
  const bookLocationsRef = collection(db, "books", bookId, "locations");

  const unsubscribeCategories = onSnapshot(bookCategoriesRef, (categoriesSnapshot) => {
    const categories = categoriesSnapshot.docs.map((category) => {
      return { id: category.id, name: category.data().name };
    });

    const unsubscribeTypes = onSnapshot(bookTypesRef, (typesSnapshot) => {
      const types = typesSnapshot.docs.map((type) => {
        return { id: type.id, name: type.data().name };
      });

      const unsubscribeLocations = onSnapshot(bookLocationsRef, (locationsSnapshot) => {
        const locations = locationsSnapshot.docs.map((location) => {
          return { id: location.id, name: location.data().name };
        });

        const bookWithMetadata = {
          id: bookId,
          name: book.data().name,
          authorizedUsers: book.data().authorizedUsers,
          categories: categories,
          types: types,
          locations: locations
        };

        booksData[bookId] = bookWithMetadata;
        updateCallback(Object.values(booksData));
      });

      return unsubscribeLocations;
    });

    return { unsubscribeCategories, unsubscribeTypes };
  });

  return unsubscribeCategories;
};

export const onBooksChange = (user, callback) => {
  const userUid = user.uid;
  const userRef = doc(db, "users", userUid);

  const q = query(collection(db, "books"), where("authorizedUsers", "array-contains", userRef));

  const unsubscribeFunctions = {};
  const booksData = {};

  const unsubscribe = onSnapshot(q, (booksSnapshot) => {
    booksSnapshot.docs.forEach((book) => {
      const bookId = book.id;

      if (!unsubscribeFunctions[bookId]) {
        unsubscribeFunctions[bookId] = getBookWithMetadata(book, bookId, booksData, callback);
      }
    });
  }, (error) => {
    console.log("Error getting documents: ", error);
  });

  // Function to unsubscribe all listeners
  const unsubscribeAll = () => {
    Object.values(unsubscribeFunctions).forEach((bookUnsubscribes) => {
      if (bookUnsubscribes.unsubscribeCategories) {
        bookUnsubscribes.unsubscribeCategories();
      }
      if (bookUnsubscribes.unsubscribeTypes) {
        bookUnsubscribes.unsubscribeTypes();
      }
      if (bookUnsubscribes.unsubscribeLocations) {
        bookUnsubscribes.unsubscribeLocations();
      }
    });
    unsubscribe();
  };

  return unsubscribeAll;
};
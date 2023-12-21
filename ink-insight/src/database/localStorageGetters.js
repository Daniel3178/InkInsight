export const getLocalBookSelection = () => {
  const currentBookDetails = {
    bookId: "",
    title: "",
    author: "",
    genre: "",
    picture: "",
    summary: "",
    pages: 0,
    categories: "",
    isbn: "",
  }
  try {
    const storedDetails = localStorage.getItem("bookDetails1");
    return storedDetails ? JSON.parse(storedDetails) : currentBookDetails;
  } catch (error) {
    console.error("Search again please", error);
    return null;
  }
};

export const getLocalSearchParam = () => {
  try {
    const storedSearchParam = localStorage.getItem("searchValue");
    return storedSearchParam ? storedSearchParam : "";
  } catch (error) {
    console.error("Search again please", error);
    return "";
  }
};

export const getLocalBookSelectionBookDetails = () => {
  const currentBookDetails = {
    bookId: "",
    title: "",
    author: "",
    genre: "",
    picture: "",
    summary: "",
    pages: 0,
    categories: "",
    isbn: "",
  }
  try {
    const storedDetails = localStorage.getItem("bookDetails");
    return storedDetails ? JSON.parse(storedDetails) : currentBookDetails;
  } catch (error) {
    console.error("Search again please", error);
    return null;
  }
};

export const getLocalApiResults = () => {
  try {
    const storedBooks = localStorage.getItem("newApiBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  } catch (error) {
    console.error("Please search agian", error);
    return [];
  }
};

export const getLocalRatingArray = () => {
  try {
    const ArrayOfRating = localStorage.getItem("newApiRatingArray");
    return ArrayOfRating ? JSON.parse(ArrayOfRating) : [];
  } catch (error) {
    console.error("Please search agian", error);
    return [];
  }
};

export const getLocalListSelection = () => {
  try {
    const storedList = localStorage.getItem("currentList");
    return storedList ? JSON.parse(storedList) : null;
  } catch (error) {
    console.error("Search again please", error);
    return null;
  }
};
export const BASE_URL = "https://openlibrary.org/";
export const HEADER = {
  headers: {
    Accept: "application/json",
  },
};

export const getWorkDetailsUrl = (workId) => `${BASE_URL}works/${workId}.json`;
export const getAuthorDetailsUrl = (authorId) =>
  `${BASE_URL}authors/${authorId}.json`;

/**
 * Generates the URL for a book cover image.
 * @param {number|string} coverId - The cover ID (e.g., from 'cover_i') or ISBN.
 * @param {string} size - 'S', 'M', or 'L' (Small, Medium, Large).
 * @returns {string} The full URL to the image.
 */
export const getCoverUrl = (coverId, size = "M") => {
  if (!coverId) return null; // Return default placeholder URL here if needed
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

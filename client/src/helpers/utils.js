/* eslint-disable import/prefer-default-export */

// Import the local image using the path you confirmed
import imgNoCover from '../images/no_cover.png';

export const getCoverImage = (src) => {
  // If there is no image source in the database, return the local placeholder
  if (!src) return imgNoCover;

  // Ensure the path always starts with exactly one slash
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;

  // Use 'w500', which is the standard supported size by TMDb API
  return `https://image.tmdb.org/t/p/w500${cleanSrc}`;
};
/* eslint-enable import/prefer-default-export */

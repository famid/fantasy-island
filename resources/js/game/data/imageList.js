/**
 * List of image files names available as puzzle image
 * @type {string[]}
 */
export const imageList = [
    'img2.jpg',
    'spider.jpg',
    'mario.jpg',
    'avengers.jpg'

];

/**
 * Selects a random puzzle image filename
 * @param {string[]} [exclude] optional list of files to exclude from the list of available images
 * @returns {string} filename of a image file
 */
export const pickRandomImage = (exclude = []) => {
    const subList = imageList.filter(img => !exclude.includes(img));
    return subList[Math.floor(Math.random() * subList.length)];
}
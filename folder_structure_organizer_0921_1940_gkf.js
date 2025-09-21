// 代码生成时间: 2025-09-21 19:40:43
 * This script organizes a given directory into a specified structure.
 * @module FolderStructureOrganizer
 */

const fs = require('fs');
const path = require('path');

/**
 * Organize the folder structure.
 * @param {string} sourceDir - The path to the directory to be organized.
 * @param {object} structure - The desired folder structure as an object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
function organizeFolderStructure(sourceDir, structure) {
  return new Promise((resolve, reject) => {
    // Check if the source directory exists
    fs.access(sourceDir, fs.constants.F_OK, (err) => {
      if (err) {
        return reject(new Error(`Source directory not found: ${sourceDir}`));
      }

      // Iterate over the structure and create the necessary directories
      for (const folder in structure) {
        const folderPath = path.join(sourceDir, folder);
        fs.mkdir(folderPath, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            return reject(new Error(`Failed to create directory: ${folderPath}`));
          }

          // If all directories are created successfully, resolve the promise
          if (Object.keys(structure).every((key) => fs.existsSync(path.join(sourceDir, key)))) {
            resolve();
          }
        });
      }
    });
  });
}

/**
 * Example usage of the organizeFolderStructure function.
 * This will organize the 'exampleDir' into the structure specified in 'desiredStructure'.
 */
const exampleDir = './exampleDir';
const desiredStructure = {
  documents: {},
  images: {},
  music: {}
};

// Call the function and handle the result
organizeFolderStructure(exampleDir, desiredStructure)
  .then(() => {
    console.log('Folder structure organized successfully.');
  })
  .catch((err) => {
    console.error('Error organizing folder structure:', err.message);
  });

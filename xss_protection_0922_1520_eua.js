// 代码生成时间: 2025-09-22 15:20:53
const DOMPurify = require('dompurify'); // Require DOMPurify for sanitization
const { JSDOM } = require('jsdom'); // Require JSDOM to create a DOM environment

/**
 * Sanitize user input to prevent XSS attacks.
 * @param {string} input - The user input to be sanitized.
 * @returns {string} - The sanitized input.
 */
function sanitizeInput(input) {
  // Check if input is defined and is a string
  if (typeof input !== 'string') {
    throw new Error('Invalid input: Input must be a string.');
  }

  // Create a new JSDOM environment
  const window = (new JSDOM('')).window;
  // Sanitize the input using DOMPurify within the JSDOM environment
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Do not allow any HTML tags
    ALLOWED_ATTR: [], // Do not allow any HTML attributes
    FORBID_TAGS: ['script', 'iframe'], // Explicitly forbid dangerous tags
    USE_PROFILES: { html: 0, svg: 0, mathMl: 0 }, // Disable all sanitization profiles
    ALLOW_DATA_ATTR: false, // Do not allow custom data attributes
  }, window);

  return sanitized;
}

/**
 * Example usage of the sanitizeInput function.
 */
try {
  const userInput = '<script>alert("XSS")</script>';
  const safeInput = sanitizeInput(userInput);
  console.log('Sanitized Input:', safeInput); // Should log an empty string or the script tag removed
} catch (error) {
  console.error('Error sanitizing input:', error.message);
}

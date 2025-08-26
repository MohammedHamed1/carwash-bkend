// Ignore browser extension warnings and deprecated DOM events
// This file helps suppress warnings from browser extensions like AdBlock, QR scanners, etc.

// Suppress console warnings from browser extensions
const originalWarn = console.warn;
const originalError = console.error;

// List of patterns to ignore (from browser extensions)
const ignoredPatterns = [
  /DOMNodeInserted/,
  /DOMNodeRemoved/,
  /DOMCharacterDataModified/,
  /DOMSubtreeModified/,
  /inj_1\.js/,
  /MutationObserver/,
  /UNSAFE_componentWillMount/,
  /react-helmet/,
  /SideEffect/,
  /NullComponent/
];

// Override console.warn
console.warn = function(...args) {
  const message = args.join(' ');
  const shouldIgnore = ignoredPatterns.some(pattern => pattern.test(message));
  
  if (!shouldIgnore) {
    originalWarn.apply(console, args);
  }
};

// Override console.error for specific cases
console.error = function(...args) {
  const message = args.join(' ');
  const shouldIgnore = ignoredPatterns.some(pattern => pattern.test(message));
  
  if (!shouldIgnore) {
    originalError.apply(console, args);
  }
};

// Suppress specific React warnings about deprecated lifecycle methods
if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('UNSAFE_componentWillMount') ||
       message.includes('SideEffect') ||
       message.includes('react-helmet'))
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

export default {}; 
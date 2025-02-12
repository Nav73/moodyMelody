// config.js


console.log('config.js is loaded');
if (process.env.NODE_ENV === 'production') {
    // Suppress all console outputs in production
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  } else {
    // Optionally, you can suppress specific warnings or errors
    const originalWarn = console.warn;
    console.warn = function (message, ...args) {
      // Suppress warnings related to 'web-share' feature
      if (message && message.includes("Unrecognized feature: 'web-share'")) {
        return;
      }
      originalWarn.apply(console, [message, ...args]);
    };
  }
  
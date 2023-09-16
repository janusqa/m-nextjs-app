'use client';

// Errors in the RootLayout cannot be caught by an error.tsx
// We need a global-error.tsx to catch errors in the RootLayout

import React from 'react';

const GlobalError = () => {
    return <div>global-error</div>;
};

export default GlobalError;

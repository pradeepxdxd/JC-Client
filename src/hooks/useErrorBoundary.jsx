import React, { useState } from 'react';

export default function useErrorHandler(initialState) {
    const [error, setError] = useState(initialState);
    const handleError = (err) => setError(err);
    return [error, handleError];
}
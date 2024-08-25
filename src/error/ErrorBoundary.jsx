import React from "react";
import useErrorHandler from "../hooks/useErrorBoundary";

export default function ErrorBoundary({ children }) {
    const [error, handleError] = useErrorHandler(null);

    if (error) {
        return <div role="alert">Something went wrong: {error.message}</div>;
    }

    return (
        <React.Fragment>
            {React.Children.map(children, child =>
                React.cloneElement(child, { handleError })
            )}
        </React.Fragment>
    );
}
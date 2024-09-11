import React, { ReactNode } from "react";
import { useErrorBoundary } from "../../hooks/useErrorBoundary";
interface ErrorBoundaryProps {
    children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const { hasError } = useErrorBoundary();

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    return <>{children}</>;
};

export default ErrorBoundary;

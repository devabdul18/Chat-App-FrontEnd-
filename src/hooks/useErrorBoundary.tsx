import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useErrorBoundary() {
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            setHasError(true);
            toast.error("An error occurred. Please try again later.");
            console.error("Error caught by Error Boundary:", event.error);
        };

        window.addEventListener("error", handleError);
        return () => window.removeEventListener("error", handleError);
    }, []);

    return { hasError };
}

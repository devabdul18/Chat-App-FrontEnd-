import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
    Theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const Theme = isDarkMode ? "dark" : "light";

    useEffect(() => {
        document.documentElement.setAttribute("dark-theme", Theme);
    }, [Theme]);

    return (
        <div>
            <ThemeContext.Provider value={{ Theme, toggleTheme }}>{children}</ThemeContext.Provider>
        </div>
    );
};

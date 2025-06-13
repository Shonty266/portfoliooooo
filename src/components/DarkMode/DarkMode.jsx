import React, { useState, useEffect } from "react";
import Sun from './sun.svg';
import Moon from './moon.svg';

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Default to dark mode
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === null ? true : savedTheme === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id="darkmode-toggle"
                className="hidden"
                checked={isDarkMode}
                onChange={toggleTheme}
            />
            <label htmlFor="darkmode-toggle" className="cursor-pointer flex items-center justify-center bg-[var(--theme-bg)] rounded-full w-12 h-6 p-1">
                <img
                    src={isDarkMode ? Moon : Sun}
                    alt={isDarkMode ? "Moon Icon" : "Sun Icon"}
                    className="w-4 h-4 transition-transform duration-300"
                />
            </label>
        </div>
    );
};

export default DarkMode;

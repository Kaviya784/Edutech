import React, { createContext, useState, useContext, useCallback } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState({ name: '', isLoggedIn: false });
    const [currentPage, setCurrentPage] = useState('home');

    // useCallback — these functions are wrapped so they don't get
    //    re-created on every render. Useful when passed to child components.
    const login = useCallback((name) => {
        setUser({ name: name || 'Learner', isLoggedIn: true });
        setCurrentPage('home');
    }, []); // empty array = only created once

    const logout = useCallback(() => {
        setUser({ name: '', isLoggedIn: false });
        setCurrentPage('home');
    }, []);

    const goTo = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    return (
        <AppContext.Provider value={{ user, currentPage, login, logout, goTo }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}

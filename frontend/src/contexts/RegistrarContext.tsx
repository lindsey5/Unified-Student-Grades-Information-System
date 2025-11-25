import React, { createContext, type ReactNode } from 'react';
import useFetch from '../hooks/useFetch';
import { Navigate } from 'react-router-dom';

interface RegistrarContextType {
    registrar: Registrar | null;
}

export const RegistrarContext = createContext<RegistrarContextType>({
    registrar: null,
});

interface RegistrarContextProviderProps {
    children: ReactNode;
}

// 4. Implement the provider
export const RegistrarContextProvider: React.FC<RegistrarContextProviderProps> = ({ children }) => {
    const { data, loading } = useFetch(`/api/registrars/me`);

    if(loading) return;

    if(!data?.registrar){
        return <Navigate to="/" />
    }

    return (
        <RegistrarContext.Provider value={{ registrar: data?.registrar || null }}>
        {children}
        </RegistrarContext.Provider>
    );
};
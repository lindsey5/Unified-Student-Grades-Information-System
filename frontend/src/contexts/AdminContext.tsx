import React, { createContext, type ReactNode } from 'react';
import useFetch from '../hooks/useFetch';
import { Navigate } from 'react-router-dom';

interface AdminContextType {
  admin: Admin | null;
}

export const AdminContext = createContext<AdminContextType>({
  admin: null,
});

interface AdminContextProviderProps {
  children: ReactNode;
}

// 4. Implement the provider
export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const { data, loading } = useFetch(`/api/admins`);

    if(loading) return;

    if(!data?.admin){
        return <Navigate to="/" />
    }

    return (
        <AdminContext.Provider value={{ admin: data?.admin || null }}>
        {children}
        </AdminContext.Provider>
    );
};
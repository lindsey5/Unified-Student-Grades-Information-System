import React, { createContext, type ReactNode } from 'react';
import useFetch from '../hooks/useFetch';
import { Navigate } from 'react-router-dom';

interface StudentContextType {
    student: Student | null;
    loading: boolean
}

export const StudentContext = createContext<StudentContextType>({
    student: null,
    loading: false
});

interface StudentContextProviderProps {
    children: ReactNode;
}

// 4. Implement the provider
export const StudentContextProvider: React.FC<StudentContextProviderProps> = ({ children }) => {
    const { data, loading } = useFetch(`/api/students/me`);

    if(!data?.student && !loading){
        return <Navigate to="/" />
    }

    return (
        <StudentContext.Provider value={{ student: data?.student || null, loading: loading }}>
        {children}
        </StudentContext.Provider>
    );
};
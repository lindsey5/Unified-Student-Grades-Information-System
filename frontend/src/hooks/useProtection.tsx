import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const useProtection = () => {
    const { data, loading } = useFetch('/api/auth/user');
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (data?.role === "student") navigate("/student");
        else if (data?.role === "registrar") navigate("/registrar");
        else if (data?.role === "admin") navigate("/admin");

    }, [loading, data]);
};

export default useProtection;

import useFetch from "./useFetch";

const useProtection = () => {
    const { data, loading } = useFetch('/api/auth/user');

    if(loading) return
    else if (data?.role === "student")  window.location.href = "/student"
    else if (data?.role === "registrar")  window.location.href = "/registrar"
    else if (data?.role === "admin")  window.location.href = "/admin"
};

export default useProtection;

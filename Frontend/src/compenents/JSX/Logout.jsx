import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            const res = await fetch("https://coopmart-backend.onrender.com/logout", {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();
            if (sessionStorage.getItem("shopReloaded")) {
                sessionStorage.removeItem("shopReloaded");
                window.location.reload();
            }
            navigate("/");
        };

        logout();
    }, []);


    return (
        <>
            <p>Page has successfully logout</p>
        </>
    )
}

export default Logout

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { CounterContext } from '../../Context/context';
import { useContext } from 'react';
import config from '../../config';

const Logout = () => {
    const counter=useContext(CounterContext)
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            const res = await fetch(`${config.API_BASE_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();
            if (data.success==true){
                counter.setprofile(false)
                navigate("/");
            }
            
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

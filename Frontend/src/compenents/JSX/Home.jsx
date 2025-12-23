import { useNavigate } from "react-router-dom";
import "../CSS/Home.css"


const Home = () => {
    const navigate=useNavigate()
    return (
        <>
            <section className="hero-section">
                <div className="hero-text animate-slide-up">
                    <h1>
                        IF YOU ARE NEW TO THIS PAGE THEN SIGN UP,
                        <br />
                        IF YOU HAVE SIGNED THEN LOGIN.
                    </h1>
                    
                    <button onClick={()=>navigate('/signup')} className="primary-btn animate-fade-in" >SIGN UP</button>
                    <button onClick={()=>navigate('/login')} id="signed" className="primary-btn animate-fade-in" >Login</button>
                </div>

                <div className="hero-curve"></div>
                <div className="hero-gradient"></div>
            </section>
        </>
    );
};

export default Home;

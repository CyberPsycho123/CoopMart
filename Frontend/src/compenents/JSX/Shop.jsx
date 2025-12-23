
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../CSS/shop.css';

const Shop = ({ Tshirts, Shirts, shoes, electronics }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await fetch("https://coopmart-backend.onrender.com/read", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!data.bool) {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Login check failed:", error);
        navigate("/login", { replace: true });
      }
    }

    checkLogin();
  }, [navigate]);


  const [search, setsearch] = useState("")
  const filterItems = (items) =>
    items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  const filteredTshirts = filterItems(Tshirts);
  const filteredShirts = filterItems(Shirts);
  const filteredShoes = filterItems(shoes);
  const filteredElectronics = filterItems(electronics);

  return (
    <div className="shop-container">
      <div className="bar">
        <input type='text' className='searchbar' placeholder='Search the items here..' value={search} onChange={(e) => setsearch(e.target.value)} />
      </div>
      <section className="category-section">
        <br />
        {filteredElectronics.length > 0 && <h2>Electronics</h2>}
        <div className="product-grid">
          {filteredElectronics.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3 className="left">{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/electronics/${index}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="category-section">
        {filteredTshirts.length > 0 && <h2>T-Shirts</h2>}
        <div className="product-grid">
          {filteredTshirts.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left">{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/Tshirts/${index}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="category-section">
        {filteredShirts.length > 0 && <h2>Shirts</h2>}
        <div className="product-grid">
          {filteredShirts.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left">{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/Shirts/${index}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="category-section">
        {filteredShoes.length > 0 && <h2>Shoes</h2>}
        <div className="product-grid">
          {filteredShoes.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left">{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/shoes/${index}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;

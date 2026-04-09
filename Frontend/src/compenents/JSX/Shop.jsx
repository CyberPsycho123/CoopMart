import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../CSS/shop.css';
import config from '../../config';

const Shop = ({ accessories, others, food, electronics }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch(`${config.API_BASE_URL}/read`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.bool == true) {
        navigate("/shop")
      } else {
        navigate("/login")
      }
    }
    checkLogin();
  }, [navigate]);

  const [search, setsearch] = useState("")

  const filterItems = (items) =>
    items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  const filteredaccessories = filterItems(accessories);
  const filteredothers = filterItems(others);
  const filteredfood = filterItems(food);
  const filteredElectronics = filterItems(electronics);

  return (
    <div className="shop-container">

      {/* ── Beautiful Search Bar ── */}
      <div className="bar">
        <div className="search-wrapper">
          <span className="search-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </span>
          <input
            type="text"
            className="searchbar"
            placeholder="Search for electronics, shirts, shoes..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setsearch("")}>✕</button>
          )}
        </div>
      </div>


      <section className="category-section">
        <br />
        {filteredElectronics.length > 0 && <h2 style={{color:'white'}}>Electronics</h2>}
        <div className="product-grid">
          {filteredElectronics.reverse().map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3 className="left" style={{color:'black'}}>{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/${item.id}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>


      <section className="category-section">
        {filteredaccessories.length > 0 && <h2 style={{color:'white'}}>Accessories</h2>}
        <div className="product-grid">
          {filteredaccessories.reverse().map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left" style={{color:'black'}}>{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/${item.id}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>


      <section className="category-section">
        {filteredfood.length > 0 && <h2 style={{color:'white'}}>Food items</h2>}
        <div className="product-grid">
          {filteredfood.reverse().map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left" style={{color:'black'}}>{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/${item.id}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>



      <section className="category-section">
        {filteredothers.length > 0 && <h2 style={{color:'white'}}>Others</h2>}
        <div className="product-grid">
          {filteredothers.reverse().map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left" style={{color:'black'}}>{item.title}</h3>
              <br />
              <p className="left">₹{item.price}</p>
              <br />
              <button className="buy-btn" onClick={() => navigate(`/order/${item.id}`)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Shop;
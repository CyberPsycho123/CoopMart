import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../CSS/shop.css';
import config from '../../config';

const SLIDES = [
  {
    id: 1,
    tag: '🤝 Empowering Local Sellers',
    heading: 'Every Product Has a Story',
    sub: 'Support everyday people selling handmade goods, fresh produce, and more — directly from their hands to yours.',
    cta: 'Start Shopping',
    bg: '#0a1628',
    accent: '#60a5fa',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80',
  },
  {
    id: 2,
    tag: '🌾 Fresh From Local Hands',
    heading: 'Buy Direct, Support Families',
    sub: 'From village farms and small workshops — your purchase changes a life. No middlemen, just honest trade.',
    cta: 'Explore Products',
    bg: '#0d1f3c',
    accent: '#93c5fd',
    img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&q=80',
  },
  {
    id: 3,
    tag: '📦 Sell What You Make',
    heading: 'Your Shop, Your Income',
    sub: 'Are you a small seller? List your products for free and reach thousands of buyers who care about real craftsmanship.',
    cta: 'Start Selling',
    bg: '#071223',
    accent: '#3b82f6',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
  },
];

const Home = ({ Products }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch(`${config.API_BASE_URL}/read`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.bool == true) {
        navigate('/');
      } else {
        navigate('/login');
      }
    }
    checkLogin();
  }, [navigate]);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = SLIDES[current];

  return (
    <>
      {/* ── Hero Slider ── */}
      <div className="slider" style={{ background: slide.bg }}>
        <div className={`slider__inner ${animating ? 'slider__inner--exit' : 'slider__inner--enter'}`}>
          <div className="slider__content">
            <span className="slider__tag" style={{ color: slide.accent, borderColor: slide.accent }}>
              {slide.tag}
            </span>
            <h1 className="slider__heading" style={{fontFamily:'sans-serif'}}>{slide.heading}</h1>
            <p className="slider__sub">{slide.sub}</p>
            <button
              className="slider__cta"
              style={{ background: slide.accent, color: slide.bg }}
              onClick={() => navigate('/shop')}
            >
              {slide.cta} →
            </button>
          </div>
          <div className="slider__image-wrap">
            <img src={slide.img} alt={slide.heading} className="slider__image" />
            <div className="slider__image-overlay" style={{ background: slide.bg }} />
          </div>
        </div>

        <button className="slider__arrow slider__arrow--prev" onClick={prev}>&#8592;</button>
        <button className="slider__arrow slider__arrow--next" onClick={next}>&#8594;</button>

        <div className="slider__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`slider__dot ${i === current ? 'slider__dot--active' : ''}`}
              style={i === current ? { background: slide.accent } : {}}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="slider__progress">
          <div className="slider__progress-bar" style={{ background: slide.accent }} key={current} />
        </div>
      </div>

      {/* ── Original Shop Section ── */}
      <div className="shop-container">
        <section className="category-section">
          <br />
          <h2>Latest Products</h2>
          <div className="product-grid">
            {Products.map((item) => (
              <div key={item._id} className="product-card">
                <img src={item.image} alt={item.name} />
                <h3 className="left">{item.title}</h3>
                <br />
                <p className="left">₹{item.price}</p>
                <br />
                <button className="buy-btn" onClick={() => navigate(`/order/${item.id}`)}>Buy Now</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
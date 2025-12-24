import { useEffect, useState } from 'react'
import './App.css'
import About from './compenents/JSX/About'
import Navbar from './compenents/JSX/Navbar'
import Carts from './compenents/JSX/Carts'
import Payment from './compenents/JSX/Payment'
import SellerDetails from './compenents/JSX/SellerDetails'
import Home from './compenents/JSX/Home'
import Ordered from './compenents/JSX/Ordered'
import Login from './compenents/JSX/Login'
import Shop from './compenents/JSX/Shop'
import Signup from './compenents/JSX/Signup'
import SellerStart from './compenents/JSX/SellerStart'
import Selleradmin from './compenents/JSX/Selleradmin'
import Seller from './compenents/JSX/Seller'
import Info from './compenents/JSX/Info'
import Logout from './compenents/JSX/Logout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './compenents/JSX/Footeer'
import Order from './compenents/JSX/Order'
import Confirm from './compenents/JSX/Confirm'
import Confirmed from './compenents/JSX/Confirmed'
import SellerTerms from './compenents/JSX/SellerTerms'
import Edit from './compenents/JSX/Edit'
import { CounterContext } from './Context/context'

function App() {
  const [shoes, setShoes] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [Tshirts, setTshirts] = useState([]);
  const [Shirts, setShirts] = useState([]);
  const [counter, setcount] = useState(0);
  const [loading, setload] = useState(true)

  async function tool() {

    let response = await fetch("https://coopmart-backend.onrender.com", {
      method: "POST"
    });
    let data = await response.json();
    const tshirtsArr = [];
    const shirtsArr = [];
    const shoesArr = [];
    const electronicsArr = [];

    data.forEach(item => {
      if (item.catagory === "T-shirt") tshirtsArr.push(item);
      if (item.catagory === "Shirt") shirtsArr.push(item);
      if (item.catagory === "Electronics") electronicsArr.push(item);
      if (item.catagory === "Shoes") shoesArr.push(item);
    });

    setTshirts(tshirtsArr);
    setShirts(shirtsArr);
    setShoes(shoesArr);
    setElectronics(electronicsArr);

  }

  function Layout({ children, loading }) {
    return (
      <>
        <Navbar />
        {loading ? (
          <div className='container' style={{ height: '80vh' }}>
            <div className="spinner"></div>
            <p>Waiting for server...</p>
          </div>
        ) : (
          <main>{children}</main>
        )}
        <Footer />
      </>
    )
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("https://coopmart-backend.onrender.com/health", { method: "GET" });
        if (res.ok) {
          setload(false)
          await tool();
          clearInterval(interval);
        }
      } catch { }
    }, 2000);

    return () => {
      clearInterval(interval)
    };
  }, []);


  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout loading={loading}><Home /></Layout>
    },
    {
      path: "/shop",
      element: <Layout loading={loading}><Shop Tshirts={Tshirts} Shirts={Shirts} shoes={shoes} electronics={electronics} /></Layout>
    },
    {
      path: "/about",
      element: <Layout loading={loading}><About /></Layout>
    },
    {
      path: "/cart",
      element: <Layout loading={loading}><Carts /></Layout>
    },
    {
      path: "/login",
      element: <Layout loading={loading}><Login /></Layout>
    },
    {
      path: "/Signup",
      element: <Layout loading={loading}><Signup /></Layout>
    },
    {
      path: "/order/:catagory/:orderitem",
      element: <Layout loading={loading}><Order Tshirts={Tshirts} Shirts={Shirts} shoes={shoes} electronics={electronics} /></Layout>
    },
    {
      path: "/ordered",
      element: <Layout loading={loading}><Ordered /></Layout>
    },
    {
      path: "/payment",
      element: <Layout loading={loading}><Payment /></Layout>
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/info",
      element: <Layout loading={loading}><Info /></Layout>
    },
    {
      path: '/confirm',
      element: <Layout loading={loading}><Confirm /></Layout>
    },
    {
      path: "/confirmed",
      element: <Confirmed />
    },
    {
      path: "/edit",
      element: <Layout loading={loading}><Edit /></Layout>
    },
    {
      path: "/seller",
      element: <Layout loading={loading}><Seller /></Layout>
    },
    {
      path: "/sellerstart",
      element: <Layout loading={loading}><SellerStart /></Layout>
    },
    {
      path: "/sellerdetails",
      element: <Layout loading={loading}><SellerDetails /></Layout>
    },
    {
      path: "/sellerterms",
      element: <Layout loading={loading}><SellerTerms /></Layout>
    },
    {
      path: "/selleradmin",
      element: <Layout loading={loading}><Selleradmin /></Layout>
    }
  ])
  return (
    <CounterContext.Provider value={{ counter, setcount }}>
      <RouterProvider router={Router} />
    </CounterContext.Provider>
  )
}

export default App

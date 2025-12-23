import { useEffect, useState } from 'react'
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
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
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

  useEffect(() => {
    async function tool() {
      try {
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
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }

    tool();
  }, []);
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /><Footer /></>
    },
    {
      path: "/shop",
      element: <><Navbar /><Shop Tshirts={Tshirts} Shirts={Shirts} shoes={shoes} electronics={electronics} /><Footer /></>
    },
    {
      path: "/about",
      element: <><Navbar /><About /><Footer /></>
    },
    {
      path: "/cart",
      element: <><Navbar /><Carts /><Footer /></>
    },
    {
      path: "/login",
      element: <><Navbar /><Login /><Footer /></>
    },
    {
      path: "/Signup",
      element: <><Navbar /><Signup /><Footer /></>
    },
    {
      path: "/order/:catagory/:orderitem",
      element: <><Navbar /><Order Tshirts={Tshirts} Shirts={Shirts} shoes={shoes} electronics={electronics} /><Footer /></>
    },
    {
      path: "/ordered",
      element: <><Navbar /><Ordered /><Footer /></>
    },
    {
      path: "/payment",
      element: <><Navbar /><Payment /><Footer /></>
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/info",
      element: <><Navbar /><Info /><Footer /></>
    },
    {
      path: '/confirm',
      element: <><Navbar /><Confirm /><Footer /></>
    },
    {
      path: "/confirmed",
      element: <Confirmed />
    },
    {
      path: "/edit",
      element: <><Navbar /><Edit /><Footer /></>
    },
    {
      path: "/seller",
      element: <><Navbar /><Seller /><Footer /></>
    },
    {
      path:"/sellerstart",
      element:<><Navbar/><SellerStart/><Footer/></>
    },
    {
      path:"/sellerdetails",
      element:<><Navbar/><SellerDetails/><Footer/></>
    },
    {
      path:"/sellerterms",
      element:<><Navbar/><SellerTerms/><Footer/></>
    },
    {
      path:"/selleradmin",
      element:<><Navbar/><Selleradmin/><Footer/></>
    }
  ])
  return (
    <CounterContext.Provider value={{ counter, setcount }}>
      <RouterProvider router={Router} />
    </CounterContext.Provider>
  )
}

export default App

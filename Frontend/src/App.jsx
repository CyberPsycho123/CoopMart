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
import SellerStart from './compenents/JSX/SellerStart'
import Selleradmin from './compenents/JSX/Selleradmin'
import Seller from './compenents/JSX/Seller'
import Info from './compenents/JSX/Info'
import Logout from './compenents/JSX/Logout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './compenents/JSX/Footeer'
import Page404 from './compenents/JSX/Page404'
import Order from './compenents/JSX/Order'
import Confirm from './compenents/JSX/Confirm'
import Confirmed from './compenents/JSX/Confirmed'
import SellerTerms from './compenents/JSX/SellerTerms'
import Edit from './compenents/JSX/Edit'
import { CounterContext } from './Context/context'
import config from './config'

function App() {

  const GoogleAuthWapper = () => {
    return (
      <GoogleOAuthProvider clientId='1060914793989-ffhlhjob453iq5aiucjfejf6s3jafnt7.apps.googleusercontent.com'>
        <Login />
      </GoogleOAuthProvider>
    )
  }


  const [Others, setOthers] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [Accessories, setAccessories] = useState([]);
  const [Food, setFood] = useState([]);
  const [Allitems,setitems]=useState([])
  const [counter, setcount] = useState(0);
  const [profile,setprofile]=useState(false)
  const [loading, setload] = useState(true)

  async function tool() {

    let response = await fetch(`${config.API_BASE_URL}`, {
      method: "POST"
    });
    let data = await response.json();
    const AccessoriesArr = [];
    const FoodArr = [];
    const ElectronicsArr = [];
    const OthersArr = [];
    const all_items=[];

    data.forEach(item => {
      if (item.catagory === "Accessories") AccessoriesArr.push(item);
      if (item.catagory === "Food") FoodArr.push(item);
      if (item.catagory === "Electronics") ElectronicsArr.push(item);
      if (item.catagory === "Others") OthersArr.push(item);
      all_items.push(item)
      console.log(item)
    });

    setOthers(OthersArr)
    setElectronics(ElectronicsArr)
    setAccessories(AccessoriesArr)
    setFood(FoodArr)
    setitems(all_items)

  }

  function Layout({ children, loading }) {
    return (
      <>
        <Navbar />
        {loading ? (
          <div className='container' style={{ height: '80vh' }}>
            <div className="spinner"></div>
            <p style={{color:'white'}}>Waiting for server...</p>
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
        const res = await fetch(`${config.API_BASE_URL}/health`, { method: "GET" });
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
      element: <Layout loading={loading}><Home Products={Allitems.slice().reverse().slice(0,4)}/></Layout>
    },
    {
      path: "/shop",
      element: <Layout loading={loading}><Shop accessories={Accessories} others={Others} food={Food} electronics={electronics} /></Layout>
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
      element: <Layout loading={loading}><GoogleAuthWapper /></Layout>
    },
    {
      path: "/order/:orderitem",
      element: <Layout loading={loading}><Order Products={Allitems} /></Layout>
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
    },
    {
      path:"*",
      element:<><Page404/></>
    }
  ])
  return (
    <CounterContext.Provider value={{ counter, setcount,profile,setprofile }}>
      <RouterProvider router={Router} />
    </CounterContext.Provider>
  )
}

export default App

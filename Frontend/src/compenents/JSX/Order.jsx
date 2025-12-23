import "../CSS/Order.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CounterContext } from "../../Context/context";


const Order = ({ Tshirts, Shirts, shoes, electronics }) => {
    const [qty, setqty] = useState(1)
    const params = useParams()
    const navigate = useNavigate()
    const value = useContext(CounterContext)
    const index = Number(params.orderitem);
    const [outfits, setoutfit] = useState(Tshirts)
    useEffect(() => {
        if (params.catagory == "Tshirts") {
            setoutfit(Tshirts)
        }
        else if (params.catagory == "Shirts") {
            setoutfit(Shirts)
        }
        else if (params.catagory == "shoes") {
            setoutfit(shoes)
        }
        else if (params.catagory == "electronics") {
            setoutfit(electronics)
        }
    }, [params.catagory, Tshirts, Shirts, shoes, electronics])

    const item = outfits[index];
    const price = item.price;

    const total_price = price * qty
    const updated_cart = async () => {
        value.setcount(prev => prev + 1);

        const formData = {
            image: item.image,
            title: item.title,
            quantity: qty,
            price: total_price
        };

        const response = await fetch("https://coopmart-backend.onrender.com/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        await response.json();



    };


    const updated_order = async () => {

        const formData = {
            image: item.image,
            title: item.title,
            quantity: qty,
            price: total_price
        }
        let res = await fetch("https://coopmart-backend.onrender.com/ordered", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        let ponse = await res.json()
        if (ponse.success == true) {
            navigate('/info')
        }

    }



    return (
        <>
            <section className="product-order container">
                <div className="order-card">
                    <img src={item.image} alt="Product Image" className="order-image" />

                    <div className="order-content">
                        <h2 className="title">{item.title}</h2>

                        <p className="description">
                            {item.desc}
                        </p>

                        <div className="order-meta">
                            <span>
                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>₹</span>
                                <span className="price">{total_price}</span>
                            </span>

                            <label>
                                Qty:
                                <input
                                    id="count"
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    onInput={(e) => {
                                        if (e.target.value <= "0") { e.target.value = 1 };
                                    }}
                                    onChange={(e) => {
                                        setqty(e.target.value)
                                    }}
                                />
                            </label>
                        </div>

                        <button id="but" className="btn order-btn" onClick={updated_order}>PLACE ORDER</button>
                        <button id="but2" className="btn order-btn" onClick={updated_cart}>ADD TO CART</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;

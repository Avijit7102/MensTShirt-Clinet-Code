import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../../App';
import './Checkout.css';
const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    //const [dates, setDates] = useState({orderDate: new Date()})

    const [cart, setCart] = useState([]);
    const {id} = useParams();
    
    const order = {
        userName: loggedInUser.name,
        userEmail: loggedInUser.email,
    }

    useEffect(() => {
        fetch(`https://fast-sands-10833.herokuapp.com/checkout/${id}`)
        .then(res => res.json())
        .then(data => {
            const updateOrder = {...order,
                
                 productName: data[0].name,
                 ProductPrice: data[0].price,
                 Date: new Date()
             }
             setCart(updateOrder);
             //setOrderDetails(updateOrder);
        })
        

    },[id])

    const handleSave = () => {
        //const dates = new Date();
        //setCart(...cart, dates);
        const orderInfo = cart;
        // const orderInfo = {
        //     cart, dates
        // }
        //console.log('orderInfo',orderInfo)
        fetch('https://fast-sands-10833.herokuapp.com/addOrder', {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(orderInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div className="checkoutPage">
            <h1 className="check">Checkout page</h1>
            <h4>Product Name: {cart.productName}</h4>
            <h6>Price: ${cart.ProductPrice}</h6>
            <p>Total: ${cart.ProductPrice}</p>
            <button onClick={handleSave} type="button" class="btn btn-warning">Save</button>
        </div>
    );
};

export default Checkout;
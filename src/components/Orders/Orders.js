import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import './Order.css';
const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    // const[buyDetails, setBuyDetails] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/checkout?email='+loggedInUser.email)
    //     .then(res => res.json())
    //     .then(data => setBuyDetails(data))

    // },[])
    const [orderInfo, setOrderInfo] = useState([]);
    useEffect(() => {
        fetch('https://fast-sands-10833.herokuapp.com/yourOrder?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrderInfo(data))
    },[loggedInUser.email])

    
    return (
        <div className="orderPage">

            <div>
            <h5>Name: {loggedInUser.name}</h5>
            <br/>
            <h6>Email: {loggedInUser.email}</h6>
            <br/>
            <h6 className="orderLength">Total number of your Ordered: {orderInfo.length}</h6>
            </div>
           

            <div class="row">
            <div class = "col productsTable">Product Name</div>
            <div class = "col productsTable">Quantity</div>
            <div class = "col productsTable">Price</div>
            <div class = "col productsTable">Order Placed Time</div>

            
            </div>
            
            {
                orderInfo.map(pd => 
                    
                    <div class="row tableStyle">
                    <div class = "col">{pd.productName}</div>
                    <div class = "col">1</div>
                    <div class = "col">${pd.ProductPrice}</div>
                    <div class = "col">{pd.Date}</div>
                    </div>
                    
                )
            }
            

            
        </div>
    );
};

export default Orders;
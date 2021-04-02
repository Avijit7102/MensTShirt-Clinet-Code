import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://fast-sands-10833.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return (
        
        <div className = "home-page">
         
            {
                products.map(product => <Products product={product}></Products>)
            }
        </div>
    );
};

export default Home;
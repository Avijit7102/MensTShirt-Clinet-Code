import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'
const Products = ({product}) => {
    const id =product._id;


    return (
        <div className="productPage">
            <div class="card-group product">
                    <div class="card display">
                    <img class="img-fluid" style={{height: '300px'}}src={product.imageURL} alt=""/>
                    <h5>{product.name}</h5>
                    <p>Price:${product.price}</p>
                    <p>Quantity:{product.quantity}</p>
                    <button type="button" class="btn btn-warning btn-style"> <Link to={`/checkout/${id}`}>Buy Now</Link></button>
                    </div>
                </div>
        </div>
    );

};
export default Products;
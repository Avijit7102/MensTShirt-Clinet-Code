import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManageProduct.css';

const ManageProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch('https://fast-sands-10833.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setAllProducts(data))
    },[])

    const deleteProduct = (id)=> {
        console.log('this id:', id)
        fetch(`https://fast-sands-10833.herokuapp.com/deleteProduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted successfully')
                // if(result){
                //     pd.target.style.display = "none";
                // }
            })
    }
    return (
        <div className="manageProduct">
            <div>
            <nav className="admin-nav">
                <h4 className="adminTitle">Mens T-Shirt</h4>
                <ul>
                    <li>
                        <Link to="/manageProduct">Manage Product</Link>
                    </li>
                    <li>
                        <Link to="/admin">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/orders">Edit Product</Link>
                    </li>
                </ul>
            </nav>
            </div>
            
            <div className="table">
            <div class="row">
            <div class = "col productsTable">Product Name</div>
            <div class = "col productsTable">Quantity</div>
            <div class = "col productsTable">Price</div>
            <div class = "col productsTable">Action</div>
            </div>
            <div className="dyTable">
            {
                allProducts.map(pd => 
                    
                    <div class="row tableStyle">
                    <div class = "col">{pd.name}</div>
                    <div class = "col">{pd.quantity}</div>
                    <div class = "col">${pd.price}</div>
                    <div class = "col"><button><i class="fas fa-edit"></i></button>
                    <button className="deleteBtn" onClick={()=>deleteProduct(pd._id)}><i class="fas fa-trash-alt"></i></button>
                    </div>
                    </div>
                    
                )
            }
            </div>
            </div>

        </div>
    );
};

export default ManageProduct;
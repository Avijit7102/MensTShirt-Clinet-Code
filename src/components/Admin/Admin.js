import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Admin.css';
const Admin = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { register, handleSubmit} = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
        const eventData = {
            name: data.name,
            imageURL: imageURL,
            quantity: data.quantity,
            price: data.price,
            userName: loggedInUser.name,
            email: loggedInUser.email
        };
        console.log(eventData)
        const url = `https://fast-sands-10833.herokuapp.com/addproduct`;
        console.log('event data', eventData);
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(eventData)
        })
        .then(res => console.log('server side res', res))
    }


    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '0c727747ce6c8fbed0984778ce8881f8');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
        imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    return (
        <div className="admin-page">
            <nav className="admin-nav">
                <h1>Mens T-Shirt</h1>
                <ul>
                    <li>
                        <Link to="/manageProduct">Manage Product</Link>
                    </li>
                    <li>
                        <Link to="/admin">Add Product</Link>
                    </li>
                    <li>
                        <Link to="#">Edit Product</Link>
                    </li>
                </ul>
            </nav>
            <div className="admin-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{float:'left', textAlign:'start', marginLeft: '20px', marginTop: '10px', fontWeight:'bold'}}>
                <p>Product Name:</p>
                <input className="inputField" name="name" defaultValue="Enter Name" ref={register}/><br></br>
                <br></br>
                <p>Add Price:</p>
                <input className="inputField" name="price" defaultValue="price" ref={register}/><br />
                </div>
                
                <div style={{float:'right',textAlign:'start', marginRight: '20px', marginTop: '10px', fontWeight:'bold'}}>
                <p className="quantity">Quantity:</p>
                <input className="inputField responsiveQuantity" name="quantity" defaultValue="Quantity" ref={register}/><br />
                <br/>
                <p className="addImage">Add Image</p>
                <input className="inputField responsiveAddImage" name="imageURL" type="file" onChange={handleImageUpload}/> <br />
                <br/>
                <input className="submit" type="submit" />
                </div>

            </form>
            </div>
            
        </div>
    );
};

export default Admin;
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

function CartcontextProvider(props) {

    const [token, setToken] = useState(localStorage.getItem("token"));


    const [tokendecode, setTokendecode] = useState((token != null) ? jwtDecode(token) : "");





    useEffect(() => {
     
        if (token != null) {
        
            setTokendecode(jwtDecode(token));
        }

    }, [token]);


    function getAllOrders(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)
            .then((response) => response).catch((error) => error)
    }

    function addToCart(id) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: id }, { headers: { token } })
            .then((response) => response).catch((error) => error)
    }

    function getCart() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token } })
            .then((response) => response).catch((error) => error)
    }

    function deleteProduct(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { token } })
            .then((response) => response).catch((error) => error)
    }


    function updateQuantity(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers: { token } })
            .then((response) => response).catch((error) => error)
    }

    function addTowishlist(id) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: id }, { headers: { token } })
            .then((response) => response).catch((error) => error)
    }
    function getUserWishlist() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token } })
            .then((response) => response).catch((error) => error)
    }
    function deletewishProdct(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token } })
            .then((response) => response).catch((error) => error)
    }
    return (
        <cartContext.Provider value={{ setTokendecode, setToken, token, deletewishProdct, getUserWishlist, addTowishlist, addToCart, getCart, deleteProduct, updateQuantity, tokendecode, getAllOrders }} >

            {props.children}
        </cartContext.Provider>

    )
}


export default CartcontextProvider;

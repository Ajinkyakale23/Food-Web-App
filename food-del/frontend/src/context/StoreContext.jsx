import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Initialize cartItems state, loading it from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        try {
            return storedCart ? JSON.parse(storedCart) : {};
        } catch (error) {
            return {}; // Fallback if there's an error parsing JSON
        }
    });

    const url = "http://localhost:4000";

    // Initialize token from localStorage
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken || ''; // Set token from localStorage or default to an empty string
    });

    // Whenever cartItems change, update localStorage to persist the cart data
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Sync token with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    // Add item to cart
    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId]) {
                updatedCart[itemId] += quantity; // Increment quantity if item exists
            } else {
                updatedCart[itemId] = quantity; // Add new item to cart
            }
            return updatedCart;
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId, quantity = 1) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId]) {
                const updatedQuantity = updatedCart[itemId] - quantity;
                if (updatedQuantity <= 0) {
                    delete updatedCart[itemId]; // Remove item if quantity is zero or negative
                } else {
                    updatedCart[itemId] = updatedQuantity;
                }
            }
            return updatedCart;
        });
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Provide context value
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

import React from 'react';
import { useCart } from '../../components/Hooks/useCart.jsx';
import { Link } from "react-router-dom";
import Price from '../../components/Price/Price.jsx';
import NotFound from "../../components/NotFound/NotFound.jsx";
import { useAuth } from '../../components/Hooks/useAuth.jsx';
import * as userService from "../../Services/userService.js";
import { toast } from 'react-toastify';
// I'm assuming GetShortName and Alert_v2 exist.
// If Alert_v2 is not styleable via props, the wrapper div will handle its styling.
import GetShortName from '../../components/GetShortName/GetShortName.jsx';
import Alert_v2 from '../../components_v2/Alert/Alert_v2.jsx';
import { theme_color } from '../../constants/constants.js';

// Define the theme color from your image
const THEME_COLOR = '#D9383B';

export default function CartPage() {
    const { cart, removeFromCart, changeQuantity } = useCart();
    const { user } = useAuth();

    const sendEmailVerification = async () => {
        try {
            const { data } = await userService.sendEmailVerification(user.id);
            toast.success(data.msg);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    // If the cart is empty, render the NotFound component
    if (cart.items.length === 0) {
        return <NotFound message="Your Cart is Empty" linkText="Go To Homepage" linkTarget="/" />;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Cart Items List - takes 2/3 of the space on large screens */}
                    <ul className="space-y-6 lg:col-span-2">
                        {cart.items.map(item => (
                            <li key={item.food.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg">
                                <Link to={`/food/${item.food.id}`} className="flex-shrink-0 mb-4 sm:mb-0">
                                    <img
                                        className="w-28 h-28 object-cover rounded-lg"
                                        src={item.food.imageUrl}
                                        alt={item.food.name}
                                    />
                                </Link>

                                <div className="flex-grow max-md:w-full sm:ml-6 text-center sm:text-left">
                                    <Link to={`/food/${item.food.id}`} className="text-lg font-semibold text-gray-800 hover:text-[${THEME_COLOR}] no-underline w-full">
                                        <GetShortName food_name={item.food.name} />
                                    </Link>
                                    <div className="mt-2 text-md text-gray-700">
                                        <Price price={item.price} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
                                    <select
                                        value={item.quantity}
                                        onChange={e => changeQuantity(item, Number(e.target.value))}
                                        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        {[...Array(10).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCart(item.food.id)}
                                        className="text-gray-500 font-medium hover:text-[${THEME_COLOR}] transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Checkout Summary Card - takes 1/3 of the space */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-4 my-4 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Total Items</span>
                                    <span className="font-medium text-gray-800">{cart.totalCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-800">
                                        <Price price={cart.totalPrice} />
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span><Price price={cart.totalPrice} /></span>
                                </div>
                            </div>

                            <div className="mt-6">
                                {user && !user.is_verified ? (
                                    <div className="rounded-md">
                                        <Alert_v2
                                            onClick={sendEmailVerification}
                                            alert={"Your email is not verified."}
                                            actionText={"Click to verify"}
                                        />
                                    </div>
                                ) : (
                                    <Link
                                        to="/checkout"
                                        style={{ backgroundColor: theme_color }}
                                        className="block w-full text-center text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 no-underline"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
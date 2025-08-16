import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { trackOrderById } from "../../Services/orderService.js";
import NotFound from "../../components/NotFound/NotFound.jsx";
import classes from "./OrderTrack.module.css";
import Map from "../../components/Map/Map.jsx";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import DateTime from "../../components/DateTime/DateTime.jsx";
import Price from "../../components/Price/Price.jsx";
import { fetchSolConversionRate } from "../../Services/cryptoService.js";
import useDimensions from "../../components/Hooks/useDimensions.jsx";

export default function OrderTrack() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const navigate = useNavigate();
    const { width } = useDimensions();
    const [sol, setSol] = useState();
    const run = async (order) => {
        const val = await fetchSolConversionRate(order.totalPrice);
        setSol(val);
    }

    useEffect(() => {
        orderId && trackOrderById(orderId).then(order => setOrder(order));
    }, []);

    useEffect(() => {
        if (!order) {
            return;
        }
        run(order);
    }, [order]);

    if (!orderId) return (<NotFound message="Order Not Found" />);

    return order &&
        <>
            {
                width < 800 ?
                    <div className="relative min-h-screen flex flex-col gap-2 p-4 pt-2">
                        <div className="text text-[25px] text-neutral-600 border-b-[1px] border-black/30 font-semibold w-full justify-start mb-2">Order</div>
                        <div className="details grid grid-cols-6">
                            <div className="key col-span-2 grid grid-rows-5">
                                <div>Name</div>
                                <div className="row-span-2">Date</div>
                                <div>Phone no.</div>
                                <div>Address</div>
                            </div>
                            <div className="value col-span-4">
                                <div>{order.name}</div>
                                <div className="row-span-2"><DateTime date={order.createdAt} /></div>
                                <div>{order.phone}</div>
                                <div>{order.address}</div>
                            </div>
                        </div>
                        <div className="order-data h-full flex flex-wrap gap-2">
                            {
                                order?.items.map((order, ind) => (
                                    <div onClick={() => navigate("/food/" + order.food.id)} className="w-full bg-neutral-200 p-2 h-fit relative rounded-[12px] grid grid-cols-5 gap-2">
                                        <img style={{ margin: 0, padding: 0, position: 'relative', height: '80px' }} className="flex col-span-2 rounded-[8px] w-full " src={order.food.imageUrl} alt="" />
                                        <div className="col-span-3">
                                            <div className="text text-[20px] text-neutral-800 font-semibold w-full justify-start mb-2">
                                                {order.food.name}
                                            </div>
                                            <div className="grid grid-cols-2 gap-1">
                                                <div className="text text-[20px] flex flex-row gap-1 justify-center items-center bg-neutral-100 rounded-[8px] text-neutral-600 font-semibold w-full mb-2">
                                                    <img className="h-[25px] w-[25px]" src="/quantity.png" alt="how-many-quest" />
                                                    <span>{order.quantity}</span>
                                                </div>
                                                <div className="text text-[20px] flex flex-row gap-1 justify-center items-center bg-neutral-100 rounded-[8px] text-neutral-600 font-semibold w-full mb-2">
                                                    <span><Price price={order.price} /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="total w-full h-[80px] p-2 bg-neutral-200 rounded-[12px]">
                            <div className="total text-[20px] flex flex-row gap-2 justify-between ietms-center ">
                                <span className="font-semibold">Total</span>
                                <div className="rupee mt-[2px] text-[16px]">{<Price price={order.totalPrice} />}</div>
                            </div>
                            <div className="total text-[20px] flex flex-row gap-2 justify-between ietms-center ">
                                <span className="font-semibold">Solana</span>
                                <div className="rupee mt-[2px] text-[16px]">{sol}</div>
                            </div>
                        </div>
                        <div className={classes.map + " text-[25px] flex flex-col gap-2"}>
                            <div className="text text-[25px] text-neutral-600 border-b-[1px] border-black/30 font-semibold w-full justify-start mb-2">
                                Shipping Address
                            </div>
                            <Map width='w-[100%]' readonly={true} location={order.addressLatLng} />
                        </div>
                    </div>
                    :
                    <div className={classes.main}>
                        <div className={classes.details}>
                            <span><span>Order </span>#{order.id}</span>
                            <table className={classes.table}>
                                <tbody>
                                    <tr>
                                        <td>Date</td>
                                        <td className={classes.createdAt}><DateTime date={order.createdAt} /></td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{order.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone No.</td>
                                        <td>{order.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{order.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Order State</td>
                                        <td>{order.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={classes.orderItems}>
                                <OrderItemsList order={order} />
                            </div>
                        </div>
                        <div className={classes.map}>
                            <span className={classes.title}>Shipping Address</span>
                            <Map readonly={true} location={order.addressLatLng} />
                        </div>
                        {order.status === 'NEW' && (
                            <div className={classes.payment}>
                                <Link to="/payment" style={{ textDecoration: "none" }}>Go To Payment</Link>
                            </div>
                        )}
                    </div>
            }
        </>
}

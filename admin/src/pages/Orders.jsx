import React, { useState, useEffect } from "react";
import {backendUrl, currency} from "../App.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import { assets } from "../assets/admin_assets/assets.js";

const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if(!token) {
      return null;
    } else {
      try {
        const response = await axios.post(backendUrl + "/api/order/list", {}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        if(response.data.success) {
          setOrders(response.data.orders.reverse());
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {orderId, status: e.target.value}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      if(response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.length > 0 ? orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="Image" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if(index === order.items.length - 1) {
                    return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  } else {
                    return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                  }
                })}
              </div>
              <p className="mt-2 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <pre>
                  {order.address.street}, {order.address.city}<br />
                  {order.address.state}, {order.address.country}, {order.address.zipcode}
                </pre>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-2">Payment Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Received" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )) : (<div className="font-bold mt-2">No Orders Found!</div>)}
      </div>
    </div>
  )
}

export default Orders

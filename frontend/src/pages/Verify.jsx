import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const {token, navigate, setCartItem, backendUrl} = useContext(ShopContext);
  const [serchParams, setSerachParams] = useSearchParams();
  const success = serchParams.get("success");
  const orderId = serchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      if(!token) {
        return null;
      } else {
        const response = await axios.post(backendUrl + "/api/order/verifyStripe", {success, orderId}, {headers: {token}});
        if(response.data.success) {
          setCartItem({});
          navigate("/orders");
        } else {
          navigate("/cart");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    verifyPayment();
  }, [token]);
  return (
    <div>
      
    </div>
  )
}

export default Verify
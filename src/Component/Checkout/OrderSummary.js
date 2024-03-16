import React, { useContext, useEffect, useState } from "react";
import { DataAppContext } from "../AppData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPercent,
  faTruck,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import "../StyleComp/Summary.css";
import "../StyleComp/CheckOut.css";
import "../StyleComp/Cart.css";
import OrderConfirmation from "./OrderConfirmation";

const OrderSummary = () => {
  const [cart, setCart] = useState([]);
  const { appState, setAppState } = useContext(DataAppContext);
  const {
    paymentType,
    deliveryAdd,
    discount,
    totalprice,
    buyStatus,
    cardname,
    cardnumber,
    cvv,
    date,
  } = appState;

  console.log(appState);
  const generateOrderID = () => Math.floor(Math.random() * 1000000000000);

  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const options = { weekday: "long", day: "2-digit", month: "short" };
    return deliveryDate.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    setAppState({
      ...appState,
      showSearch: true,
      showProCart: true,
    });

    const cartData = buyStatus
      ? JSON.parse(localStorage.getItem("singleorder")) || []
      : JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartData);
    localStorage.setItem("orderproduct", JSON.stringify(cartData));

    if (buyStatus) {
      setAppState({
        ...appState,
        buyStatus: false,
      });
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      setAppState({
        ...appState,
        pquantity: 0,
      });
    }
  }, []);

  return (
    <div className="summaryPage">
      <div className="confirmorder">
        <OrderConfirmation generateOrderID={generateOrderID} />
      </div>
      <div className="checkout_page">
        <div className="checkoutmaincont">
          <div className="summarypayment">
            <div className="estimatedelvry">
              <span>
                <FontAwesomeIcon icon={faTruck} />
              </span>
              <span>Estimated Delivery by {calculateDeliveryDate()}</span>
            </div>
            {cart.map((item) => (
              <div className="product_container" key={item.id}>
                <div className="product_img_des_cont">
                  <div className="product_image_container">
                    <span className="cartImageContainer">
                      <img
                        src={item.image}
                        width="60px"
                        height="60"
                        alt="product"
                      />
                    </span>
                  </div>
                  <div className="product_description_cont">
                    <div className="descrp_remove_cont">
                      <div className="descrp_container">
                        <div className="ovrflowhide">
                          <h4 className="title_para">{item.title}</h4>
                        </div>
                        <span>₹{item.price}</span>
                        <span>All Return</span>
                        <div className="showQuantity">
                          <span>{item.rating.rate}</span>
                          <span>
                            <span>Qty:</span>
                            <span>{item.qty}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="free_delivery_container">
                  <span className="paraContainer">
                    <p className="paraStyle">Free Delivery</p>
                  </span>
                </div>
              </div>
            ))}
            <div className="paymentmethod">
              <span className="summarydelivery">
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <span>Delivery Address</span>
              </span>
            </div>
            <div>
              <div className="address_container">
                <div className="nameconatiner">
                  <h2>{deliveryAdd.name}</h2>
                </div>
                <div className="main_address_container">
                  <p>{deliveryAdd.house}</p>
                  <p>{deliveryAdd.area}</p>
                  <p>{deliveryAdd.optional}</p>
                  <p>{deliveryAdd.city}</p>
                  <p>
                    {deliveryAdd.state} {deliveryAdd.pincode}
                  </p>
                  <p>{deliveryAdd.contactno}</p>
                </div>
              </div>
            </div>
            <div className="paytype">Payment Mode</div>

            <div className="paymentmode">
              <span>
                <FontAwesomeIcon icon={faWallet} className="walleticon" />
              </span>
              <span>{paymentType}</span>
              {paymentType === "Debit/Credit Card Payment" ? ( // experimental not present in actual meesho site
                <div className="credit_card_details">
                  {" "}
                  <h2>CC Details</h2>
                  <p>Card Name : {cardname}</p>
                  <p>Card Number : {cardnumber}</p>
                  <p>CVV : {cvv}</p>
                  <p>Card Expiry Date : {date}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className="prcedetailpage">
              <div className="pricesubcontainer">
                <div className="pcontainer">
                  <div className="pricedetailcontainerbox">Price Details</div>
                  <div className="priceProductContainer">
                    <span className="totalprdprice">Total Product Price</span>
                    <span className="pricetagfont">
                      +{Number(totalprice).toFixed(2)}
                    </span>
                  </div>
                  <div className="priceProductContainer ">
                    <span className="totldiscount">Total Discounts</span>
                    <span className="totldiscountprice">
                      -₹{Number(discount).toFixed(2)}
                    </span>
                  </div>
                  <div className="hrlinepricecontainer"></div>
                  <div className="priceProductContainer">
                    <span className="orderttl">Order Total</span>
                    <span className="pricetagfont">
                      ₹{Number(totalprice - discount).toFixed(2)}
                    </span>
                  </div>
                  <div className="discountcontainer">
                    <span>
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                    <span className="pricetagfont">
                      Yah! Your total discount is ₹{Number(discount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

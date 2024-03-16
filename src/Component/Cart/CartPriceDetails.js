import React, { useEffect, useState, useContext } from "react";
import cartprice from "../images/cartprice.png";

const CartPriceDetails = ({ totalprice, updatePaymentfn }) => {
  return (
    <div className="total_price_container">
      <div>
        <div>
          <span>
            <p className="price_detail">Price Details</p>
          </span>
        </div>
        <div>
          <div className="total_prce">
            <span>
              <p>Total Product Price</p>
            </span>
            <span>+{totalprice}</span>
          </div>
          <div className="order_total">
            <span>Order Total</span>
            <span> Rs {totalprice}</span>
          </div>
        </div>
        <div className="clicking_on">
          <span>clicking on 'Continue' will not deduct any money</span>
        </div>
        <div className="continue_button">
          <button onClick={updatePaymentfn}>Continue</button>
        </div>
      </div>
      <div>
        <img src={cartprice} width="350rem" height="150rem" />
      </div>
    </div>
  );
};

export default CartPriceDetails;

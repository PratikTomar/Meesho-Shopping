import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CartItem = ({ item, index, removItemFn, editItem}) => {
    console.log(item);
    return (
      <div className="product_container">
        <div className="product_img_des_cont">
          <div className="product_image_container">
            <Link to={`/pdetails/${item.id}`}>
              <span className="cartImageContainer">
                <img src={item.image} width="60px" height="60" />
              </span>
            </Link>
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
              <div className=" remove_container">
                <button className="remove_button" onClick={() => removItemFn(index)}>
                  <FontAwesomeIcon icon={faX} className="removeicon" />
                  <h4>REMOVE</h4>
                </button>
              </div>
            </div>
            <div className="edit_container">
              <button className="edit_button" onClick={() => editItem(index)}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="free_delivery_container">
          <span className="paraContainer">
            <p className="paraStyle">Free Delivery</p>
          </span>
        </div>
      </div>
    );
  };

  export default CartItem;
import React, { useState } from "react";

const EditItem = ({
  editQuantity,
  setQty,
  editTPrice,
  setEdit,
  increaseQty,
  decreaseQty,
  editSavePrd,
  qty,
}) => {
  const { title, image, price } = editQuantity;
  // console.log(qty);
  return (
    <div className="editContainer">
      <div className="editsubcontainer">
        <div className="quantityContainer">
          <div className="editQuantityHeader">
            <span>EDIT ITEM</span>
            <span>
              <button onClick={() => setEdit(false)}>X</button>
            </span>
          </div>
          <div className="prodQuantCont">
            <div className="product_img_des_cont">
              <div className="product_image_container">
                <span className="cartImageContainer">
                  <img src={image} width="50px" height="50px" alt={title} />
                </span>
              </div>
              <div className="product_description_cont">
                <div className="descrp_remove_cont">
                  <div className="descrp_container">
                    <div className="ovrflowhide">
                      <h4 className="title_para">{title}</h4>
                    </div>
                    <span className="QuantpriceC">₹ {price}</span>
                  </div>
                  <div className="increDecCon">
                    Qty
                    <span>
                      <span className="icremenSubcontainer">
                        <button onClick={decreaseQty}> - </button>
                        <span>{qty}</span>
                        <button onClick={increaseQty}> + </button>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="totPricecon">
            <span>Total Price</span>
            <span>₹{editTPrice}</span>
          </div>

          <div className="editbtncontainr">
            <button onClick={editSavePrd}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

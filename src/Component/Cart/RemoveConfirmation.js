import React, { useEffect, useState, useContext } from "react";

const RemoveConfirmation = ({ editQuantity, setShowRemove, removeItem }) => {
    return (
      <div className="removeCont">
        <div className="removeSubCon">
          <div className="removitemcontainer">
            <div className="removeheading">
              <h2>Remove product from cart</h2>
            </div>
            <div className="removetitle">
              {true && <p>{editQuantity.title}</p>}
            </div>
            <div className="RbtnContainer">
              <button onClick={() => setShowRemove(false)}>CANCEL</button>
              <button onClick={removeItem}>REMOVE</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default RemoveConfirmation
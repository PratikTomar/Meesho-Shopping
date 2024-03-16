import React from "react";

const AddressItem = ({ item, index, onSelect, onEdit }) => {
  return (
    <div key={index}>
      <div className="address_container">
        <div className="nameconatiner">
          <h2>{item.name}</h2>
          <button className="editbtncntainer" onClick={() => onEdit(index)}>
            Edit
          </button>
        </div>
        <div className="main_address_container">
          <p>{item.house}</p>
          <p>{item.area}</p>
          <p>{item.optional}</p>
          <p>{item.city}</p>
          <p>
            {item.state} {item.pincode}
          </p>
          <p>{item.contactno}</p>
        </div>
        <div className="deliver_btn_container">
          <button onClick={() => onSelect(index)}>
            Deliver to this Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;

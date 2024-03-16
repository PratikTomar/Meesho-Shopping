import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const AddressForm = ({ formData, updateData, onSubmit, closeEditContainer }) => {
  return (
    <div className="AddrsContainer">
      <div className="add_address_cont">
        <span>ADD ADDRESS</span>
        <span>
          <button className="croxbtn" onClick={closeEditContainer}>
            X
          </button>
        </span>
      </div>
      <form className="addAddressForm" onSubmit={onSubmit}>
        <div className="contact_details_container">
          <FontAwesomeIcon icon={faPhone} className="slideIcons" />
          <span>Contact Details</span>
        </div>
        <div className="frminput">
          <input
            className="formName"
            placeholder="Name"
            type="text"
            id="name"
            required
            onChange={updateData}
            value={formData.name}
          />
          <input
            placeholder="Contact Number"
            type="number"
            id="contactno"
            required
            onChange={updateData}
            value={formData.contactno}
          />
          <span>
            <FontAwesomeIcon icon={faLocationDot} className="slideIcons" />
            <span className="addressbox">Address</span>
          </span>
          <input
            placeholder="House no /Building Name"
            type="text"
            id="house"
            required
            onChange={updateData}
            value={formData.house}
          />
          <input
            placeholder="Road Name / Area / Colony"
            type="text"
            id="area"
            required
            onChange={updateData}
            value={formData.area}
          />
          <input
            placeholder="Pincode"
            type="number"
            id="pincode"
            required
            onChange={updateData}
            value={formData.pincode}
          />
          <div className="cityStatebox">
            <input
              placeholder="City"
              type="text"
              id="city"
              required
              onChange={updateData}
              value={formData.city}
            />{" "}
            <input
              placeholder="state"
              type="text"
              id="state"
              required
              onChange={updateData}
              value={formData.state}
            />
          </div>
          <input
            placeholder="Nearby Famous Place/Shop/School,etc (optional)"
            type="text"
            id="optional"
            onChange={updateData}
            value={formData.optional}
          />
        </div>
        <button className="saveAddandContbtn" type="submit">
          Save Address and Continue
        </button>
      </form>
    </div>
  );
};

export default AddressForm;

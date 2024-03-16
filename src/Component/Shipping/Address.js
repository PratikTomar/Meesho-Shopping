import React, { useContext, useEffect, useState } from "react";
import { DataAppContext } from "../AppData";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import AddressForm from "./AddressForm";
import AddressItem from "./AddressItem";
import SlideEditContainer from "../Profile/SlideEditContainer";

const Address = () => {
  const initialData = {
    name: "",
    contactno: "",
    house: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    optional: "",
  };

  const navigate = useNavigate();
  const [clss, setClass] = useState();
  const [address, setAddress] = useState([]);
  const [saveindex, setSaveindex] = useState();
  const [showedit, setShowedit] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [editAddData, setEditAddData] = useState();
  // const [paycart, setPaycart] = useState({
  //   totalPayprice: "",
  //   id: "",
  // });
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;

  const { loginStatus, totalprice } = appState;
  const totaldiscount = ((totalprice / 100) * 18).toFixed(2);

  const updateData = (e) => {
    let tempObj = { ...formData };
    tempObj[e.target.id] = e.target.value;
    setFormData(tempObj);
  };

  const saveAddressFn = (e) => {
    e.preventDefault();
    const newAddress = [...address, formData];
    localStorage.setItem("address", JSON.stringify(newAddress));
    setAddress(newAddress);
    setFormData(initialData);
    setClass(false);
  };

  const updateAddress = (newAddress) => {
    localStorage.setItem("address", JSON.stringify(newAddress));
    setAddress(newAddress);
  };

  const editData = (e) => {
    let tempObj = { ...editAddData };
    tempObj[e.target.id] = e.target.value;
    setEditAddData(tempObj);
  };

  const saveEditAddress = (e) => {
    e.preventDefault();
    const newAddress = [...address];
    newAddress[saveindex] = editAddData;
    updateAddress(newAddress);
    setFormData(initialData);
    setShowedit(false);
  };

  const selectAddress = (index) => {
    setAppState({
      ...appState,
      deliveryAdd: address[index],
      discount: totaldiscount,
    });
    navigate("/checkout");
  };

  const editAddress = (index) => {
    setShowedit(true);
    setSaveindex(index);
    setEditAddData(address[index]);
  };

  const openAddAddressForm = () => {
    setClass(true);
  };

  const closeEditContainer = () => {
    setClass(false);
  };

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    } else {
      const storedAddress = JSON.parse(localStorage.getItem("address")) || [];
      setAddress(storedAddress);
    }
  }, []);

  return (
    <>
      <div className="checkout_page">
        <div className="checkoutmaincont">
          <div className="paymentContainer">
            <div className="paymentmethod">
              <span className="selcectmethod">Select Payment Method</span>
              <span className="addnewContaienr">
                <button onClick={openAddAddressForm}> + ADD NEW ADDRESS</button>
              </span>
            </div>
            {address.length > 0 ? (
              address.map((item, index) => (
                <AddressItem
                  key={index}
                  item={item}
                  index={index}
                  onSelect={selectAddress}
                  onEdit={editAddress}
                  clss={clss}
                  showedit={showedit}
                />
              ))
            ) : (
              <h1>No Address Found!</h1>
            )}
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
                      -₹{Number(totaldiscount).toFixed(2)}
                    </span>
                  </div>
                  <div className="hrlinepricecontainer"></div>
                  <div className="priceProductContainer">
                    <span className="orderttl">Order Total</span>
                    <span className="pricetagfont">
                      ₹{Number(totalprice - totaldiscount).toFixed(2)}
                    </span>
                  </div>
                  <div className="discountcontainer">
                    <span>
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                    <span className="pricetagfont">
                      Yah! Your total discount is ₹
                      {Number(totaldiscount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideEditContainer show={clss}>
        <AddressForm
          formData={formData}
          updateData={updateData}
          onSubmit={saveAddressFn}
          closeEditContainer={closeEditContainer}
        />
      </SlideEditContainer>

      <SlideEditContainer show={showedit}>
        <AddressForm
          formData={editAddData}
          updateData={editData}
          onSubmit={saveEditAddress}
          closeEditContainer={closeEditContainer}
        />
      </SlideEditContainer>
    </>
  );
};

export default Address;

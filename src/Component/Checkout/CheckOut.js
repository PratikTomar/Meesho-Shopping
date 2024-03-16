import React, { useState, useEffect, useContext } from "react";
import { DataAppContext } from "../AppData";
import "../StyleComp/CheckOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faCircle,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ResellingOption from "./ResellingOption";

const CheckOut = () => {
  const initialData = {
    cardname: "",
    cardnumber: "",
    date: "",
    cvv: "",
  };

  const navigate = useNavigate();
  const [reselling, setReselling] = useState();
  const [formdata, setFormdata] = useState(initialData);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showCard, setShowCard] = useState();
  const [showReselling, setShowReselling] = useState(true);
  const [hideselect, sethideselect] = useState(true);
  const [showhideselect, setshowhideselect] = useState();
  const [formerror, setFormerror] = useState({});
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;
  const { totalprice, discount, loginStatus, paymentType } = appState;

  const finalPrice = (totalprice - discount).toFixed(2);

  //set card details in Formdata
  const updateData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value;
    setFormdata({
      ...formdata,
      ...tempObj,
    });
  };
  useEffect(() => {
    setAppState({
      ...appState,
      showSearch: false,
      showProCart: false,
      paymentType: "Cash On Delivery",
    });
    if (!loginStatus) {
      navigate("/login");
    }
  }, []);
  const payFn = () => {
    const ret = validationFn();
    if (paymentType === "Cash On Delivery") {
      navigate("/summary");
    } else if (ret) {
      setPaymentStatus(true);
      setAppState({
        ...appState,
        ...formdata,
      });
      navigate("/summary");
    }
  };

  const validationFn = () => {
    let errorObj = {};

    if (formdata.cardname.trim() === "") {
      errorObj.cardname = "Card Name is required";
    }

    if (formdata.cardnumber.trim() === "") {
      errorObj.cardnumber = "Card Number is required";
    } else if (formdata.cardnumber.length !== 12) {
      errorObj.cardnumber = "Card Number should be 12 digits";
    }

    if (formdata.date.trim() === "") {
      errorObj.date = "Expiry is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formdata.date)) {
      errorObj.date = "Invalid MM/YY format";
    }

    if (formdata.cvv.trim() === "") {
      errorObj.cvv = "CVV is required";
    } else if (formdata.cvv.length !== 3 || !/^\d+$/.test(formdata.cvv)) {
      errorObj.cvv = "CVV should be 3 digits";
    }

    setFormerror(errorObj);

    return Object.keys(errorObj).length === 0;
  };

  // Show Hide card Container and select payment type
  const selectPayment = (paymethods) => {
    if (paymethods === "COD") {
      setShowCard(false);
      setShowReselling(true);
      sethideselect(true);
      setshowhideselect(false);
      setAppState({
        ...appState,
        paymentType: "Cash On Delivery",
      });
    } else if (paymethods === "CardPayment") {
      setShowCard(true);
      setShowReselling(false);
      sethideselect(false);
      setshowhideselect(true);
      setAppState({
        ...appState,
        paymentType: "Debit/Credit Card Payment",
      });
    }
  };

  return (
    <div className="checkout_page">
      <div className="checkoutmaincont">
        <div className="paymentContainer">
          {true && (
            <div>
              {" "}
              <div className="paymentmethod">
                <span className="selcectmethod">Select Payment Method</span>
                <span className="selcectmethod_payment">
                  100% SAFE
                  <br />
                  PAYMENTS
                </span>
              </div>
              <div className="payincash">
                <div>PAY IN CASH</div>
                <div className="horizontalline"></div>
              </div>
              <div className="paymentmethod">
                <div className="payment_selector">
                  <div className="formcontainer selectopt">
                    <span
                      className="iconspancontainer crcleicon"
                      onClick={() => selectPayment("COD")}
                    >
                      {hideselect && <FontAwesomeIcon icon={faCircle} />}
                    </span>
                    <span onClick={() => selectPayment("COD")}>
                      Cash On Delivery
                    </span>
                  </div>
                  <div className="formcontainer ">
                    <span
                      className="iconspancontainer crcleicon"
                      onClick={() => selectPayment("CardPayment")}
                    >
                      {showhideselect && <FontAwesomeIcon icon={faCircle} />}
                    </span>
                    <span onClick={() => selectPayment("CardPayment")}>
                      Pay with Credit/Debit Card
                    </span>
                  </div>
                </div>
              </div>
              {showCard && (
                <div className="paymentbox">
                  <div className="cardPayCon">
                    <div className="paymentcardheader">
                      <h1>Secure Payment Info</h1>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="cardicon"
                      />
                    </div>
                    <form>
                      <div className="inputContainers">
                        <input
                          className="inputbox "
                          type="text"
                          placeholder="Name"
                          id="cardname"
                          onChange={updateData}
                          value={formdata.cardname}
                        />
                        <div className="errormessg">{formerror.cardname}</div>

                        <input
                          className="inputbox"
                          type="tel"
                          placeholder="Card Number"
                          id="cardnumber"
                          maxLength={12}
                          onChange={updateData}
                          value={formdata.cardnumber}
                        />
                        <div className="errormessg ">
                          {formerror.cardnumber}
                        </div>

                        <input
                          className="inputbox"
                          type="text"
                          placeholder="MM/YY Expiry "
                          id="date"
                          onChange={updateData}
                          value={formdata.date}
                        />
                        <div className="errormessg ">{formerror.date}</div>

                        <input
                          className="inputbox"
                          type="tel"
                          placeholder="CVV"
                          id="cvv"
                          onChange={updateData}
                          value={formdata.cvv}
                          maxLength={3}
                        />
                        <div className="errormessg ">{formerror.cvv}</div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {showReselling && (
                <ResellingOption
                  reselling={reselling}
                  setReselling={setReselling}
                />
              )}
              {reselling && (
                <div className="cashtobeContainer">
                  <div className="cashtobecollected">Cash to Collected</div>
                  <div className="orderTotalMarin">
                    <input
                      placeholder={`Order Total (₹${finalPrice}) + Your Margin (₹${(
                        finalPrice * 0.3
                      ).toFixed(2)})`}
                      className="inputboxcontnr"
                    />
                  </div>
                  <div className="marginbox">
                    Your Margin: {(finalPrice * 0.3).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="prcedetailpage">
            <div className="pricesubcontainer">
              <div className="pcontainer">
                <div className="pricedetailcontainerbox">Price Details</div>
                <div className="priceProductContainer">
                  <span className="totalprdprice">Total Product Price</span>
                  <span className="pricetagfont">+₹{totalprice}</span>
                </div>
                <div className="priceProductContainer ">
                  <span className="totldiscount">Total Discounts</span>
                  <span className="totldiscountprice">-₹{discount}</span>
                </div>
                <div className="hrlinepricecontainer"></div>
                <div className="priceProductContainer">
                  <span className="orderttl">Order Total</span>
                  <span className="pricetagfont">₹{finalPrice}</span>
                </div>
                <div className="discountcontainer">
                  <span>
                    <FontAwesomeIcon icon={faPercent} />
                  </span>
                  <span className="pricetagfont">
                    Yah! Your total discount is ₹{discount}
                  </span>
                </div>
              </div>
              <div className="moneydeduct">
                <div className="moneydeduct anymoney">
                  clicking on 'Continue' will not deduct any money
                </div>
                <div className="placedordercontainer">
                  <button onClick={payFn}>Placed order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

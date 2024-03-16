import React, { useEffect, useState, useContext } from "react";
import { DataAppContext } from "../AppData";
import { useNavigate, Link } from "react-router-dom";
import "../StyleComp/Cart.css";
import cartImage from "../images/cartImage.png";
import CartItem from "./CartItem";
import RemoveConfirmation from "./RemoveConfirmation";
import EditItem from "./EditItem";
import CartPriceDetails from "./CartPriceDetails";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(1);
  const [editTPrice, setEditTPrice] = useState(0);
  const [edit, setEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [editQuantity, setEditQuantity] = useState({});
  const [saveIndex, setSaveIndex] = useState(null);
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;
  const { loginStatus, totalprice, emptyCartStatus } = appState;

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
    setAppState({
      ...appState,
      showSearch: false,
      showProCart: false,
    });
    if (!loginStatus) {
      navigate("/login");
    }
  }, []);

  const updateCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
    let tempPrice = 0;
    cart.forEach((cartitem) => {
      tempPrice = tempPrice + cartitem.price;
    });
    let crtstatuss = true;
    if (tempPrice === 0) {
      crtstatuss = false;
    }
    setAppState({
      ...appState,
      pquantity: cart.length,
      totalprice: tempPrice.toFixed(2),
      emptyCartStatus: crtstatuss,
    });
  };

  const removItemFn = (index) => {
    setShowRemove(false);
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const updatePaymentfn = () => {
    setAppState({
      ...appState,
      price: "",
      id: "",
    });
    navigate("/address");
  };

  const editItem = (index) => {
    setEdit(true);
    setSaveIndex(index);
    setEditQuantity(cart[index]);
    setQty(cart[index].qty);
    setEditTPrice(cart[index].price);
  };

  const editSavePrd = () => {
    setEditQuantity(
      (editQuantity.qty = qty),
      (editQuantity.price = editTPrice),
      setEdit(false),
      setQty(1)
    );
    const newCart = [...cart];
    newCart.splice(saveIndex, 1, editQuantity);
    updateCart(newCart);
  };

  const increaseQty = () => {
    setQty(qty + 1);
    setEditTPrice((editTPrice / qty) * (qty + 1));
  };

  const decreaseQty = () => {
    setQty(qty - 1);
    if (qty - 1 < 1) {
      setEdit(false);
      setShowRemove(true);
    }
    setEditTPrice((editTPrice / qty) * (qty - 1));
  };

  const removeItem = () => {
    removItemFn(saveIndex);
  };

  console.log(qty);
  return (
    <div className="cartPage_Main_Container">
      <div className="cart_page">
        {emptyCartStatus ? (
          <>
            <div className="cart_main_container">
              <div className="product_side_container">
                <div className="cart_item_container">
                  <div className="item_container">
                    <span className="h3_container">
                      <h3 className="h3element">Cart</h3>
                    </span>
                    <span className="count_item">Item</span>
                  </div>
                </div>
                <div className="cart_main_contner">
                  <div className="prd">
                    {cart.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        index={index}
                        removItemFn={removItemFn}
                        editItem={editItem}
                      />
                    ))}
                  </div>
                  <CartPriceDetails
                    totalprice={totalprice}
                    updatePaymentfn={updatePaymentfn}
                  />
                </div>
              </div>
            </div>
            {showRemove && (
              <RemoveConfirmation
                editQuantity={editQuantity}
                setShowRemove={setShowRemove}
                removeItem={removeItem}
              />
            )}

            {edit && (
              <EditItem
                editQuantity={editQuantity}
                qty={qty}
                setQty={setQty}
                editTPrice={editTPrice}
                setEdit={setEdit}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                editSavePrd={editSavePrd}
              />
            )}
          </>
        ) : (
          <div>
            <div className="cartImage_container">
              <div>
                <img src={cartImage} alt="Cart Empty" />
              </div>
              <div className="empty_cart_button">
                <div className="empty_cart_button">
                  <h5>Your cart is empty</h5>
                  <Link to="/">
                    <button>View Products</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

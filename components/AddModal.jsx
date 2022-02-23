import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const AddModal = ({ showModal, selectedProduct, setShowModal }) => {
  const [personName, setPersonName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPin, setDeliveyPin] = useState("");
  const user = supabase.auth.user();

  const handleBuy = async (e) => {
    e.preventDefault();
    const orderObj = {
      personName,
      deliveryAddress,
      deliveryPin,
      customerEmail: user.email,
      productId: selectedProduct.id,
    };

    try {
      const { data, error } = await supabase.from("orders").insert([orderObj]);
      if (error) throw error;
      console.log(data);
      alert("Your order has been successfully made");
      window.location.reload();
    } catch (err) {
      console.log("Error in making order: " + err);
    }
  };

  if (!showModal) return null;
  return (
    <div>
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={() => setShowModal(false)}>
            &times;
          </span>
          <form className='buy-form' onSubmit={handleBuy}>
            <h2>Enter Delivery Details</h2>
            <p>Making order for {selectedProduct.name}</p>
            <input
              className='buyFormInput'
              type='text'
              id='customerName'
              placeholder='Name of person to whom the product is to be delivered'
              onChange={(e) => setPersonName(e.target.value)}
              value={personName}
            />
            <input
              className='buyFormInput'
              required
              type='text'
              id='address'
              placeholder='Delivery address'
              onChange={(e) => setDeliveryAddress(e.target.value)}
              value={deliveryAddress}
            />
            <input
              className='buyFormInput'
              type='text'
              id='pinCode'
              placeholder='Delivery pinCode'
              onChange={(e) => setDeliveyPin(e.target.value)}
              required
              value={deliveryPin}
            />
            <button className='button-18'>Order Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;

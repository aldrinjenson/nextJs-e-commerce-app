import React from "react";

const AddModal = ({ showModal, selectedProduct, setShowModal }) => {
  console.log(showModal);
  if (!showModal) return null;
  return (
    <div>
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={() => setShowModal(false)}>
            &times;
          </span>
          <div className='buy-form'>
            <h2>Enter Delivery Details</h2>
            <p>Making order for {selectedProduct.name}</p>
            <input
              className='buyFormInput'
              type='text'
              id='customerName'
              placeholder='Name of person to whom the product is to be delivered'
            />
            <input
              className='buyFormInput'
              required
              type='text'
              id='address'
              placeholder='Delivery address'
            />
            <input
              className='buyFormInput'
              type='text'
              id='pinCode'
              placeholder='Delivery pinCode'
            />
            <input
              className='buyFormInput'
              type='text'
              id='preferredTime'
              placeholder='Preferred Delivery time'
            />
            <button onclick={() => {}} className='button-18'>
              Order Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;

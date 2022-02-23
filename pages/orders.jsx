import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Orders = () => {
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const inputRef = useRef();

  const checkPasswordMatch = (e) => {
    e.preventDefault();
    if (adminPassword === "admin") {
      alert("Password matched.");
      setShowOrders(true);
    } else {
      alert("Invalid admin password");
      setAdminPassword("");
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("orders").select(`
    *,
    products (
      *
    )
  `);
        console.log(data);
        setOrders(data);
        if (error) throw error;
      } catch (err) {
        console.log("Error in fetching products: " + err);
      } finally {
        setLoading(false);
      }
    };
    setAdminPassword("");
    // inputRef.current?.value = "";
    getData();
  }, []);

  return (
    <div className='orders'>
      {showOrders ? (
        <div>
          <h1>Orders Made</h1>
          <div className='tbl-header'>
            <table cellPadding='0' cellSpacing='0' border='0'>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Customer Name</th>
                  <th>Delivery Address</th>
                  <th>Delivery Pincode</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='tbl-content'>
            <table cellPadding='0' cellSpacing='0' border='0'>
              <tbody>
                {orders.map((o, index) => (
                  <tr key={o.id}>
                    <td>{index + 1}</td>
                    <td>{o.personName}</td>
                    <td>{o.deliveryAddress}</td>
                    <td>{o.deliveryPin}</td>
                    <td>{o.products.id}</td>
                    <td>{o.products.name}</td>
                    <td>Rs. {o.products.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={checkPasswordMatch}
        >
          <input
            type='text'
            placeholder='Enter admin password'
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            style={{
              padding: "0.7rem",
              marginBottom: "2rem",
            }}
            ref={inputRef}
          />
          <button className='button-18'>Show Orders </button>
        </form>
      )}
    </div>
  );
};

export default Orders;

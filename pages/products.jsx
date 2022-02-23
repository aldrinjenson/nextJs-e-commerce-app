import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddModal from "../components/AddModal";
import styles from "../styles/Products.module.css";
import { supabase } from "../utils/supabaseClient";
import { Rings } from "react-loader-spinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  const user = supabase.auth.user();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("products").select();
        setProducts(data);
        if (error) throw error;
      } catch (err) {
        console.log("Error in fetching products: " + err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else {
        alert("successfully logged out");
        router.push("/signin");
      }
    } catch (err) {
      console.log("Error in signing out: " + err);
      alert("There seems to be some error in signing out.\n" + err);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [router, user]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Rings color='#00BFFF' height={200} width={200} />;
      </div>
    );
  }
  return (
    <div className='products'>
      <Head>
        <title>Products | Simple Commerce </title>
        <meta name='description' content='Products list' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 2rem",
        }}
      >
        <h1>Products</h1>

        <button
          className='button-18'
          style={{ padding: "2em", height: "1em", marginTop: "1em" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <h3>{p.name}</h3>
            <Image src={p.imgUrl} alt='product pic' width={200} height={200} />
            <div className='desc'>
              <p>
                <b>Rs.</b> {p.price}
              </p>
              <p>
                <b>Category.</b> Mobile Phones
              </p>
              <p>
                <b>Company.</b> Apple
              </p>
            </div>

            <p className='description2'>
              <b>Description: </b>
              {p.description}
            </p>
            {/* <!-- <div className="readMore2 readMore">Read More</div> --> */}
            <br />
            <div className='card-footer'>
              <p>
                <b>Rating: </b> {p.rating}
              </p>
              <button
                className='button-18 buyBtn'
                role='button'
                id={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setShowModal(true);
                }}
              >
                Buy Now
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <AddModal
          setShowModal={setShowModal}
          selectedProduct={selectedProduct}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Products;

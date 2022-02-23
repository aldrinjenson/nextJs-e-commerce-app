import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => res.json())
      .then((r) => setProducts(r))
      .catch((err) => console.log("Error in fetching products: " + err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Products | Simple Commerce </title>
        <meta name='description' content='Products list' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
};

export default Products;

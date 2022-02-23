import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container} style={{ maxHeight: "100vh" }}>
      <Head>
        <title>Simple Commerce</title>
        <meta name='description' content='Simple Commerce app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div
        className='center'
        style={{
          padding: "2rem",
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ fontSize: "3em", color: "#777" }}>
          Welcome to <span style={{ color: "black" }}>Simple Commerce!</span>
        </h1>
        <Image src='/shop.svg' alt='Shop Logo' width={250} height={225} />
        <Link href='/products'>
          <a className='button-18' style={{ margin: "2rem auto" }}>
            View Products
          </a>
        </Link>
      </div>
    </div>
  );
}

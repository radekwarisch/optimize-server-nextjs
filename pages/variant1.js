import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { unwrapCookies } from "../common/unwrapCookies";
import styles from "../styles/Home.module.css";

export function getServerSideProps({ req: { cookies } }) {
  const experiments = unwrapCookies(cookies);

  return {
    props: {
      experiments,
    },
  };
}

export default function Home({ experiments }) {
  useEffect(() => {
    if (window && window.gtag) {
      experiments.map(({ id, variant }) => {
        window.gtag("set", { experiments: [{ id, variant }] });
        window.gtag("config", "UA-129018078-2");
      });
    }
  }, [experiments]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Exp variant 1 for experiment</main>
    </div>
  );
}

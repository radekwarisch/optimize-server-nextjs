import Head from "next/head";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const res = await fetch(
    !process.env.PRODUCTION
      ? "http://localhost:3000/api/experiment"
      : "https://optimize-server-nextjs.vercel.app/api/experiment"
  );

  return {
    props: await res.json(),
  };
}

export default function Home({ experiments }) {
  console.log("experiments", experiments);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://www.googleoptimize.com/optimize.js?id=OPT-NF5R34W"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-129018078-2"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            
            ${experiments.map(({ id, variant }) => {
              return `gtag('set', {'experiments': [{'id': '${id}', 'variant': '${variant}'}]});`;
            })}

            gtag('config', 'UA-129018078-2');
          `,
          }}
        />
      </Head>

      <main className={styles.main}></main>
    </div>
  );
}

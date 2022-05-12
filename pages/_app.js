import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        id="gtag-script"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=UA-129018078-2"
      ></Script>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

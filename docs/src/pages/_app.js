import "#/styles/globals.css";

import Header from "#/components/Header.jsx";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

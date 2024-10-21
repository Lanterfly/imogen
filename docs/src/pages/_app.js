import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "#/components/Header.jsx";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

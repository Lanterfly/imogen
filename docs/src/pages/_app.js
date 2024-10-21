import 'bootswatch/dist/flatly/bootstrap.min.css';

import Header from "#/components/Header.jsx";

import './_app.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

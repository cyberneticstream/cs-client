import "map.css"
import "./styles/buildtailwind.css"
import Script from "next/script";
export default function MyApp({ Component, pageProps }) {
    return (
            <>
            <Component {...pageProps} />
            <Script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js" crossorigin async data-callback="initMapKit" data-libraries="map,annotations,services" data-initial-token="" lazyOnLoad={true}></Script>
            </>
            )
}

import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
    return (
            <Html>
                <Head />

                <title>{process.env.NEXT_PUBLIC_PROPERTY_ID}</title>
                <body className={"dark:bg-black dark:text-white"}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
            )
}
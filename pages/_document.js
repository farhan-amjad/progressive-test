import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

// const theme = responsiveFontSizes(createTheme())
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta name='application-name' content='PWA' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='PWA' />
                    <meta name='description' content='Best PWA App in the world' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-config' content='/icons/browserconfig.xml' />
                    <meta name='msapplication-TileColor' content='#2B5797' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#000000' />
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='icon' type='image/png' sizes='192x192' href='/icon/icon-192.png' />
                </Head>
                <body>
                    <Main />
                    {/* Here we will mount our modal portal */}
                    <div id='modal' />
                    <div id='loading' />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    // const sheets = new ServerStyleSheets();
    // const originalRenderPage = ctx.renderPage;

    // ctx.renderPage = () =>
    //   originalRenderPage({
    //     enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    //   });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        // styles: [...React.Children.toArray(initialProps.styles)],
    };
};

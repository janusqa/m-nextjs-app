import Script from 'next/script';
import React from 'react';

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-136437849-1"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-136437849-1');`}
            </Script>
        </>
    );
};

export default GoogleAnalytics;

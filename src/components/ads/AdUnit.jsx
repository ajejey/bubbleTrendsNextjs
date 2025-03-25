"use client";
import { useEffect, useRef } from "react";
import Router from "next/router";
import { AD_FORMATS, AD_SLOTS } from "./adConstants";

export function AdUnit({ adSlot, adFormat = "auto", className = "", style }) {
  const adRef = useRef(null);

  useEffect(() => {
    const handleRouteChange = () => {
      const intervalId = setInterval(() => {
        try {
          if (window.adsbygoogle) {
            window.adsbygoogle.push({});
            clearInterval(intervalId);
          }
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error pushing ads: ", err);
          }
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    };

    handleRouteChange();

    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  return (
    <div className={`ad-container my-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          ...AD_FORMATS[adFormat],
          ...style,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

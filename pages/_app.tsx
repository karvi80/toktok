import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          <Navbar />
          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>

            <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>

      <div>
        <p className="text-gray-400 text-sm mt-5">
          Copyright © 2022 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default MyApp;

import FontWrapper from "@/components/ui/wrappers/FontWrapper";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/configs/theme/mui";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
// import Spinner from '../components/ui/spinner'
// import { Router } from "next/router";

interface ExtraNextPageParams {
  features: any;
}

type ExtendedAppProps = AppProps & {
  Component: NextPage & ExtraNextPageParams;
};

// type GuardProps = {
//   authGuard: boolean;
//   guestGuard: boolean;
//   children: ReactNode;
// };

const queryClient = new QueryClient();

// const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
//   if (guestGuard) {
//     // return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
//   } else if (!guestGuard && !authGuard) {
//     return <>{children}</>;
//   } else {
//     // return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
//   }
// };

export default function App({ Component, pageProps }: ExtendedAppProps) {
  // const authGuard = Component.authGuard ?? true
  // const guestGuard = Component.guestGuard ?? false

  // const getLayout =
  //   Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <FontWrapper>
          <AuthProvider>
            {/* {getLayout(<Component {...pageProps} />)} */}
            <Component {...pageProps} />
          </AuthProvider>
          <Toaster />
        </FontWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

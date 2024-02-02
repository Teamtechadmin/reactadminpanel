import FontWrapper from "@/components/wrappers/FontWrapper";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Roboto } from 'next/font/google'
import { ReactNode } from "react";
import Spinner from '../components/spinner'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

type ExtendedAppProps = AppProps & {
  Component: NextPage
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

// const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
//   if (guestGuard) {
//     return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
//   } else if (!guestGuard && !authGuard) {
//     return <>{children}</>
//   } else {
//     return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
//   }
// }

export default function App({ Component, pageProps }: AppProps) {

  //  const authGuard = Component.authGuard ?? true
  // const guestGuard = Component.guestGuard ?? false

  return (
    <FontWrapper>
      <AuthProvider>
        <Component  {...pageProps} />
      </AuthProvider>
    </FontWrapper>
  );
}

import FontWrapper from "@/components/wrappers/FontWrapper";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <FontWrapper>
      <AuthProvider>
        <Component  {...pageProps} />
      </AuthProvider>
    </FontWrapper>
  );
}

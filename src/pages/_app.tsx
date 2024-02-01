import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { Grid } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

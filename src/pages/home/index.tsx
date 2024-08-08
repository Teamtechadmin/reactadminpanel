import useFcmToken from "@/hooks/firebase/cloud-messaging/useFCM";
import { Grid } from "@mui/material";
import React from "react";

const Home = () => {
  useFcmToken();
  return <Grid></Grid>;
};

Home.authGuard = true;
Home.guestGuard = false;

export default Home;

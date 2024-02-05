import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/spinner";

export const getHomeRoute = (role: string) => {
  if (role === "client") return "/login";
  else return "/login";
};

const Home = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role);

      // Redirect user to Home URL
      router.replace(homeRoute);
    } else {
      const homeRoute = getHomeRoute("client");
      router.replace(homeRoute);
    }
  }, []);

  return <Spinner />;
};

export default Home;

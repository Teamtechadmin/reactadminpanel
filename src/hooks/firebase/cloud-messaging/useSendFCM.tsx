import { setFCM } from "@/services/notification/post/post";
import { useAuthStore } from "@/store/auth/store";
import { useEffect, useState } from "react";

export const useSendFCM = () => {
  const { auth } = useAuthStore();
  const userID = auth?.user?._id;
  const [fcm, setFcm] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    const isFcmSend = localStorage.getItem("isFcmSend") === "yes";
    const token = window && localStorage.getItem("fcmToken");

    if (isFcmSend) {
      setFcm(isFcmSend);
    }

    if (token) {
      setFcmToken(token);
    }
  }, []);

  useEffect(() => {
    if (fcmToken && !fcm && userID) {
      setFCM({
        id: userID,
        body: {
          fcmToken,
          platform: "WEB",
        },
      }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("isFcmSend", "yes");
        }
      });
    }
  }, [fcm, fcmToken, userID]);
};
